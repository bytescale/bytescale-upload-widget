/* eslint-disable @typescript-eslint/explicit-function-return-type */

class App {
  /**
   * elements
   */
  get heading() {
    // @ts-expect-error
    return $("h1");
  }

  get modalLauncher() {
    // @ts-expect-error
    return $("#uploadButton");
  }

  get modal() {
    // @ts-expect-error
    return $(".uploader--with-modal");
  }

  get modalButton() {
    // @ts-expect-error
    return $(".uploader--with-modal .btn");
  }

  /**
   * methods
   */
  async open(path = "/") {
    // @ts-expect-error
    await browser.url(path);
  }
}

export default new App();
