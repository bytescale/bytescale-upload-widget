<h1 align="center">
  <a href="https://upload.io/uploader">
    <img alt="Uploader" width="276" height="80" src="https://raw.githubusercontent.com/upload-io/assets/master/logo-uploader.svg">
  </a>
</h1>

<p align="center"><b>File & Image Uploader</b><br/> (With Integrated Cloud Storage)</p>
<br/>
<p align="center">
  <a href="https://github.com/upload-js/uploader/">
    <img src="https://img.shields.io/badge/gzipped-29%20kb-4ba0f6" />
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

<p align="center"><a href="https://upload.io/uploader"><img alt="Upload Widget Demo" width="100%" src="https://raw.githubusercontent.com/upload-js/uploader/main/.github/assets/demo.gif"></a></p>

<p align="center"><b>Supports:</b> single & multi-file uploads, modal & inline views, localization, mobile, and more...<br/><br/></p>

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
<script src="https://js.upload.io/uploader/v1"></script>
```

## Usage

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

### Open the Modal

With JavaScript — [Try on CodePen](https://codepen.io/upload-js/pen/oNoRmJW?editors=1010):

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

Or with HTML — [Try on CodePen](https://codepen.io/upload-js/pen/gOXJqqz?editors=1010):

```html
<button data-upload-config='{ "multi": true }'
        data-upload-complete='alert(
          `Files uploaded:\n${event.files.map(x => x.fileUrl).join("\n")}`
        )'>
  Upload Files...
</button>
```

_Note: you still need to [initialize](#Initialize) the Uploader when using `data-*` attributes._

### Get the Result

With JavaScript:

`.open()` returns `Promise<Array<UploaderResult>>`:

```javascript
{
  fileUrl: "https://files.upload.io/FW25...",  // The URL to use when serving this file.

  editedFile: undefined,                       // The edited file (if present). Same as below.

  originalFile: {
    accountId: "FW251aX",                       // The Upload.io account that owns the file.
    file: { ... },                              // DOM file object (from the <input> element).
    fileId: "FW251aXa9ku...",                   // The uploaded file ID.
    fileUrl: "https://files.upload.io/FW25...", // The uploaded file URL.
    fileSize: 12345,                            // File size in bytes.
    mime: "image/jpeg",                         // File MIME type.
    suggestedOptimization: {
      transformationUrl: "https://files.up...", // The suggested URL for serving this file.
      transformationSlug: "thumbnail"           // Append to 'fileUrl' to produce the above URL.
    },
    tags: [                                     // Tags manually & auto-assigned to this file.
      { name: "tag1", searchable: true },
      { name: "tag2", searchable: true },
      ...
    ]
  }
}
```

Or with HTML:

```html
<a data-upload-complete="console.log(JSON.stringify(event.files))">
  Upload a file...
</a>
```

- The `data-upload-complete` attribute is fired on completion.
- The `event.files` array contains the uploaded files.
- The above example opens an Uploader which logs the same output as the JavaScript example.

## 👀 More Examples

### Creating an Image Upload Button

With JavaScript — [Try on CodePen](https://codepen.io/upload-js/pen/gOXEWWB?editors=1010):

```javascript
uploader
  .open({
    multi: false,
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    editor: {
      images: {
        cropShape: "circ", // "rect" also supported.
        cropRatio: 1 / 1   // "1" is enforced for "circ".
      }
    }
  })
  .then(files => alert(JSON.stringify(files)));
```

Or with HTML — [Try on CodePen](https://codepen.io/upload-js/pen/rNpBRbO?editors=1010):

```html
<button data-upload-complete='alert(JSON.stringify(event.files))'
        data-upload-config='{
          "multi": false,
          "mimeTypes": ["image/jpeg", "image/png", "image/webp"],
          "editor": {
            "images": {
              "cropShape": "circ",
              "cropRatio": 1
            }
          }
        }'>
  Upload an Image...
</button>
```


### Creating a "Single File" Upload Button

With JavaScript — [Try on CodePen](https://codepen.io/upload-js/pen/WNXmjjq?editors=1010):

```javascript
uploader.open().then(files => alert(JSON.stringify(files)));
```

Or with HTML — [Try on CodePen](https://codepen.io/upload-js/pen/gOXEWxQ?editors=1010):

```html
<button data-upload-complete='alert(JSON.stringify(event.files))'>
  Upload a Single File...
</button>
```

### Creating a "Multi File" Upload Button

With JavaScript — [Try on CodePen](https://codepen.io/upload-js/pen/RwjdVxY?editors=1010):

```javascript
uploader.open({ multi: true }).then(files => alert(JSON.stringify(files)));
```

Or with HTML — [Try on CodePen](https://codepen.io/upload-js/pen/OJOqmOd?editors=1010):

```html
<button data-upload-config='{ "multi": true }'
        data-upload-complete='alert(JSON.stringify(event.files))'>
  Upload Multiple Files...
</button>
```

### Creating a Dropzone

You can use Uploader as a dropzone — rather than a modal — by specifying `layout: "inline"` and a container:

With JavaScript — [Try on CodePen](https://codepen.io/upload-js/pen/PoOLmeL?editors=1010):

```javascript
uploader.open({
  multi: true,
  layout: "inline",
  container: "#example_div_id",  // Replace with the ID of an existing DOM element.
  onUpdate: (files) => console.log(files)
})
```

Or with HTML — [Try on CodePen](https://codepen.io/upload-js/pen/gOXEWeZ?editors=1010):

```html
<div data-upload-config='{ "multi": true }'
     data-upload-complete="console.log(event.files)"
     style="position: relative; width: 450px; height: 300px;">
