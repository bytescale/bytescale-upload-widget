import { expect } from "@wdio/globals";
import App from "../pageobjects/app.page";

describe("@bytescale/upload-widget sandbox", () => {
  it("should contain a file upload button", async () => {
    try {
      await App.open();
      await browser.pause(1000); // Wait for on-click handler to be registered.
      await App.modalLauncher.click();
      await expect(App.modalButton).toHaveText("Upload an Image");
    } finally {
      const logs: string[] = await (browser as any).getLogs("browser");
      logs.forEach(x => console.log(x));
    }
  });
});
