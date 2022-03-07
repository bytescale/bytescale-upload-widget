import { Uploader } from "uploader/Uploader";

export { Uploader } from "uploader/Uploader";
export * from "upload-js";

if (typeof window !== "undefined") {
  const dummy: Record<keyof Uploader, () => void> = {
    open(): void {
      throw new Error(
        "You forgot to initialize Uploader!\nPlease initialize 'uploader' with:\nconst uploader = new Uploader({ apiKey: 'free' });"
      );
    }
  };

  (window as any).uploader = dummy;
}
