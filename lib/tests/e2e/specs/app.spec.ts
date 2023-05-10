import App from "../pageobjects/app.page";

describe("uploader sandbox", () => {
  it("should contain a file upload button", async () => {
    try {
      await App.open();
      // @ts-expect-error
      await browser.pause(1000); // Wait for on-click handler to be registered.
      await App.modalLauncher.click();
      // @ts-expect-error
      await expect(App.modalButton).toHaveText("Upload an Image");
    } finally {
      // @ts-expect-error
      const logs: string[] = await (browser as any).getLogs("browser");
      logs.forEach(x => console.log(x));
    }
  });
});
