import { FileTag } from "@upload-io/upload-api-client-upload-js";
import { UploaderLocale } from "uploader/modules/locales/UploaderLocale";
import { UploaderLocaleEnUs } from "uploader/modules/locales/EN_US";
import { UploaderLayout } from "uploader/UploaderLayout";
import { UploaderEditorOptions, UploaderEditorOptionsRequired } from "uploader/UploaderEditorOptions";
import { UploaderResult } from "uploader/components/modal/UploaderResult";
import { UploaderStyleOptions, UploaderStyleOptionsRequired } from "uploader/UploaderStyleOptions";

export interface UploaderOptions {
  container?: string | HTMLElement;
  editor?: UploaderEditorOptions;
  layout?: UploaderLayout;
  locale?: UploaderLocale;
  maxFileCount?: number;
  maxFileSizeBytes?: number;
  mimeTypes?: string[];
  multi?: boolean;
  onUpdate?: (files: UploaderResult[]) => void;
  showFinishButton?: boolean;
  showRemoveButton?: boolean;
  styles?: UploaderStyleOptions;
  tags?: Array<string | FileTag>;
}

export interface UploaderOptionsRequired {
  container: string | HTMLElement | undefined;
  editor: UploaderEditorOptionsRequired;
  layout: UploaderLayout;
  locale: UploaderLocale;
  maxFileCount: number | undefined;
  maxFileSizeBytes: number | undefined;
  mimeTypes: string[] | undefined;
  multi: boolean;
  onUpdate: (files: UploaderResult[]) => void;
  showFinishButton: boolean;
  showRemoveButton: boolean;
  styles: UploaderStyleOptionsRequired;
  tags: Array<string | FileTag>;
}

export namespace UploaderOptionsRequired {
  export function from(options: UploaderOptions): UploaderOptionsRequired {
    const layout = options.layout ?? "modal";
    const multi = options.multi ?? (options.maxFileCount !== undefined && options.maxFileCount > 1);
    return {
      container: options.container,
      editor: UploaderEditorOptionsRequired.from(options.editor),
      layout,
      locale: options.locale ?? UploaderLocaleEnUs,
      maxFileCount: options.maxFileCount,
      maxFileSizeBytes: options.maxFileSizeBytes,
      mimeTypes: options.mimeTypes,
      multi,
      onUpdate: options.onUpdate ?? (() => {}),
      showFinishButton: options.showFinishButton ?? (multi ? layout === "modal" : false),
      showRemoveButton: options.showRemoveButton ?? true,
      styles: UploaderStyleOptionsRequired.from(options.styles),
      tags: options.tags ?? []
    };
  }
}
