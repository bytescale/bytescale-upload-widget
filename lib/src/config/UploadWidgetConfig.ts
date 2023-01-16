import { UploadWidgetLocale } from "uploader/modules/locales/UploadWidgetLocale";
import { UploaderLocaleEnUs } from "uploader/modules/locales/EN_US";
import { UploadWidgetLayout } from "uploader/config/UploadWidgetLayout";
import { UploadWidgetEditor, UploadWidgetEditorRequired } from "uploader/config/UploadWidgetEditor";
import { UploadWidgetResult } from "uploader/components/modal/UploadWidgetResult";
import { UploadWidgetStyles, UploadWidgetStylesRequired } from "uploader/config/UploadWidgetStyles";
import { FilePathDefinition, JsonObject } from "@upload-io/upload-api-client-upload-js";

export interface UploadWidgetConfig {
  container?: string | HTMLElement;
  editor?: UploadWidgetEditor;
  layout?: UploadWidgetLayout;
  locale?: UploadWidgetLocale;
  maxFileCount?: number;
  maxFileSizeBytes?: number;
  metadata?: JsonObject;
  mimeTypes?: string[];
  multi?: boolean;
  onUpdate?: (files: UploadWidgetResult[]) => void;
  onValidate?: (file: File) => Promise<string | undefined>;
  path?: FilePathDefinition;
  showFinishButton?: boolean;
  showRemoveButton?: boolean;
  styles?: UploadWidgetStyles;
  tags?: string[];
}

export interface UploadWidgetConfigRequired {
  container: string | HTMLElement | undefined;
  editor: UploadWidgetEditorRequired;
  layout: UploadWidgetLayout;
  locale: UploadWidgetLocale;
  maxFileCount: number | undefined;
  maxFileSizeBytes: number | undefined;
  metadata: JsonObject | undefined;
  mimeTypes: string[] | undefined;
  multi: boolean;
  onUpdate: (files: UploadWidgetResult[]) => void;
  onValidate: ((file: File) => Promise<string | undefined>) | undefined;
  path: FilePathDefinition | undefined;
  showFinishButton: boolean;
  showRemoveButton: boolean;
  styles: UploadWidgetStylesRequired;
  tags: string[];
}

export namespace UploadWidgetConfigRequired {
  export function from(options: UploadWidgetConfig): UploadWidgetConfigRequired {
    const layout = options.layout ?? "modal";
    const multi = options.multi ?? (options.maxFileCount !== undefined && options.maxFileCount > 1);
    return {
      container: options.container,
      editor: UploadWidgetEditorRequired.from(options.editor),
      layout,
      locale: options.locale ?? UploaderLocaleEnUs,
      maxFileCount: options.maxFileCount,
      maxFileSizeBytes: options.maxFileSizeBytes,
      metadata: options.metadata,
      mimeTypes: options.mimeTypes,
      multi,
      onUpdate: options.onUpdate ?? (() => {}),
      onValidate: options.onValidate,
      path: options.path,
      showFinishButton: options.showFinishButton ?? (multi ? layout === "modal" : false),
      showRemoveButton: options.showRemoveButton ?? true,
      styles: UploadWidgetStylesRequired.from(options.styles),
      tags: options.tags ?? []
    };
  }
}
