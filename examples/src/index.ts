import {
  UploadWidget,
  UploadWidgetConfig,
  UploadWidgetMethods,
  UploadWidgetOnUpdateEvent,
  UploadWidgetResult
} from "@bytescale/upload-widget";

// For local development of Upload.js only: this is not an example of how you should set the API key in your app.
const apiKey: string = (window as any).UPLOAD_JS_API_KEY ?? "free";

const openUploader = (): void => {
  UploadWidget.open({
    apiKey,
    multi: true,
    mimeTypes: ["image/jpeg", "image/webp", "image/png", "image/heic", "image/svg+xml"],
    maxFileCount: 10,
    editor: { images: { cropShape: "circ", cropRatio: 1 / 1 } },
    styles: {
      colors: {
        primary: "#377dff"
      },
      fontSizes: {
        base: 16
      },
      breakpoints: {}
    }
  }).then(
    (f: UploadWidgetResult[]) => {
      alert(`-- JAVASCRIPT CALLBACK --\n\nImage(s) uploaded:\n\n${f.map(x => x.fileUrl).join("\n")}`);
    },
    (e: Error) => console.error(e)
  );
};

console.log("TEST LOG");

const button = document.createElement("button");
button.id = "uploadButton";
button.innerHTML = "Upload an Image...";
button.onclick = e => {
  e.preventDefault();
  openUploader();
};
document.getElementById("container")?.prepend(button);

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderSection = (title: string, items: string[], emptyLabel: string): string => `
  <section style="margin-top: 12px;">
    <h3 style="margin: 0 0 6px;">${title} (${items.length})</h3>
    <ul style="margin: 0; padding-left: 20px;">
      ${items.length > 0 ? items.join("") : `<li><em>${escapeHtml(emptyLabel)}</em></li>`}
    </ul>
  </section>
`;

const dropzoneEventSummary = document.createElement("div");
dropzoneEventSummary.id = "dropzoneEventSummary";
dropzoneEventSummary.style.cssText = [
  "margin-top: 16px",
  "max-width: 750px",
  "padding: 12px 16px",
  "border: 1px solid #d9d9e3",
  "border-radius: 10px",
  "background: #fafafe",
  "font-family: sans-serif"
].join("; ");

const renderDropzoneEventSummary = (event?: UploadWidgetOnUpdateEvent): void => {
  const failedFiles = event?.failedFiles ?? [];
  const pendingFiles = event?.pendingFiles ?? [];
  const uploadedFiles = event?.uploadedFiles ?? [];

  const failedItems = failedFiles.map(
    ({ file, error }) => `<li><strong>${escapeHtml(file.name)}</strong> - ${escapeHtml(error.message)}</li>`
  );

  const pendingItems = pendingFiles.map(({ file, progress, status }) => {
    const percentage = Math.round(progress * 100);
    return `<li><strong>${escapeHtml(file.name)}</strong> - ${escapeHtml(status)} (${percentage}%)</li>`;
  });

  const uploadedItems = uploadedFiles.map(
    ({ originalFile, filePath, fileUrl }) =>
      `<li><a href="${escapeHtml(fileUrl)}" target="_blank" rel="noreferrer">${escapeHtml(
        originalFile.file.name
      )}</a> - <code>${escapeHtml(filePath)}</code></li>`
  );

  dropzoneEventSummary.innerHTML = `
    <h2 style="margin: 0 0 8px;">Dropzone onUpdate State</h2>
    <p style="margin: 0; color: #555;">This panel mirrors the latest <code>onUpdate</code> payload from the inline dropzone.</p>
    ${renderSection("Pending Files", pendingItems, "No pending files.")}
    ${renderSection("Failed Files", failedItems, "No failed files.")}
    ${renderSection("Uploaded Files", uploadedItems, "No uploaded files.")}
  `;
};

document.getElementById("dropzone")?.insertAdjacentElement("afterend", dropzoneEventSummary);
renderDropzoneEventSummary();

let dropzoneMethods: UploadWidgetMethods | undefined;
let uploadAttempt = 1;
const dropZoneInitialConfig: UploadWidgetConfig = {
  apiKey,
  container: "#dropzone",
  layout: "inline",
  multi: true,
  maxFileCount: 2,
  showFinishButton: true,
  mimeTypes: [],
  onPreUpload: () => {
    dropzoneMethods?.updateConfig({
      ...dropZoneInitialConfig,
      editor: {
        images: {
          ...dropZoneInitialConfig.editor?.images,
          cropRatio: 1 / uploadAttempt++ // Test updating crop ratio dynamically, e.g. based on image dimensions.
        }
      }
    });
    return undefined;
  },
  editor: {
    images: {
      allowResizeOnMove: false
    }
  },
  locale: {},
  styles: {
    colors: {
      primary: "#8b63f1"
    }
  },
  onUpdate: event => {
    renderDropzoneEventSummary(event);
  },
  onInit: x => {
    dropzoneMethods = x;
  }
};
UploadWidget.open(dropZoneInitialConfig).then(
  (f: UploadWidgetResult[]) => {
    f.forEach(x => console.log(x.fileUrl));

    alert(`Image(s) uploaded:\n\n${f.map(x => x.fileUrl).join("\n")}\n\n(See logs in dev console.)`);
  },
  (e: Error) => console.error(e)
);

const dropzoneResetButton = document.createElement("button");
dropzoneResetButton.innerHTML = "Reset Dropzone";
dropzoneResetButton.onclick = e => {
  e.preventDefault();
  dropzoneMethods?.reset();
  renderDropzoneEventSummary();
};
document.getElementById("container")?.prepend(dropzoneResetButton);

const dropzoneUpdateButton = document.createElement("button");
dropzoneUpdateButton.innerHTML = "Update Dropzone Color";
dropzoneUpdateButton.onclick = e => {
  e.preventDefault();
  dropzoneMethods?.updateConfig({
    ...dropZoneInitialConfig,
    styles: { colors: { primary: `#${Math.floor(Math.random() * 16777215).toString(16)}` } }
  });
};
document.getElementById("container")?.prepend(dropzoneUpdateButton);

const dropzoneCloseButton = document.createElement("button");
dropzoneCloseButton.innerHTML = "Close Dropzone";
dropzoneCloseButton.onclick = e => {
  e.preventDefault();
  dropzoneMethods?.close();
  renderDropzoneEventSummary();
};
document.getElementById("container")?.prepend(dropzoneCloseButton);
