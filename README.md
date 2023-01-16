<h1 align="center">
  <a href="https://upload.io/uploader">
    <img alt="Uploader" width="313" height="93" src="https://raw.githubusercontent.com/upload-io/uploader/main/.github/assets/logo.svg">
  </a>
</h1>
<p align="center"><b>File & Image Upload Widget</b><br/> (With Integrated Cloud Storage)</p>
<br/>
<p align="center">
  <a href="https://github.com/upload-io/uploader/">
    <img src="https://img.shields.io/badge/gzipped-33%20kb-4ba0f6" />
  </a>

  <a href="https://www.npmjs.com/package/uploader">
    <img src="https://img.shields.io/badge/uploader-npm-4ba0f6" />
  </a>

  <a href="https://github.com/upload-io/uploader/actions/workflows/ci.yml">
    <img src="https://img.shields.io/badge/build-passing-4ba0f6" />
  </a>

  <a href="https://www.npmjs.com/package/uploader">
    <img src="https://img.shields.io/npm/dt/uploader?color=%234ba0f6" />
  </a>
  <br/>

  <a href="https://www.npmjs.com/package/uploader">
    <img src="https://img.shields.io/badge/TypeScript-included-4ba0f6" />
  </a>

  <a href="https://github.com/upload-io/uploader/actions/workflows/ci.yml">
    <img src="https://img.shields.io/npms-io/maintenance-score/uploader?color=4ba0f6" />
  </a>

  <a target="_blank" href="https://twitter.com/intent/tweet?text=I%20just%20found%20Uploader%20%26%20Upload.io%20%E2%80%94%20they%20make%20it%20super%20easy%20to%20upload%20files%20%E2%80%94%20installs%20with%207%20lines%20of%20code%20https%3A%2F%2Fgithub.com%2Fupload-io%2Fuploader&hashtags=javascript,opensource,js,webdev,developers&via=UploadJS">
    <img alt="Twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fupload-io%2Fuploader%2F" />
  </a>

</p>
<h1 align="center">
  Get Started —
  <a href="https://codepen.io/upload-js/pen/QWOZWZR?editors=0010">
    Try on CodePen
  </a>
</h1>

<p align="center"><a href="https://upload.io/uploader"><img alt="Upload Widget Demo" width="100%" src="https://raw.githubusercontent.com/upload-io/uploader/main/.github/assets/demo.gif"></a></p>

<p align="center">100% Serverless File Upload Widget  <br /> Powered by <a href="https://upload.io/">Upload.io</a><br/><br/></p>

<hr/>

<p align="center"><a href="https://upload.io/dmca" rel="nofollow">DMCA Compliant</a> • <a href="https://upload.io/dpa" rel="nofollow">GDPR Compliant</a> • <a href="https://upload.io/sla" rel="nofollow">99.9% Uptime SLA</a>
  <br/>
  <b>Supports:</b> Rate Limiting, Volume Limiting, File Size &amp; Type Limiting, JWT Auth, and more...
  <br />
</p>

<hr/>
<br />
<br />

## Installation

Install via NPM:

```shell
npm install uploader
```

Or via YARN:

```shell
yarn add uploader
```

Or via a `<script>` tag:

```html
<script src="https://js.upload.io/uploader/v3"></script>
```

## Usage

### Initialize

Initialize once at the start of your application:

```javascript
// Ignore if installed via a script tag.
const { Uploader } = require("uploader");

// Get production API keys from Upload.io
const uploader = Uploader({
  apiKey: "free"
});
```

### Open the Modal — [Try on CodePen](https://codepen.io/upload-js/pen/oNoRmJW?editors=1010):

```javascript
uploader.open({ multi: true }).then(files => {
  if (files.length === 0) {
    console.log('No files selected.')
  } else {
    console.log('Files uploaded:');
    console.log(files.map(f => f.fileUrl));
  }
}).catch(err => {
  console.error(err);
});
```

### Get the Result

