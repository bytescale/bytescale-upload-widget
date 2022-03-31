// upload-js is already bundled-in to the CDN release, however, it won't be accessible. Having them include upload-js
// via a 2nd script tag is inefficient, as they'll be downloading its code twice. Instead, we make the bundled
// upload-js available on 'global', allowing them to construct an Upload instance (e.g. for a more fine-tuned
// instantiation of Uploader).
export * from "upload-js";

export * from "uploader";
