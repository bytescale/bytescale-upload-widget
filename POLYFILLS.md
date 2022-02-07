# Polyfills

Depending on the browsers you wish to support, your application may require some of the following polyfills:

- core-js (v3.19)
  - core-js/modules/es.symbol
  - core-js/modules/es.symbol.description
  - core-js/modules/es.symbol.iterator
  - core-js/modules/es.symbol.to-string-tag
  - core-js/modules/es.array.concat
  - core-js/modules/es.array.for-each
  - core-js/modules/es.array.from
  - core-js/modules/es.array.index-of
  - core-js/modules/es.array.is-array
  - core-js/modules/es.array.iterator
  - core-js/modules/es.array.join
  - core-js/modules/es.array.map
  - core-js/modules/es.array.reduce
  - core-js/modules/es.array.slice
  - core-js/modules/es.date.to-string
  - core-js/modules/es.function.bind
  - core-js/modules/es.function.name
  - core-js/modules/es.json.to-string-tag
  - core-js/modules/es.map
  - core-js/modules/es.math.to-string-tag
  - core-js/modules/es.object.assign
  - core-js/modules/es.object.create
  - core-js/modules/es.object.define-property
  - core-js/modules/es.object.get-prototype-of
  - core-js/modules/es.object.keys
  - core-js/modules/es.object.set-prototype-of
  - core-js/modules/es.object.to-string
  - core-js/modules/es.promise
  - core-js/modules/es.reflect.construct
  - core-js/modules/es.regexp.exec
  - core-js/modules/es.regexp.to-string
  - core-js/modules/es.string.iterator
  - core-js/modules/es.string.replace
  - core-js/modules/es.string.starts-with
  - core-js/modules/es.string.trim
  - core-js/modules/web.dom-collections.for-each
  - core-js/modules/web.dom-collections.iterator
  - core-js/modules/web.timers

## No Transpiling Required

No transpiling is required: just import the polyfills from the above set that you require.
