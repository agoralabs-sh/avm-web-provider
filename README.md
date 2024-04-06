<p align="center">
  <a href="https://avm-web-provider.agoralabs.sh">
    <img alt="AVM Logo" src="assets/logo@128x128.png" style="padding-top: 15px" height="128" />
  </a>
</p>

<h1 align="center">
  AVM Web Provider
</h1>

<p align="center">
  <a href="https://github.com/agoralabs-sh/avm-web-provider/releases/latest">
    <img alt="GitHub Release" src="https://img.shields.io/github/v/release/agoralabs-sh/avm-web-provider?&logo=github">
  </a>
  <a href="https://github.com/agoralabs-sh/avm-web-provider/releases/latest">
    <img alt="GitHub Release Date - Published At" src="https://img.shields.io/github/release-date/agoralabs-sh/avm-web-provider?logo=github">
  </a>
</p>

<p align="center">
  <a href="https://github.com/agoralabs-sh/avm-web-provider/releases">
    <img alt="GitHub Pre-release" src="https://img.shields.io/github/v/release/agoralabs-sh/avm-web-provider?include_prereleases&label=pre-release&logo=github">
  </a>
  <a href="https://github.com/agoralabs-sh/avm-web-provider/releases">
    <img alt="GitHub Pre-release Date - Published At" src="https://img.shields.io/github/release-date-pre/agoralabs-sh/avm-web-provider?label=pre-release date&logo=github">
  </a>
</p>

<p align="center">
  <a href="https://github.com/agoralabs-sh/avm-web-provider/blob/main/LICENSE">
    <img alt="GitHub License" src="https://img.shields.io/github/license/agoralabs-sh/avm-web-provider">
  </a>
</p>

<p align="center">
  <a href="https://npmjs.com/package/@agoralabs-sh/avm-web-provider" target="_blank">
    <img src="https://img.shields.io/npm/v/@agoralabs-sh/avm-web-provider" alt="npm" />
  </a>
</p>

<p align="center">
  A TypeScript implementation that allows dApps to connect and interact with web-based providers.
</p>

### Table of contents

* [1. Installation](#-1-installation)
* [2. Documentation](#-2-documentation)
* [3. Development](#-3-development)
  * [3.1. Requirements](#31-requirements)
  * [3.2. Setup](#32-setup)
  * [3.3. Build](#33-build)
* [4. Appendix](#-4-appendix)
  * [4.1. Useful Information](#41-useful-information)
  * [4.2. Supported Wallets](#42-supported-wallets)
  * [4.3. Useful Commands](#43-useful-commands)
* [5. How To Contribute](#-5-how-to-contribute)
* [6. License](#-6-license)
* [7. Credits](#-7-credits)

## 📦 1. Installation

* Using npm:
```shell
npm install @agoralabs-sh/avm-web-provider
```

* Using yarn:
```shell
yarn add @agoralabs-sh/avm-web-provider
```

## 📚 2. Documentation

For full documentation, please see [here][documentation].

<sup>[Back to top ^][table-of-contents]</sup>

## 🛠 3. Development

### 3.1. Requirements

* Install [Node v20.9.0+][node]
* Install [Yarn v1.22.5+][yarn]

<sup>[Back to top ^][table-of-contents]</sup>

### 3.2. Setup

1. Install the dependencies:
```bash
$ yarn install
```

<sup>[Back to top ^][table-of-contents]</sup>

### 3.3. Build

* To build simply run:
```bash
$ yarn build
```

This will compile the Typescript source code into a `dist/` directory.

<sup>[Back to top ^][table-of-contents]</sup>

## 📑 4. Appendix

### 4.1. Useful Information

* [ARC-0027][arc-0027]: this code is an implementation of ARC-0027 and leverages the [BroadcastChannel][boradcastchannel] API as a message bus between the webpage (dApp) and a web-based provider (wallet).

<sup>[Back to top ^][table-of-contents]</sup>

### 4.2. Supported Wallets

#### Kibisis Wallet

* Website: [https://kibis.is](https://kibis.is)
* Download: [https://kibis.is](https://kibis.is)
* Support/Issues: [Discord](https://discord.com/channels/1055863853633785857/1181252381816655952)


### 4.3. Useful Commands

| Command               | Description                                                                        |
|-----------------------|------------------------------------------------------------------------------------|
| `yarn build`          | Builds the source code into the `dist/` directory.                                 |
| `yarn run docs:build` | Builds the documentation into the `.docs/` directory.                              |
| `yarn run docs:serve` | Serves the built documentation from the `.docs/` directory.                        |
| `yarn run docs:start` | Builds and runs the documentation in a development environment with hot reloading. |
| `yarn run lint`       | Runs the linter on `.js` and `.ts` files.                                          |
| `yarn run prettier`   | Runs the prettier on `.js` and `.ts` files.                                        |
| `yarn test`           | Runs the tests.                                                                    |

<sup>[Back to top ^][table-of-contents]</sup>

## 👏 5. How To Contribute

Please read the [**Contributing Guide**][contribute] to learn about the development process.

<sup>[Back to top ^][table-of-contents]</sup>

## 📄 6. License

Please refer to the [LICENSE][license] file.

<sup>[Back to top ^][table-of-contents]</sup>

## 🎉 7. Credits

...TBC

<sup>[Back to top ^][table-of-contents]</sup>

<!-- Links -->
[arc-0027]: https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0027.md
[boradcastchannel]: https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API
[contribute]: ./CONTRIBUTING.md
[documentation]: https://avm-web-provider.agoralabs.sh
[license]: ./LICENSE
[node]: https://nodejs.org/en/
[table-of-contents]: #table-of-contents
[yarn]: https://yarnpkg.com/