</div>
```

Note:

- You must set `position: relative`, `width` and `height` on the container `div`.
- The `Finish` button is hidden by default in this mode (override with `"showFinishButton": true`).
- When using the HTML approach:
  - The `container` & `layout: "inline"` config options are automatically set.
  - The `data-upload-complete` callback is fired _every time_ the list of uploaded files changes.
  - The `data-upload-finalized` callback is fired when `Finish` is clicked (if visible, see comment above).

## 🚀 SPA Support

**Uploader is SPA-friendly** — even when using `data-*` attributes to render your widgets.

Uploader automatically observes the DOM for changes, making the `data-upload-complete` attribute safe for SPAs that introduce elements at runtime.

**[» React Example on CodePen «](https://codepen.io/upload-js/pen/dyZrWqK?editors=1010)**

## 🌐 API Support

Uploader is powered by Upload.io's [File Upload API](https://upload.io/file-upload-api) — an easy-to-consume API that provides:

- File uploading.
- File listing.
- File deleting.
- File access control.
- File TTL rules / expiring links.
- And more...

Uploading a `"Hello World"` file is as simple as:

```shell
curl --data "Hello World" \
     -u apikey:free \
     -X POST "https://api.upload.io/v1/files/basic"
```

_Note: Remember to set `-H "Content-Type: mime/type"` when uploading other file types!_

[Read the File Upload API docs »](https://upload.io/docs/upload-api)

### ⚡ Need a Lightweight Client Library?

Uploader is built on [Upload.js](https://upload.io/upload-js) — the fast 7KB client library for Upload.io's File Upload API.

Use Upload.js if you already have a UI, and just need to implement file upload functionality.

Upload.js provides:

- End-to-end file upload functionality (zero config — all you need is an Upload API key, e.g. `"free"`.)
- Small 7KB package size (including all dependencies).
- Progress smoothing (using a built-in exponential moving average (EMA) algorithm).
- Automatic file chunking (for large file support).
- Cancellation (for in-progress file uploads).
- And more...

[Try Upload.js on CodePen  »](https://codepen.io/upload-js/pen/abVapaJ?editors=1010)

## ⚙️ Configuration

All configuration is optional.

With JavaScript:

```javascript
uploader
  .open({
    container: "body",           // "body" by default.
    layout: "modal",             // "modal" by default. "inline" also supported.
    locale: myCustomLocale,      // EN_US by default. (See "Localization" section below.)
    maxFileSizeBytes: 1024 ** 2, // Unlimited by default.
    mimeTypes: ["image/jpeg"],   // Unrestricted by default.
    multi: false,                // False by default.
    onUpdate: files => {},       // Called each time the list of uploaded files change.
    showFinishButton: true,      // Whether to show the "finish" button in the widget.
    showRemoveButton: true,      // Whether to show the "remove" button next to each file.
    tags: ["profile_picture"],   // Requires an Upload.io account.
    editor: {
      images: {
        crop: true,              // True by default.
        cropRatio: 4 / 3,        // width / height. undefined enables freeform (default).
        cropShape: "rect"        // "rect" (default) or "circ".
      }
    },
  })
  .then(files => alert(files))
```

Or with HTML:

```html
<button data-upload-complete='alert(event.files)'
        data-upload-config='{
          "container": "body",
          "layout": "modal",
          "multi": false
        }'>
  Upload a File...
</button>
```

### 🏳️ Localization

Default is [EN_US](https://github.com/upload-js/uploader/blob/main/lib/src/modules/locales/EN_US.ts):

```javascript
const myCustomLocale = {
  "error!":              "Error!",
  "done":                "Done",
  "addAnotherFile":      "Add another file...",
  "cancel":              "cancel",
  "cancelled!":          "cancelled",
  "continue":            "Continue",
  "crop":                "Crop",
  "finish":              "Finished",
  "finishIcon":          true,
  "maxSize":             "File size limit:",
  "next":                "Next",
  "orDragDropFile":      "...or drag and drop a file.",
  "orDragDropFiles":     "...or drag and drop files.",
  "pleaseWait":          "Please wait...",
  "removed!":            "removed",
  "remove":              "remove",
  "skip":                "Skip",
  "unsupportedFileType": "File type not supported.",
  "uploadFile":          "Select a File",
  "uploadFiles":         "Select Files"
}
```

## 📷 Resizing & Cropping Images

Given an uploaded image URL:

```
https://files.upload.io/W142hJkHhVSQ5ZQ5bfqvanQ
```

Resize with:

```
https://files.upload.io/W142hJkHhVSQ5ZQ5bfqvanQ/thumbnail
```

Auto-crop with:

```
https://files.upload.io/W142hJkHhVSQ5ZQ5bfqvanQ/thumbnail-square
```

## 🎯 Features

Uploader is the file & image upload widget for [Upload.io](https://upload.io/uploader): the file upload service for developers.

**Core features:**

- **Beautifully clean UI widget.**
- Single & Multi-File Uploads.
- Fluid Layout & Mobile-Friendly.
- Image Cropping.
- Localization.
- Integrated File Hosting:
  - Files stored on [Upload.io](https://upload.io/uploader) for 4 hours with the `"free"` API key.
  - Files hosted via the Upload CDN: 100 locations worldwide.

**Available with an account:**

- **Permanent Storage.**
- Unlimited Daily Uploads. (The `"free"` API key allows 100 uploads per day per IP.)
- Extended CDN Coverage. (Files served from 300+ locations worldwide.)
- Upload & Download Authentication. (Supports federated auth via your own JWT authorizer.)
- File & Folder Management Console.
- Expiring Links.
- Custom CNAME.
- Advanced Upload Control:
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
3. Raise your issue or PR.

## License

[MIT](LICENSE)