`.open()` returns `Promise<Array<UploaderResult>>`:

```javascript
{
  fileUrl: "https://upcdn.io/FW25...",   // URL to use when serving this file.
  filePath: "/uploads/example.jpg",      // File path (we recommend saving this to your database).

  editedFile: undefined,                 // Edited file (for image crops). Same structure as below.

  originalFile: {
    fileUrl: "https://upcdn.io/FW25...", // Uploaded file URL.
    filePath: "/uploads/example.jpg",    // Uploaded file path (relative to your raw file directory).
    accountId: "FW251aX",                // Upload.io account the file was uploaded to.
    originalFileName: "example.jpg",     // Original file name from the user's machine.
    file: { ... },                       // Original DOM file object from the <input> element.
    size: 12345,                         // File size in bytes.
    lastModified: 1663410542397,         // Epoch timestamp of when the file was uploaded or updated.
    mime: "image/jpeg",                  // File MIME type.
    metadata: {
      ...                                // User-provided JSON object.
    },
    tags: [
      "tag1",                            // User-provided & auto-generated tags.
      "tag2",
      ...
    ]
  }
}
```

## 👀 More Examples

### Creating an Image Uploader — [Try on CodePen](https://codepen.io/upload-js/pen/gOXEWWB?editors=1010):

Uploader contains a built-in image cropper:

<p align="center"><a href="https://upload.io/uploader"><img alt="Upload Widget Demo" width="100%" src="https://raw.githubusercontent.com/upload-io/jquery-uploader/main/.github/assets/demo.webp"></a></p>

The cropper appears by default, but can be disabled with `crop: false` (see examples below):

```javascript
uploader
  .open({
    multi: false,
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    editor: {
      images: {
        crop: true,
        cropShape: "circ", // "rect" also supported.
        cropRatio: 1 / 1   // "1" is enforced for "circ".
      }
    }
  })
  .then(files => alert(JSON.stringify(files)));
```

### Creating a "Single File" Upload Button — [Try on CodePen](https://codepen.io/upload-js/pen/WNXmjjq?editors=1010):

```javascript
uploader.open().then(files => alert(JSON.stringify(files)));
```

### Creating a "Multi File" Upload Button — [Try on CodePen](https://codepen.io/upload-js/pen/RwjdVxY?editors=1010):

```javascript
uploader.open({ multi: true }).then(files => alert(JSON.stringify(files)));
```

### Creating a Dropzone — [Try on CodePen](https://codepen.io/upload-js/pen/PoOLmeL?editors=1010):

You can use Uploader as a dropzone — rather than a modal — by specifying `layout: "inline"` and a container:

```javascript
uploader.open({
  multi: true,
  layout: "inline",
  container: "#example_div_id",  // Replace with the ID of an existing DOM element.
  onUpdate: (files) => console.log(files)
})
```

Note:

- You must set `position: relative`, `width` and `height` on the container `div`.
- The `Finish` button is hidden by default in this mode (override with `"showFinishButton": true`).

## ⚙️ Configuration

All configuration is optional.

```javascript
uploader
  .open({
    container: "body",            // "body" by default.
    layout: "modal",              // "modal" by default. "inline" also supported.
    locale: myCustomLocale,       // EN_US by default. (See "Localization" section below.)
    maxFileCount: 5,              // Unlimited by default (or 1 if multi: false).
    maxFileSizeBytes: 1024 ** 2,  // Unlimited by default.
    mimeTypes: ["image/jpeg"],    // Unrestricted by default.
    multi: false,                 // False by default.
    onUpdate: files => {},        // Called each time the list of uploaded files change.
    onValidate: async file => {}, // Return Promise<string> to show a custom error message.
    showFinishButton: true,       // Whether to show the "finish" button in the widget.
    showRemoveButton: true,       // Whether to show the "remove" button next to each file.
    styles: {
      colors: {
        primary: "#377dff",       // Primary color (e.g. buttons).
        active: "#528fff"         // Active/hover color (inferred from primary by default).
      },
      fontSizes: {
        base: 16                  // Base font size (px).
      }
    },
    path: {                       // Optional: a string (full file path) or an object like so:
      fileName: "Example.jpg",    // Each supports path variables (e.g. {ORIGINAL_FILE_EXT}).
      folderPath: "/uploads"      // Please refer to docs for all path variables.
    },
    metadata: {
      hello: "world"              // Arbitrary JSON metadata (saved against the file).
    },
    tags: ["profile_picture"],    // Requires an Upload.io account.
    editor: {
      images: {
        crop: true,               // True by default.
        cropRatio: 4 / 3,         // width / height. undefined enables freeform (default).
        cropShape: "rect"         // "rect" (default) or "circ".
      }
    },
  })
  .then(files => alert(files))
```

