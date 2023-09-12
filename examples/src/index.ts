import { UploadWidget, UploadWidgetConfig, UploadWidgetMethods, UploadWidgetResult } from "@bytescale/upload-widget";

// For local development of Upload.js only: this is not an example of how you should set the API key in your app.
const apiKey: string | undefined = (window as any).UPLOAD_JS_API_KEY;

const uploadWidget = new UploadWidget({
  apiKey: apiKey ?? "free"
  // internal: { apiUrl: (window as any).UPLOAD_JS_API_URL, cdnUrl: (window as any).UPLOAD_JS_CDN_URL }
});

const openUploader = (): void => {
  uploadWidget
    .open({
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
        }
      }
    })
    .then(
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

let dropzoneMethods: UploadWidgetMethods | undefined;
const dropZoneInitialConfig: UploadWidgetConfig = {
  container: "#dropzone",
  layout: "inline",
  multi: true,
  maxFileCount: 2,
  showFinishButton: true,
  styles: {
    colors: {
      primary: "#8b63f1"
    }
  },
  onInit: x => {
    dropzoneMethods = x;
  }
};
uploadWidget.open(dropZoneInitialConfig).then(
  (f: UploadWidgetResult[]) => {
    alert(`-- JAVASCRIPT CALLBACK --\n\nImage(s) uploaded:\n\n${f.map(x => x.fileUrl).join("\n")}`);
  },
  (e: Error) => console.error(e)
);

const dropzoneResetButton = document.createElement("button");
dropzoneResetButton.innerHTML = "Reset Dropzone";
dropzoneResetButton.onclick = e => {
  e.preventDefault();
  dropzoneMethods?.reset();
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
};
document.getElementById("container")?.prepend(dropzoneCloseButton);
