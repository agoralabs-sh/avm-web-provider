<p align="center">
  <a href="https://avm-web-provider.agoralabs.sh">
    <img alt="AVM Logo" src="assets/logo@128x128.png" style="padding-top: 15px" height="128" />
  </a>
</p>

<h1 align="center">
  AVM Web Provider
</h1>

<div align="center">

[![License: CC0-1.0](https://img.shields.io/github/license/agoralabs-sh/avm-web-provider)](./LICENSE)
[![NPM Version](https://img.shields.io/npm/v/%40agoralabs-sh%2Favm-web-provider)](https://www.npmjs.com/package/%40agoralabs-sh/avm-web-provider)

</div>

<div align="center">

[![GitHub Pre-release](https://img.shields.io/github/v/release/agoralabs-sh/avm-web-provider?include_prereleases&label=pre-release&logo=github)](https://github.com/agoralabs-sh/avm-web-provider/releases)
[![GitHub Pre-release Published At](https://img.shields.io/github/release-date-pre/agoralabs-sh/avm-web-provider?label=pre-release%20date&logo=github)](https://github.com/agoralabs-sh/avm-web-provider/releases)

</div>

<div align="center">

[![GitHub Release](https://img.shields.io/github/v/release/agoralabs-sh/avm-web-provider?&logo=github)](https://github.com/agoralabs-sh/avm-web-provider/releases/latest)
[![GitHub Release Published At](https://img.shields.io/github/release-date/agoralabs-sh/avm-web-provider?logo=github)](https://github.com/agoralabs-sh/avm-web-provider/releases/latest)

</div>

<p align="center">
  A TypeScript implementation that allows clients to connect and interact with web-based providers.
</p>

---

### Table of Contents

* [1. Overview](#-1-overview)
* [2. Documentation](#-2-documentation)
* [3. Development](#-3-development)
  * [3.1. Requirements](#31-requirements)
  * [3.2. Setup](#32-setup)
  * [3.3. Build](#33-build)
* [4. Appendix](#-4-appendix)
  * [4.1. Useful Commands](#41-useful-commands)
* [5. How To Contribute](#-5-how-to-contribute)
* [6. License](#-6-license)

## 🔭 1. Overview

The AVM Web Provider is an interface that bridges the gap between clients (e.g. dApps) and providers (e.g. wallets), allowing clients to connect and interact with providers in a standardized way.

Both clients and providers use the [`window.dispatchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) function to emit events, and use the [`window.addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) function to observe events.

The message schema is based on the [ARC-0027](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0027.md) standard.

## 📚 2. Documentation

For full documentation, please see [here](https://avm-web-provider.agoralabs.sh).

<sup>[Back to top ^][table-of-contents]</sup>

## 🛠 3. Development

### 3.1. Requirements

* Install [Node v22+](https://nodejs.org/en/)
* Install [pnpm v10+](https://pnpm.io/installation)

<sup>[Back to top ^][table-of-contents]</sup>

### 3.2. Setup

1. Install the dependencies:
```bash
$ pnpm install
```

<sup>[Back to top ^][table-of-contents]</sup>

### 3.3. Build

* To build simply run:
```bash
$ pnpm build
```

This will compile the Typescript source code into a `dist/` directory.

<sup>[Back to top ^][table-of-contents]</sup>

## 📑 4. Appendix

### 4.1. Useful Commands

| Command            | Description                                                                        |
|--------------------|------------------------------------------------------------------------------------|
| `pnpm build`       | Builds the source code into the `dist/` directory.                                 |
| `pnpm build:docs`  | Builds the documentation into the `.docusaurus/` directory.                        |
| `pnpm check:types` | Performs a type check on the `src/` directory.                                     |
| `pnpm lint`        | Runs the linter on `.js` and `.ts` files.                                          |
| `pnpm prettier`    | Runs the prettier on `.js` and `.ts` files.                                        |
| `pnpm serve:docs`  | Serves the built documentation from the `.docusaurus/` directory.                  |
| `pnpm start:docs`  | Builds and runs the documentation in a development environment with hot reloading. |
| `pnpm test`        | Runs the tests.                                                                    |

<sup>[Back to top ^][table-of-contents]</sup>

## 👏 5. How To Contribute

Please read the [**Contributing Guide**](./CONTRIBUTING.md) to learn about the development process.

<sup>[Back to top ^][table-of-contents]</sup>

## 📄 6. License

Please refer to the [LICENSE](./LICENSE) file.

<sup>[Back to top ^][table-of-contents]</sup>

<!-- links -->
[table-of-contents]: #table-of-contents
