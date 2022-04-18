import App from "../pageobjects/app.page";

describe("uploader sandbox", () => {
  it("should contain a dropzone component", async () => {
    await App.open();
    await expect(App.dropzoneUploadButton).toHaveText("Upload a File");
  });
  it("should contain a file upload button", async () => {
    await App.open();
    await browser.pause(1000); // Wait for on-click handler to be registered.
    await App.modalLauncher.click();
    await expect(App.modalButton).toHaveText("Upload a File");
  });
});
