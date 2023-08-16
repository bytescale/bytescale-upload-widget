# Building From Source

This repository contains a hot-reloading sandbox for developing the `uploader` NPM package.

## Prerequisites

`node` and `npm` are required — we actively support the following versions:

| Package | Version  |
| ------- | -------- |
| Node    | v18.12.1 |
| NPM     | v8.19.2  |

## Repository Structure

This repository comprises 3 packages:

- The `/` package (contains dev tooling like `prettier`).
- The `/lib` package (contains the `uploader` library itself).
- The `/examples` package (provides a hot-reloading sandbox for developing the `uploader` library).

## How To Build & Run

### 1. Clone

```shell
git clone git@github.com:bytescale/uploader.git
cd uploader
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

The above launches a **hot-reloading** server on `http://127.0.0.1:3010` that uses `uploader` from source.

_Please ensure nothing else is running on TCP port `3010`_.
