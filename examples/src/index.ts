import { Uploader, UploadWidgetMethods, UploadWidgetResult } from "uploader";

// For local development of Upload.js only: this is not an example of how you should set the API key in your app.
const apiKey: string | undefined = (window as any).UPLOAD_JS_API_KEY;

const uploader = Uploader({
  apiKey: apiKey ?? "free"
  // internal: { apiUrl: (window as any).UPLOAD_JS_API_URL, cdnUrl: (window as any).UPLOAD_JS_CDN_URL }
});

const openUploader = (): void => {
  uploader
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
  console.log("I have been clicked!");
  e.preventDefault();
  openUploader();
};
document.getElementById("container")?.prepend(button);

let dropzoneMethods: UploadWidgetMethods | undefined;
uploader
  .open({
    container: "#dropzone",
    layout: "inline",
    multi: true,
    showFinishButton: true,
    onInit: x => {
      dropzoneMethods = x;
    }
  })
  .then(
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

const dropzoneCloseButton = document.createElement("button");
dropzoneCloseButton.innerHTML = "Close Dropzone";
dropzoneCloseButton.onclick = e => {
  e.preventDefault();
  dropzoneMethods?.close();
};
document.getElementById("container")?.prepend(dropzoneCloseButton);
