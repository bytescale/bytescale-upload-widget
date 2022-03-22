# Building From Source

This repository contains a hot-reloading sandbox for developing the `uploader` NPM package.

## Prerequisites

Building from source requires the following prerequisites:

| Package | Version  |
| ------- | -------- |
| Node    | v12.22.0 |
| NPM     | v6.14.11 |

## Repository Structure

This repository comprises 3 packages:

- The `/` package (contains dev tooling like `prettier`).
- The `/lib` package (contains the `uploader` library itself).
- The `/examples` package (provides a hot-reloading sandbox for developing the `uploader` library).

## How To Build & Run

### 1. Clone

```shell
git clone git@github.com:upload-js/uploader.git
cd uploader
```

### 2. Install Dependencies

```shell
npm install
(cd lib && npm install)
(cd examples && npm install)
```

### 3. Run The Examples

```shell
(cd examples && npm start)
```

The above launches a **hot-reloading** server on `http://127.0.0.1:3010` that uses `uploader` from source.

_Please ensure nothing else is running on TCP port `3010`_.
