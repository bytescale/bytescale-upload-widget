import App from "../pageobjects/app.page";

describe("uploader sandbox", () => {
  it("should contain a file upload button", async () => {
    await App.open();
    // @ts-expect-error
    await browser.pause(3000); // Wait for on-click handler to be registered.
    await App.modalLauncher.click();
    // @ts-expect-error
    await browser.pause(3000); // Wait for modal to appear.
    // @ts-expect-error
    await expect(App.modalButton).toHaveText("Upload an Image");
  });
});
