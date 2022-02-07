/* eslint-disable */
const jasmineReporters = require("jasmine-reporters");
const HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");

const testReportFolders = "tmp/test-report";

const junitReporter = new jasmineReporters.JUnitXmlReporter({
  consolidateAll: true,
  savePath: testReportFolders
});
const screenshotReporter = new HtmlScreenshotReporter({
  dest: testReportFolders,
  filename: "screenshots.html"
});

const chromeDriverLocation = process.env.CHROMEWEBDRIVER; // CI may provide its own chrome driver.

exports.config = {
  specs: ["homepage.js"],
  baseUrl: "http://localhost:3001/",
  directConnect: true,
  ...(chromeDriverLocation ? { chromeDriver: `${chromeDriverLocation}/chromedriver` } : {}),
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      args: ["--headless", "--disable-gpu", "--window-size=800,600"]
    }
  },

  beforeLaunch() {
    return new Promise(function (resolve) {
      screenshotReporter.beforeLaunch(resolve);
    });
  },

  onPrepare() {
    // Disables waiting for Angular.
    browser.ignoreSynchronization = true;

    jasmine.getEnv().addReporter(junitReporter);
    jasmine.getEnv().addReporter(screenshotReporter);
  },

  // Close the report after all tests finish
  afterLaunch(exitCode) {
    return new Promise(function (resolve) {
      screenshotReporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};
