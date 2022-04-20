<h1 align="center">
  <a href="https://upload.io/uploader">
    <img alt="Uploader" width="313" height="93" src="https://raw.githubusercontent.com/upload-io/uploader/main/.github/assets/logo.svg">
  </a>
</h1>

<p align="center"><b>File & Image Upload Widget</b><br/> (With Integrated Cloud Storage)</p>
<br/>
<p align="center">
  <a href="https://github.com/upload-io/uploader/">
    <img src="https://img.shields.io/badge/gzipped-29%20kb-4ba0f6" />
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
  <a href="https://codepen.io/upload-js/pen/QWOZWZR?editors=1010">
    Try on CodePen
  </a>
</h1>

<p align="center"><a href="https://upload.io/uploader"><img alt="Upload Widget Demo" width="100%" src="https://raw.githubusercontent.com/upload-io/uploader/main/.github/assets/demo.gif"></a></p>

<p align="center"><b>Supported Frameworks:<br> <a href="https://github.com/upload-io/react-uploader#readme">React</a> • <a href="https://github.com/upload-io/vue-uploader#readme">Vue</a> • <a href="https://github.com/upload-io/angular-uploader#readme">Angular</a> • <a href="https://github.com/upload-io/jquery-uploader#installation">jQuery</a> • <a href="https://github.com/upload-io/uploader#installation">Plain JS</a></b><br></p>

<p align="center"><b>Supported Features:</b><br>Image Cropping • Image Uploads • Multi-file Uploads • Drag-and-Drop • More...<br><br></p>

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
  fileUrl: "https://upcdn.io/FW25...",          // The URL to use when serving this file.

  editedFile: undefined,                        // The edited file (if present). Same as below.

  originalFile: {
    accountId: "FW251aX",                       // The Upload.io account that owns the file.
    file: { ... },                              // DOM file object (from the <input> element).
    fileId: "FW251aXa9ku...",                   // The uploaded file ID.
    fileUrl: "https://upcdn.io/FW25...",        // The uploaded file URL.
    fileSize: 12345,                            // File size in bytes.
    mime: "image/jpeg",                         // File MIME type.
    suggestedOptimization: {
      transformationUrl: "https://upcdn.io/..", // The suggested URL for serving this file.
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

### Creating an Image Uploader

Uploader contains a built-in image cropper:

<p align="center"><a href="https://upload.io/uploader"><img alt="Upload Widget Demo" width="100%" src="https://raw.githubusercontent.com/upload-io/jquery-uploader/main/.github/assets/demo.webp"></a></p>

The cropper appears by default, but can be disabled with `crop: false` (see examples below):

With JavaScript — [Try on CodePen](https://codepen.io/upload-js/pen/gOXEWWB?editors=1010):

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

Or with HTML — [Try on CodePen](https://codepen.io/upload-js/pen/rNpBRbO?editors=1010):

```html
<button data-upload-complete='alert(JSON.stringify(event.files))'
        data-upload-config='{
          "multi": false,
          "mimeTypes": ["image/jpeg", "image/png", "image/webp"],
          "editor": {
            "images": {
              "crop": true,
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
    styles: {
      colors: {
        primary: "#377dff",      // Primary color (e.g. buttons).
        active: "#528fff"        // Active/hover color (inferred from primary by default).
      },
      fontSizes: {
        base: 16                 // Base font size (px).
      }
    },
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

Default is [EN_US](https://github.com/upload-io/uploader/blob/main/lib/src/modules/locales/EN_US.ts):

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

## Where are my files stored?

Uploader uses [Upload.io](https://upload.io) as a file storage & file hosting backend.

Upload.io benefits developers with:

- Zero Setup (Start uploading in the next few minutes!)
- Pre-Integrated Storage (All you need is an Upload API key)
- Fast File Hosting (Worldwide CDN, 300 Nodes)
- Powerful Rules Engine (Rate Limiting, Traffic Limiting, IP Blacklisting, Expiring Links, etc)
- File Transformations (Image Resizing, Cropping, Optimization, etc)

### 🔧 Can I bring my own file storage?

Uploader's USP is to provide the fastest way to integrate end-to-end file uploads into a web app, while remaining customizable. As such, Uploader will always be closely integrated with the Upload.io platform, and there are currently no plans to support custom backends. You may, however, sync files from your Upload.io account to a custom storage target.

### 🌐 API Support

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
