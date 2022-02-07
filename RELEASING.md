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
