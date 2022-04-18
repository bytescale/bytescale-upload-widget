/* eslint-disable @typescript-eslint/explicit-function-return-type */

class App {
  /**
   * elements
   */
  get heading() {
    return $("h1");
  }

  get dropzoneUploadButton() {
    return $("#dropzone .btn");
  }

  get modalLauncher() {
    return $("#uploadButton");
  }

  get modal() {
    return $(".uploader--with-modal");
  }

  get modalButton() {
    return $(".uploader--with-modal .btn");
  }

  /**
   * methods
   */
  async open(path = "/") {
    await browser.url(path);
  }
}

export default new App();
