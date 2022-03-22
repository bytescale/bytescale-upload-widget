import { Uploader } from "uploader";
import { UploaderResult } from "uploader/components/modal/UploaderResult";

// For local development of Upload.js only: this is not an example of how you should set the API key in your app.
const apiKey: string | undefined = (window as any).UPLOAD_JS_API_KEY;

const uploader = new Uploader({
  apiKey: apiKey ?? "free",
  internal: { apiUrl: (window as any).UPLOAD_JS_API_URL, cdnUrl: (window as any).UPLOAD_JS_CDN_URL }
});

const openUploader = (): void => {
  uploader
    .open({
      multi: false,
      mimeTypes: ["image/jpeg", "image/webp", "image/png"],
      editor: { images: { cropShape: "circ", cropRatio: 1 / 1 } }
    })
    .then(
      (f: UploaderResult[]) => {
        alert(`-- JAVASCRIPT CALLBACK --\n\nFiles uploaded:\n\n${f.map(x => x.fileUrl).join("\n")}`);
      },
      (e: Error) => console.error(e)
    );
};

openUploader();

const button = document.createElement("a");
button.innerHTML = "Try Me Out!";
button.href = "#open";
button.onclick = e => {
  e.preventDefault();
  openUploader();
};
document.body.appendChild(button);
