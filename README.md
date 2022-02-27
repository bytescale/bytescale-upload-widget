<h1 align="center">
  <a href="https://upload.io/uploader">
    <img alt="Upload.js" width="276" height="80" src="https://raw.githubusercontent.com/upload-io/assets/master/logo-uploader.svg">
  </a>
</h1>

<p align="center"><b>File & Image Uploader</b><br/> (No Setup or Infrastructure Required)</p>
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

  <a target="_blank" href="https://twitter.com/intent/tweet?text=I%20just%20found%20Uploader%20%26%20Upload.io%20%E2%80%94%20they%20make%20it%20super%20easy%20to%20upload%20files%20%E2%80%94%20installs%20with%207%20lines%20of%20code%20https%3A%2F%2Fgithub.com%2Fupload-js%2Fupload-js&hashtags=javascript,opensource,js,webdev,developers&via=UploadJS">
    <img alt="Twitter URL" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fupload-js%2Fuploader%2F" />
  </a>

</p>

# 🚀 Get Started — [Try on CodePen](https://codepen.io/upload-js/pen/QWOZWZR?editors=1010)

To add a file uploader to your web app, copy this example:

```html
<html>
  <head>
    <script src="https://js.upload.io/uploader/v1"></script>
    <script>
      const uploader = new Uploader({
        // Get production API keys from Upload.io
        apiKey: "free"
      });

      // Open the file & image uploader:
      uploader.open({ multi: true }).then(
        files => {
          // Do something with the uploaded file URLs:
          alert(
            `Files uploaded:\n${files.map(x => x.fileUrl).join("\n")}`
          )
        },
        e => console.error(e)
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

## Installation

Install via NPM:

```shell
npm install uploader
```

Or via a `<script>` tag:

```html
<script src="https://js.upload.io/uploader/v1"></script>
```

## Use with Popular Frameworks

_Coming Soon!_

## 🎯 Features

Uploader is the file & image uploader for [Upload.io](https://upload.io/upload-js): the file upload service for developers.

**Core features (available without an account):**

- **Beautifully clean UI widget.** (Lightweight & Customizable.)
- Localization. (See `locale` constructor parameter.)
- File Storage. (Files stored for 4 hours with the `"free"` API key.)
- File Hosting via CDN. (Files served from 100 locations worldwide.)
- Fast Image Transformations. (Resize images, crop images & convert images.)

**All features (available with an account):**

- Permanent Storage. (The `"free"` API key provides temporary storage only.)
- Unlimited Daily Uploads. (The `"free"` API key allows 100 uploads per day per IP.)
- Extended CDN Coverage. (Files served from 300+ locations worldwide.)
- More File Transformations. (Custom image resizing, cropping, converting, etc.)
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
