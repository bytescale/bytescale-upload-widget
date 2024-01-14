import { UploadWidgetLocale } from "@bytescale/upload-widget/modules/locales/UploadWidgetLocale";
import { UploadWidgetLocaleEnUs } from "@bytescale/upload-widget/modules/locales/EN_US";
import { UploadWidgetLayout } from "@bytescale/upload-widget/config/UploadWidgetLayout";
import { UploadWidgetEditor, UploadWidgetEditorRequired } from "@bytescale/upload-widget/config/UploadWidgetEditor";
import { UploadWidgetStyles, UploadWidgetStylesRequired } from "@bytescale/upload-widget/config/UploadWidgetStyles";
import { UploadWidgetMethods } from "@bytescale/upload-widget/config/UploadWidgetMethods";
import { UploadWidgetOnPreUploadResult } from "@bytescale/upload-widget/config/UploadWidgetOnPreUploadResult";
import { Resolvable } from "@bytescale/upload-widget/modules/common/Resolvable";
import { FilePathDefinition, BytescaleApiClientConfig } from "@bytescale/sdk";
import { UploadWidgetOnUpdateEvent } from "@bytescale/upload-widget/config/UploadWidgetOnUpdateEvent";
import { UploadWidgetLocaleDeprecatedFields } from "@bytescale/upload-widget/modules/locales/UploadWidgetLocaleDeprecatedFields";
import { removeUndefinedAndNullFields } from "@bytescale/upload-widget/modules/common/ObjectUtils";

export interface UploadWidgetConfig extends BytescaleApiClientConfig {
  container?: string | HTMLElement;
  editor?: UploadWidgetEditor;
  layout?: UploadWidgetLayout;
  locale?: Partial<UploadWidgetLocale> & Partial<UploadWidgetLocaleDeprecatedFields>;
  maxFileCount?: number;
  maxFileSizeBytes?: number;
  metadata?: object;
  mimeTypes?: string[];
  multi?: boolean;
  onInit?: (methods: UploadWidgetMethods) => void;
  onPreUpload?: ((file: File) => Resolvable<UploadWidgetOnPreUploadResult | undefined>) | undefined;
  onUpdate?: (event: UploadWidgetOnUpdateEvent) => void;
  path?: FilePathDefinition;
  showFinishButton?: boolean;
  showRemoveButton?: boolean;
  styles?: UploadWidgetStyles;
  tags?: string[];
}

export interface UploadWidgetConfigRequired extends BytescaleApiClientConfig {
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
  onPreUpload: (file: File) => Promise<UploadWidgetOnPreUploadResult | undefined>;
  onUpdate: (event: UploadWidgetOnUpdateEvent) => void;
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
      // Bytescale SDK settings:
      apiKey: options.apiKey,
      apiUrl: options.apiUrl,
      cdnUrl: options.cdnUrl,
      headers: options.headers,

      // Bytescale Upload Widget settings:
      container: options.container,
      editor: UploadWidgetEditorRequired.from(options.editor),
      layout,
      locale: {
        ...UploadWidgetLocaleEnUs,
        // Ensure we don't overwrite defaults with undefined fields.
        ...removeUndefinedAndNullFields({
          ...UploadWidgetLocaleDeprecatedFields.migrate(options.locale ?? {}),
          ...options.locale
        })
      },
      maxFileCount: options.maxFileCount,
      maxFileSizeBytes: options.maxFileSizeBytes,
      metadata: options.metadata,
      mimeTypes: options.mimeTypes?.map(x => x.trim().toLowerCase()),
      multi,
      onInit: options.onInit ?? (() => {}),
      onUpdate: options.onUpdate ?? (() => {}),
      onPreUpload: async (file): Promise<UploadWidgetOnPreUploadResult | undefined> => {
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
