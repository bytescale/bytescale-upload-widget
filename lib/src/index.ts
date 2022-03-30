import { Uploader } from "uploader/Uploader";

export { Uploader } from "uploader/Uploader";
export { UploaderResult } from "uploader/components/modal/UploaderResult";
export { UploaderLocale } from "uploader/modules/locales/UploaderLocale";
export { UploaderLayout } from "uploader/UploaderLayout";
export { UploaderEditorParams } from "uploader/UploaderEditorParams";
export { UploaderParams } from "uploader/UploaderParams";
export { UploaderLocaleEnUs } from "uploader/modules/locales/EN_US";

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
