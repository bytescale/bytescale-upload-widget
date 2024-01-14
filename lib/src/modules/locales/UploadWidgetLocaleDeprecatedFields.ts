import { UploadWidgetLocale } from "@bytescale/upload-widget";

export interface UploadWidgetLocaleDeprecatedFields {
  /**
   * @deprecated Use 'locale.addAnotherFileBtn' instead.
   */
  "addAnotherFile": string;

  /**
   * @deprecated Use 'locale.addAnotherImageBtn' instead.
   */
  "addAnotherImage": string;

  /**
   * @deprecated Use 'locale.cancelBtn' instead.
   */
  "cancel": string;

  /**
   * @deprecated Use 'locale.cancelPreviewBtn' instead.
   */
  "cancelInPreviewWindow": string;

  /**
   * @deprecated Use 'locale.cancelBtnClicked' instead.
   */
  "cancelled!": string;

  /**
   * @deprecated Use 'locale.continueBtn' instead.
   */
  "continue": string;

  /**
   * @deprecated Use 'locale.cropBtn' instead.
   */
  "crop": string;

  /**
   * @deprecated Use 'locale.doneBtn' instead.
   */
  "done": string;

  /**
   * @deprecated Use 'locale.submitBtnError' instead.
   */
  "error!": string;

  /**
   * @deprecated Use 'locale.finishBtn' instead.
   */
  "finish": string;

  /**
   * @deprecated Use 'locale.finishBtnIcon' instead.
   */
  "finishIcon": boolean;

  /**
   * @deprecated Use 'locale.imageCropNumberPrefix' instead.
   */
  "image": string;

  /**
   * @deprecated Use 'locale.maxFilesReachedPrefix' instead.
   */
  "maxFilesReached": string;

  /**
   * @deprecated Use 'locale.maxImagesReachedPrefix' instead.
   */
  "maxImagesReached": string;

  /**
   * @deprecated Use 'locale.fileSizeLimitPrefix' instead.
   */
  "maxSize": string;

  /**
   * @deprecated This field is redundant (its text is no-longer used).
   */
  "next": string;

  /**
   * @deprecated Use 'locale.xOfY' instead.
   */
  "of": string;

  /**
   * @deprecated Use 'locale.orDragDropFileMulti' instead.
   */
  "orDragDropFiles": string;

  /**
   * @deprecated Use 'locale.orDragDropImageMulti' instead.
   */
  "orDragDropImages": string;

  /**
   * @deprecated Use 'locale.submitBtnLoading' instead.
   */
  "pleaseWait": string;

  /**
   * @deprecated Use 'locale.removeBtn' instead.
   */
  "remove": string;

  /**
   * @deprecated Use 'locale.removeBtnClicked' instead.
   */
  "removed!": string;

  /**
   * @deprecated This field is redundant (its text is no-longer used).
   */
  "skip": string;

  /**
   * @deprecated Use 'locale.uploadFileBtn' instead.
   */
  "uploadFile": string;

  /**
   * @deprecated Use 'locale.uploadFileMultiBtn' instead.
   */
  "uploadFiles": string;

  /**
   * @deprecated Use 'locale.uploadImageBtn' instead.
   */
  "uploadImage": string;

  /**
   * @deprecated Use 'locale.uploadImageMultiBtn' instead.
   */
  "uploadImages": string;
}

export namespace UploadWidgetLocaleDeprecatedFields {
  export function migrate({
    "addAnotherFile": addAnotherFileBtn,
    "addAnotherImage": addAnotherImageBtn,
    "cancel": cancelBtn,
    "cancelInPreviewWindow": cancelPreviewBtn,
    "cancelled!": cancelBtnClicked,
    "continue": continueBtn,
    "crop": cropBtn,
    "done": doneBtn,
    "error!": submitBtnError,
    "finish": finishBtn,
    "finishIcon": finishBtnIcon,
    "image": imageCropNumberPrefix,
    "maxFilesReached": maxFilesReachedPrefix,
    "maxImagesReached": maxImagesReachedPrefix,
    "maxSize": fileSizeLimitPrefix,
    "of": xOfY,
    "orDragDropFiles": orDragDropFileMulti,
    "orDragDropImages": orDragDropImageMulti,
    "pleaseWait": submitBtnLoading,
    "remove": removeBtn,
    "removed!": removeBtnClicked,
    "uploadFile": uploadFileBtn,
    "uploadFiles": uploadFileMultiBtn,
    "uploadImage": uploadImageBtn,
    "uploadImages": uploadImageMultiBtn
  }: Partial<UploadWidgetLocaleDeprecatedFields>): Partial<UploadWidgetLocale> {
    return {
      addAnotherFileBtn,
      addAnotherImageBtn,
      cancelBtn,
      cancelBtnClicked,
      cancelPreviewBtn,
      continueBtn,
      cropBtn,
      doneBtn,
      fileSizeLimitPrefix,
      finishBtn,
      finishBtnIcon,
      imageCropNumberPrefix,
      maxFilesReachedPrefix,
      maxImagesReachedPrefix,
      orDragDropFileMulti,
      orDragDropImageMulti,
      removeBtn,
      removeBtnClicked,
      submitBtnError,
      submitBtnLoading,
      uploadFileBtn,
      uploadFileMultiBtn,
      uploadImageBtn,
      uploadImageMultiBtn,
      xOfY
    };
  }
}
