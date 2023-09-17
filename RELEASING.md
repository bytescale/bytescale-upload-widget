# Releasing

To release a new version:

1.  Push any outstanding changes.

2.  WAIT for CI to pass before continuing!

3.  `gco main`

4.  Set `x.y.z` into `lib/package.json`

5.  `gcmsg 'Release x.y.z'`

6.  `gp`

The CI process will automatically `git tag` and `npm publish`.

(It does this by pattern-matching on `^Release (\S+)` commit messages on the `main` branch.)

7. After release:

```bash
( UPLOAD_WIDGET_VERSION=4.6.0 && \
  cd ../bytescale-upload-widget-react && npm install @bytescale/upload-widget@^${UPLOAD_WIDGET_VERSION} && ga -A && gcmsg 'Upgrade @bytescale/upload-widget package' && gp && \
  cd ../bytescale-upload-widget-vue && npm install @bytescale/upload-widget@^${UPLOAD_WIDGET_VERSION} && ga -A && gcmsg 'Upgrade @bytescale/upload-widget package' && gp && \
  cd ../bytescale-upload-widget-jquery && npm install @bytescale/upload-widget@^${UPLOAD_WIDGET_VERSION} && ga -A && gcmsg 'Upgrade @bytescale/upload-widget package' && gp && \
  cd ../bytescale-upload-widget-angular && npm install @bytescale/upload-widget@^${UPLOAD_WIDGET_VERSION} && cd projects/bytescale-upload-widget-angular && npm install @bytescale/upload-widget@^${UPLOAD_WIDGET_VERSION} && ga -A && gcmsg 'Upgrade @bytescale/upload-widget package' && gp )
```
