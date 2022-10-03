import { Uploader } from "uploader";
import { UploaderResult } from "uploader/components/modal/UploaderResult";

// For local development of Upload.js only: this is not an example of how you should set the API key in your app.
const apiKey: string | undefined = (window as any).UPLOAD_JS_API_KEY;

const uploader = Uploader({
  apiKey: apiKey ?? "free",
  internal: { apiUrl: (window as any).UPLOAD_JS_API_URL, cdnUrl: (window as any).UPLOAD_JS_CDN_URL }
});

const openUploader = (): void => {
  uploader
    .open({
      multi: true,
      mimeTypes: ["image/jpeg", "image/webp", "image/png"],
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
      (f: UploaderResult[]) => {
        alert(`-- JAVASCRIPT CALLBACK --\n\nImage(s) uploaded:\n\n${f.map(x => x.url).join("\n")}`);
      },
      (e: Error) => console.error(e)
    );
};

const button = document.createElement("button");
button.id = "uploadButton";
button.innerHTML = "Upload an Image...";
button.onclick = e => {
  e.preventDefault();
  openUploader();
};
document.body.prepend(button);
