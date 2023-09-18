# Migration Guide

## From Uploader (`uploader`)

Steps:

1. Install `@bytescale/upload-widget`
2. Uninstall `uploader`
3. Replace `"uploader"` with `"@bytescale/upload-widget"` in your `import` statements.
4. Replace `uploader` with `upload-widget` in all CSS class name overrides (if you have any).
5. Replace `Uploader({apiKey}).open(params)` with `UploadWidget.open({apiKey, ...params })`
   1. As such `.open(...)` now takes a mandatory configuration object, with `apiKey` being the only required field.
6. Replace `onUpdate: (files) => {}` with `onUpdate: ({uploadedFiles}) => {}`.
7. `beginAuthSession` and `endAuthSession` are now static methods on `AuthManager` from the [`@bytescale/sdk` NPM package](https://www.bytescale.com/docs/sdks/javascript).
8. `url` is now a static method on `UrlBuilder` from the [`@bytescale/sdk` NPM package](https://www.bytescale.com/docs/sdks/javascript).
9. `onValidate` has been replaced with `onPreUpload`: you should return an object of `{errorMessage: "your error message"}` instead of `"your error message"`. (This can also be a promise.)

### Before

```javascript
import { Uploader } from "uploader";

const uploader = Uploader({
  apiKey: "free"
});

//
// Uploading files...
//
uploader
  .open({
    multi: true,
    onValidate: async file => "My Custom Error Message"
  })
  .then(files => {
    if (files.length === 0) {
      console.log("No files selected.");
    } else {
      console.log("Files uploaded:");
      console.log(files.map(f => f.fileUrl));
    }
  })
  .catch(err => {
    console.error(err);
  });

//
// Making URLs...
//
uploader.url("/my-uploaded-image.jpg", "thumbnail");

//
// JWT authorization...
//
await uploader.beginAuthSession("https://my-auth-url", async () => ({ Authorization: "Bearer AuthTokenForMyApi" }));
```

### After

```javascript
import { UploadWidget } from "@bytescale/upload-widget";
import { AuthManager, UrlBuilder } from "@bytescale/sdk";

//
// Uploading files...
//
UploadWidget.open({
  apiKey: "free",
  multi: true,
  onPreUpload: async file => ({ errorMessage: "My Custom Error Message" })
})
  .then(files => {
    if (files.length === 0) {
      console.log("No files selected.");
    } else {
      console.log("Files uploaded:");
      console.log(files.map(f => f.fileUrl));
    }
  })
  .catch(err => {
    console.error(err);
  });

//
// Making URLs...
//
UrlBuilder.url({
  accountId: "your-account-id",
  filePath: "/my-uploaded-image.jpg",
  options: {
    transformation: "preset",
    transformationPreset: "thumbnail"
  }
});

//
// JWT authorization...
//
await AuthManager.beginAuthSession({
  accountId: "your-account-id",
  authUrl: "https://my-auth-url",
  authHeaders: async () => ({ Authorization: "Bearer AuthTokenForMyApi" })
});
```

## See also

Bytescale migration guides listed below:

- [Migrating from `upload-js` to `@bytescale/sdk`](https://github.com/bytescale/bytescale-javascript-sdk/blob/main/MIGRATE.md)
- [Migrating from `uploader` to `@bytescale/upload-widget`](https://github.com/bytescale/bytescale-upload-widget/blob/main/MIGRATE.md)
- [Migrating from `react-uploader` to `@bytescale/upload-widget-react`](https://github.com/bytescale/bytescale-upload-widget-react/blob/main/MIGRATE.md)
- [Migrating from `angular-uploader` to `@bytescale/upload-widget-angular`](https://github.com/bytescale/bytescale-upload-widget-angular/blob/main/MIGRATE.md)
- [Migrating from `@upload-io/vue-uploader` to `@bytescale/upload-widget-vue`](https://github.com/bytescale/bytescale-upload-widget-vue/blob/main/MIGRATE.md)
- [Migrating from `@upload-io/jquery-uploader` to `@bytescale/upload-widget-jquery`](https://github.com/bytescale/bytescale-upload-widget-jquery/blob/main/MIGRATE.md)
