import { UploadedFile, Uploader } from "uploader";

// For local development of Upload.js only: this is not an example of how you should set the API key in your app.
const apiKey: string | undefined = (window as any).UPLOAD_JS_API_KEY;
if (apiKey === undefined) {
  throw new Error("You must set the environment variable 'UPLOAD_JS_API_KEY' before running webpack.");
}

const uploader = new Uploader({
  apiKey,
  internal: { apiUrl: (window as any).UPLOAD_JS_API_URL, cdnUrl: (window as any).UPLOAD_JS_CDN_URL }
});

const openUploader = (): void => {
  uploader.open({ multi: true }).then(
    (f: UploadedFile[]) => {
      console.log(`Files uploaded: ${f.map(x => x.fileId).join(", ")}`);
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
