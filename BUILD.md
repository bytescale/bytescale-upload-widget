# Building From Source

This repository contains a hot-reloading sandbox for developing the `@bytescale/upload-widget` NPM package.

## Prerequisites

`node` and `npm` are required — we actively support the following versions:

| Package | Version  |
| ------- | -------- |
| Node    | v18.12.1 |
| NPM     | v8.19.2  |

## Repository Structure

This repository comprises 3 packages:

- The `/` package (contains dev tooling like `prettier`).
- The `/lib` package (contains the `@bytescale/upload-widget` library itself).
- The `/examples` package (provides a hot-reloading sandbox for developing the `@bytescale/upload-widget` library).

## How To Build & Run

### 1. Clone

```shell
git clone git@github.com:bytescale/bytescale-upload-widget.git
cd bytescale-upload-widget
```

### 2. Setup Environment

```
export NODE_OPTIONS=--openssl-legacy-provider
```

### 3. Install Dependencies

```shell
npm install
(cd lib && npm install && npm pack)
(cd examples && npm install)
```

### 4. Run The Examples

```shell
(cd examples && npm start)
```

The above launches a **hot-reloading** server on `http://127.0.0.1:3010` that uses `@bytescale/upload-widget` from source.

_Please ensure nothing else is running on TCP port `3010`_.
