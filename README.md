<h1 align="center">
  <a href="https://upload.io/uploader">
    <img alt="Upload.js" width="276" height="80" src="https://raw.githubusercontent.com/upload-io/assets/master/logo-uploader.svg">
  </a>
</h1>

<p align="center"><b>File & Image Uploader</b><br/> (With Integrated Cloud Storage)</p>
<br/>
<p align="center">
  <a href="https://github.com/upload-js/uploader/">
    <img src="https://img.shields.io/badge/gzipped-12%20kb-4ba0f6" />
  </a>

  <a href="https://www.npmjs.com/package/uploader">
    <img src="https://img.shields.io/badge/uploader-npm-4ba0f6" />
  </a>

  <a href="https://github.com/upload-js/uploader/actions/workflows/ci.yml">
    <img src="https://img.shields.io/badge/build-passing-4ba0f6" />
  </a>

  <a href="https://www.npmjs.com/package/uploader">
    <img src="https://img.shields.io/npm/dt/uploader?color=%234ba0f6" />
  </a>
  <br/>

  <a href="https://www.npmjs.com/package/uploader">
    <img src="https://img.shields.io/badge/TypeScript-included-4ba0f6" />
  </a>

  <a href="https://github.com/upload-js/uploader/actions/workflows/ci.yml">
    <img src="https://img.shields.io/npms-io/maintenance-score/upload-js?color=4ba0f6" />
  </a>

  <a target="_blank" href="https://twitter.com/intent/tweet?text=I%20just%20found%20Uploader%20%26%20Upload.io%20%E2%80%94%20they%20make%20it%20super%20easy%20to%20upload%20files%20%E2%80%94%20installs%20with%207%20lines%20of%20code%20https%3A%2F%2Fgithub.com%2Fupload-js%2Fuploader&hashtags=javascript,opensource,js,webdev,developers&via=UploadJS">
    <img alt="Twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fupload-js%2Fuploader%2F" />
  </a>

</p>

<h1 align="center">
  Get Started —
  <a href="https://codepen.io/upload-js/pen/QWOZWZR?editors=1010">
    Try on CodePen
  </a>
</h1>

<p align="center"><a href="https://upload.io/uploader"><img alt="Uploader Demo" width="100%" src="https://raw.githubusercontent.com/upload-js/uploader/main/.github/assets/demo.gif"></a></p>

## Installation

Install via NPM:

```shell
npm install uploader
```

Or via a `<script>` tag:

```html
<script src="https://js.upload.io/uploader/v1"></script>
```

## Usage — [Try on CodePen](https://codepen.io/upload-js/pen/QWOZWZR?editors=1010)

### Initialize

Initialize once at the start of your application:

```javascript
// Ignore if installed via a script tag.
const { Uploader } = require("uploader");

// Get production API keys from Upload.io
const uploader = new Uploader({
  apiKey: "free"
});
```

### Opening the widget

To display the upload widget:

```javascript
uploader.open({}).then(
  files => alert(files.length === 0
    ? "No files selected."
    : `Files uploaded:\n${files.map(x => x.fileUrl).join("\n")}`),
  error => alert(error)
);
```

#### Single-File vs. Multi-File

To perform a single-file upload (default):

```javascript
uploader.open({ multi: false })
```

To perform a multi-file upload:

```javascript
uploader.open({ multi: true })
```


### The result

`.open()` returns a promise of `UploadedFile[]`:

```javascript
[
  {
    accountId: "FW251aX",                       // The Upload.io account the file was uploaded to.
    file: { ... },                              // DOM file object (from the <input> element).
    fileId: "FW251aXa9ku...",                   // File ID. Append to 'https://files.upload.io/' for the file.
    fileUrl: "https://files.upload.io/FW25...", // File URL.
    fileSize: 12345,                            // File size in bytes.
    mime: "image/jpeg",                         // File MIME type.
    tags: [                                     // Tags manually & automatically assigned to this file.
      { name: "tag1", searchable: true },
      { name: "tag2", searchable: true },
      ...
    ]
  },
  ...
]
```

Note: an empty array is returned if the user closes the dialog without clicking "Finish".

### Optional parameters

```javascript
uploader
  .open({
    containerElementId: "custom-container", // <body> by default.
    layout: "modal",                        // "modal" by default. "inline" also supported.
    locale: myCustomLocale,                 // EN_US by default. (See "Localization" section below.)
    maxFileSizeBytes: 1024 ** 2,            // Unlimited by default.
    mimeTypes: ["image/jpeg"],              // Unrestricted by default.
    multi: false,                           // False by default.
    tags: ["profile_picture"]               // Requires an Upload.io account.
  })
  .then(files => alert(files))
```

#### Localization

```javascript
const myCustomLocale = {
  "addAnotherFile":   "Add another file...",
  "cancel":           "cancel",
  "cancelled!":       "cancelled",
  "finish":           "Finished",
  "finishIcon":       true,
  "orDragDropFile":   "...or drag and drop a file.",
  "orDragDropFiles":  "...or drag and drop files.",
  "pleaseWait":       "Please wait...",
  "removed!":         "removed",
  "remove":           "remove",
  "uploadFile":       "Select a File",
  "uploadFiles":      "Select Files"
}
```

## 🎯 Features

Uploader is the file & image uploader for [Upload.io](https://upload.io/uploader): the file upload service for developers.

**Core features (available without an account):**

- **Beautifully clean UI widget.** (Lightweight & Customizable.)
- Localization. (See the `locale` constructor parameter.)
- File Storage. (Files stored for 4 hours with the `"free"` API key.)
- File Hosting via CDN. (Files served from 100 locations worldwide.)
- Fast Image Transformations. (Resize images, crop images & convert images.)

**All features (available with an account):**

- Permanent Storage. (The `"free"` API key provides temporary storage only.)
- Unlimited Daily Uploads. (The `"free"` API key allows 100 uploads per day per IP.)
- Extended CDN Coverage. (Files served from 300+ locations worldwide.)
- Upload & Download Authentication. (Supports federated auth via your own JWT authorizer.)
- File & Folder Management.
- Expiring Links.
- Custom CNAME.
- Advanced Rules Engine:
  - Rate Limiting.
  - Traffic Limiting.
  - File Size Limiting.
  - IP Blacklisting.
  - File Type Blacklisting.
  - And More...

**[Create an Upload.io account »](https://upload.io/pricing)**

## Contribute

If you would like to contribute to Uploader:

1. Add a [GitHub Star](https://github.com/upload-js/uploader/stargazers) to the project (if you're feeling generous!).
2. Determine whether you're raising a bug, feature request or question.
3. Raise your issue or PR. 🚀

## License

[MIT](LICENSE)
