import { UploadWidgetLocale } from "uploader/modules/locales/UploadWidgetLocale";
import { UploaderLocaleEnUs } from "uploader/modules/locales/EN_US";
import { UploadWidgetLayout } from "uploader/config/UploadWidgetLayout";
import { UploadWidgetEditor, UploadWidgetEditorRequired } from "uploader/config/UploadWidgetEditor";
import { UploadWidgetResult } from "uploader/components/modal/UploadWidgetResult";
import { UploadWidgetStyles, UploadWidgetStylesRequired } from "uploader/config/UploadWidgetStyles";
import { FilePathDefinition, JsonObject } from "@upload-io/upload-api-client-upload-js";
import { UploadWidgetMethods } from "uploader/config/UploadWidgetMethods";
import { OnPreUploadResult } from "uploader/config/OnPreUploadResult";
import { Resolvable } from "uploader/modules/common/Resolvable";

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
  onInit?: (methods: UploadWidgetMethods) => void;
  onPreUpload?: ((file: File) => Resolvable<OnPreUploadResult | undefined>) | undefined;
  onUpdate?: (files: UploadWidgetResult[]) => void;
  /**
   * @deprecated Use 'onPreUpload' instead, e.g. onPreUpload: (file: File) => ({errorMessage: "File too big."})
   */
  onValidate?: (file: File) => Resolvable<string | undefined>;
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
  onInit: (methods: UploadWidgetMethods) => void;
  onPreUpload: (file: File) => Promise<OnPreUploadResult | undefined>;
  onUpdate: (files: UploadWidgetResult[]) => void;
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
      locale: {
        ...UploaderLocaleEnUs, // This way ensures if the client code excludes certain entries (e.g. we've added new ones) then we default onto those.
        ...options.locale
      },
      maxFileCount: options.maxFileCount,
      maxFileSizeBytes: options.maxFileSizeBytes,
      metadata: options.metadata,
      mimeTypes: options.mimeTypes?.map(x => x.trim().toLowerCase()),
      multi,
      onInit: options.onInit ?? (() => {}),
      onUpdate: options.onUpdate ?? (() => {}),
      onPreUpload: async (file): Promise<OnPreUploadResult | undefined> => {
        const { onValidate, onPreUpload } = options;
        return {
          ...(onValidate === undefined ? {} : { errorMessage: await onValidate(file) }),
          ...(onPreUpload === undefined ? {} : await onPreUpload(file))
        };
      },
      path: options.path,
      showFinishButton: options.showFinishButton ?? (multi ? layout === "modal" : false),
      showRemoveButton: options.showRemoveButton ?? true,
      styles: UploadWidgetStylesRequired.from(options.styles),
      tags: options.tags ?? []
    };
  }
}
