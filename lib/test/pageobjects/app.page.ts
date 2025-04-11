/* eslint-disable @typescript-eslint/explicit-function-return-type */

class App {
  /**
   * elements
   */
  get heading() {
    return $("h1");
  }

  get modalLauncher() {
    return $("#uploadButton");
  }

  get modal() {
    return $(".upload-widget--with-modal");
  }

  get modalButton() {
    return $(".upload-widget--with-modal .btn");
  }

  /**
   * methods
   */
  async open(path = "/") {
    await browser.url(path);
  }
}

export default new App();
