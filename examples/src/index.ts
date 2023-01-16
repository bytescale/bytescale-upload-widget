import { Uploader, UploadWidgetResult } from "uploader";

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
      onValidate: async file =>
        await new Promise((resolve, reject) =>
          setTimeout(
            () =>
              file.name.endsWith("webp")
                ? reject(new Error("Some error"))
                : resolve(file.size > 50 * 1024 ? "This file looks bad." : undefined),
            5000
          )
        ),
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

const button = document.createElement("button");
button.id = "uploadButton";
button.innerHTML = "Upload an Image...";
button.onclick = e => {
  e.preventDefault();
  openUploader();
};
document.body.prepend(button);
