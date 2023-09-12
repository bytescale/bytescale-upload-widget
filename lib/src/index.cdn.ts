// @bytescale/sdk is already bundled-in to the CDN release, however, it won't be accessible. Having the user include
// @bytescale/sdk via a 2nd script tag is inefficient, as they'll be downloading its code twice. Instead, we make the
// @bytescale/sdk available on 'global', since we use "Bytescale" as the UMD namespace only, so we get
// "Bytescale.UploadWidget", "Bytescale.UploadManager", "Bytescale.FileApi", etc.
export * from "@bytescale/sdk";

export * from "@bytescale/upload-widget/UploadWidget";
