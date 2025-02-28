<p align="center">
  <a href="https://avm-web-provider.agoralabs.sh">
    <img alt="AVM Logo" src="images/logo@128x128.png" height="64" />
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
* [2. Development](#-2-development)
  * [2.1. Requirements](#21-requirements)
  * [2.2. Setup](#22-setup)
  * [2.3. Build](#23-build)
* [3. Appendix](#-3-appendix)
  * [3.1. Useful Commands](#31-useful-commands)
* [4. How To Contribute](#-4-how-to-contribute)

## 🔭 1. Overview

This project is the monorepo that contains the source code for the `avm-web-provider` package as well as the documentation.

<sup>[Back to top ^][table-of-contents]</sup>

## 🛠 2. Development

### 2.1. Requirements

* Install [Node v22+](https://nodejs.org/en/)
* Install [pnpm v10+](https://pnpm.io/installation)

<sup>[Back to top ^][table-of-contents]</sup>

### 2.2. Setup

1. Install the dependencies:
```bash
$ pnpm install
```

<sup>[Back to top ^][table-of-contents]</sup>

### 2.3. Build

* To build simply run:
```bash
$ pnpm build
```

This will compile the Typescript source code into a `dist/` directory.

<sup>[Back to top ^][table-of-contents]</sup>

## 📑 3. Appendix

### 3.1. Useful Commands

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

## 👏 4. How To Contribute

Please read the [**Contributing Guide**](CONTRIBUTING.md) to learn about the development process.

<sup>[Back to top ^][table-of-contents]</sup>

<!-- links -->
[table-of-contents]: #table-of-contents