### 🏳️ Localization

Default is [EN_US](https://github.com/upload-io/uploader/blob/main/lib/src/modules/locales/EN_US.ts):

```javascript
const myCustomLocale = {
  "error!": "Error!",
  "done": "Done",
  "addAnotherFile": "Add another file...",
  "addAnotherImage": "Add another image...",
  "cancel": "cancel",
  "cancelled!": "cancelled",
  "continue": "Continue",
  "customValidationFailed": "Failed to validate file.",
  "crop": "Crop",
  "finish": "Finished",
  "finishIcon": true,
  "image": "Image",
  "maxFilesReached": "Maximum number of files:",
  "maxImagesReached": "Maximum number of images:",
  "maxSize": "File size limit:",
  "next": "Next",
  "of": "of",
  "orDragDropFile": "...or drag and drop a file.",
  "orDragDropFiles": "...or drag and drop files.",
  "orDragDropImage": "...or drag and drop an image.",
  "orDragDropImages": "...or drag and drop images.",
  "pleaseWait": "Please wait...",
  "removed!": "removed",
  "remove": "remove",
  "skip": "Skip",
  "unsupportedFileType": "File type not supported.",
  "uploadFile": "Upload a File",
  "uploadFiles": "Upload Files",
  "uploadImage": "Upload an Image",
  "uploadImages": "Upload Images",
  "validatingFile": "Validating file..."
}
```

## Where are my files stored?

Uploader uses [Upload.io](https://upload.io) as a file storage & file hosting backend.

Upload.io benefits developers with:

- Zero Setup (Start uploading in the next few minutes!)
- Pre-Integrated Storage (All you need is an Upload API key)
- Fast File Hosting (Worldwide CDN, 300 Nodes)
- Powerful Rules Engine (Rate Limiting, Traffic Limiting, IP Blacklisting, Expiring Links, etc)
- File Transformations (Image Resizing, Cropping, Optimization, etc)

## 🔧 Can I bring my own file storage?

**Yes!** [Upload.io](https://upload.io) supports custom S3 buckets.

You still need [an Upload.io account](https://upload.io) to use the widget.

## 🌐 API Support

You can use Upload.io's [File Upload API](https://upload.io/file-upload-api) directly to achieve:

- File uploading.
- File listing.
- File deleting.
- And more...

Uploading a `"Hello World"` text file is as simple as:

```shell
curl --data "Hello World" \
     -u apikey:free \
     -X POST "https://api.upload.io/v1/files/basic"
```

_Note: Remember to set `-H "Content-Type: mime/type"` when uploading other file types!_

[Read the File Upload API docs »](https://upload.io/docs/upload-api)

## Building From Source

Please read: [`BUILD.md`](BUILD.md)

## Contribute

If you would like to contribute to Uploader:

1. Add a [GitHub Star](https://github.com/upload-io/uploader/stargazers) to the project (if you're feeling generous!).
2. Determine whether you're raising a bug, feature request or question.
3. Raise your issue or PR.

For more examples, see [CodePen](https://codepen.io/collection/NqbwQZ) and [CodeSandbox](https://codesandbox.io/examples/package/uploader).

## License

[MIT](LICENSE)
