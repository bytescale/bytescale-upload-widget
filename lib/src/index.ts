import { UploaderInterface } from "uploader/UploaderInterface";

export { Uploader } from "uploader/Uploader";
export { UploaderInterface } from "uploader/UploaderInterface";
export { UploaderResult } from "uploader/components/modal/UploaderResult";
export { UploaderLocale } from "uploader/modules/locales/UploaderLocale";
export { UploaderLayout } from "uploader/UploaderLayout";
export { UploaderEditorOptions } from "uploader/UploaderEditorOptions";
export { UploaderOptions } from "uploader/UploaderOptions";
export { UploaderLocaleEnUs } from "uploader/modules/locales/EN_US";

if (typeof window !== "undefined") {
  const dummy: Partial<Record<keyof UploaderInterface, () => void>> = {
    open(): void {
      throw new Error(
        "You forgot to initialize Uploader!\nPlease initialize 'uploader' with:\nconst uploader = Uploader({ apiKey: 'free' });"
      );
    }
  };

  (window as any).uploader = dummy;
}
