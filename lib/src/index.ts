import { UploaderInterface } from "uploader/UploaderInterface";

export { Uploader } from "uploader/Uploader";
export { UploaderInterface } from "uploader/UploaderInterface";
export { UploadWidgetResult } from "uploader/components/modal/UploadWidgetResult";
export { UploadWidgetLocale } from "uploader/modules/locales/UploadWidgetLocale";
export { UploadWidgetLayout } from "uploader/config/UploadWidgetLayout";
export { UploadWidgetEditor } from "uploader/config/UploadWidgetEditor";
export { UploadWidgetConfig } from "uploader/config/UploadWidgetConfig";
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
