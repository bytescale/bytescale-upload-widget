import { UploadWidgetLocale } from "@bytescale/upload-widget/modules/locales/UploadWidgetLocale";
import { UploaderLocaleEnUs } from "@bytescale/upload-widget/modules/locales/EN_US";
import { UploadWidgetLayout } from "@bytescale/upload-widget/config/UploadWidgetLayout";
import { UploadWidgetEditor, UploadWidgetEditorRequired } from "@bytescale/upload-widget/config/UploadWidgetEditor";
import { UploadWidgetResult } from "@bytescale/upload-widget/components/modal/UploadWidgetResult";
import { UploadWidgetStyles, UploadWidgetStylesRequired } from "@bytescale/upload-widget/config/UploadWidgetStyles";
import { UploadWidgetMethods } from "@bytescale/upload-widget/config/UploadWidgetMethods";
import { OnPreUploadResult } from "@bytescale/upload-widget/config/OnPreUploadResult";
import { Resolvable } from "@bytescale/upload-widget/modules/common/Resolvable";
import { FilePathDefinition } from "@bytescale/sdk";

export interface UploadWidgetConfig {
  container?: string | HTMLElement;
  editor?: UploadWidgetEditor;
  layout?: UploadWidgetLayout;
  locale?: UploadWidgetLocale;
  maxFileCount?: number;
  maxFileSizeBytes?: number;
  metadata?: object;
  mimeTypes?: string[];
  multi?: boolean;
  onInit?: (methods: UploadWidgetMethods) => void;
  onPreUpload?: ((file: File) => Resolvable<OnPreUploadResult | undefined>) | undefined;
  onUpdate?: (files: UploadWidgetResult[]) => void;
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
  metadata: object | undefined;
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
        const { onPreUpload } = options;
        return onPreUpload === undefined ? undefined : await onPreUpload(file);
      },
      path: options.path,
      showFinishButton: options.showFinishButton ?? (multi ? layout === "modal" : false),
      showRemoveButton: options.showRemoveButton ?? true,
      styles: UploadWidgetStylesRequired.from(options.styles),
      tags: options.tags ?? []
    };
  }
}
