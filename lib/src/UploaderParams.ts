import { FileTag } from "@upload-io/upload-api-client-upload-js";
import { UploaderWidgetLocale } from "uploader/modules/locales/UploaderWidgetLocale";
import { uploaderWidgetLocaleEnUs } from "uploader/modules/locales/EN_US";
import { UploaderLayout } from "uploader/UploaderLayout";

export interface UploaderParams {
  containerElement?: string | HTMLElement;
  layout?: UploaderLayout;
  locale?: UploaderWidgetLocale;
  maxFileSizeBytes?: number;
  mimeTypes?: string[];
  multi?: boolean;
  tags?: Array<string | FileTag>;
}

export interface UploaderParamsRequired {
  containerElement: string | HTMLElement | undefined;
  layout: UploaderLayout;
  locale: UploaderWidgetLocale;
  maxFileSizeBytes: number | undefined;
  mimeTypes: string[] | undefined;
  multi: boolean;
  tags: Array<string | FileTag>;
}

export namespace UploaderParamsRequired {
  export function from(params: UploaderParams): UploaderParamsRequired {
    return {
      containerElement: params.containerElement,
      layout: params.layout ?? "modal",
      locale: params.locale ?? uploaderWidgetLocaleEnUs,
      maxFileSizeBytes: params.maxFileSizeBytes,
      mimeTypes: params.mimeTypes,
      multi: params.multi ?? false,
      tags: params.tags ?? []
    };
  }
}
