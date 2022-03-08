import { FileTag } from "@upload-io/upload-api-client-upload-js";
import { UploaderLocale } from "uploader/modules/locales/UploaderLocale";
import { UploaderLocaleEnUs } from "uploader/modules/locales/EN_US";
import { UploaderLayout } from "uploader/UploaderLayout";
import { UploadedFile } from "upload-js";

export interface UploaderParams {
  container?: string | HTMLElement;
  layout?: UploaderLayout;
  locale?: UploaderLocale;
  maxFileSizeBytes?: number;
  mimeTypes?: string[];
  multi?: boolean;
  onUpdate?: (files: UploadedFile[]) => void;
  showFinishButton?: boolean;
  showRemoveButton?: boolean;
  tags?: Array<string | FileTag>;
}

export interface UploaderParamsRequired {
  container: string | HTMLElement | undefined;
  layout: UploaderLayout;
  locale: UploaderLocale;
  maxFileSizeBytes: number | undefined;
  mimeTypes: string[] | undefined;
  multi: boolean;
  onUpdate: (files: UploadedFile[]) => void;
  showFinishButton: boolean;
  showRemoveButton: boolean;
  tags: Array<string | FileTag>;
}

export namespace UploaderParamsRequired {
  export function from(params: UploaderParams): UploaderParamsRequired {
    const layout = params.layout ?? "modal";
    const multi = params.multi ?? false;
    return {
      container: params.container,
      layout,
      locale: params.locale ?? UploaderLocaleEnUs,
      maxFileSizeBytes: params.maxFileSizeBytes,
      mimeTypes: params.mimeTypes,
      multi,
      onUpdate: params.onUpdate ?? (() => {}),
      showFinishButton: params.showFinishButton ?? (multi ? layout === "modal" : false),
      showRemoveButton: params.showRemoveButton ?? true,
      tags: params.tags ?? []
    };
  }
}
