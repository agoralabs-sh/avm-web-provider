<p align="center">
  <a href="https://avm-web-provider.agoralabs.sh">
    <img alt="AVM Logo" src="https://github.com/agoralabs-sh/avm-web-provider/blob/main/images/logo%40128x128.png" height="64" />
  </a>
</p>

<h1 align="center">
  AVM Web Provider
</h1>

<div align="center">

[![License: CC0-1.0](https://img.shields.io/github/license/agoralabs-sh/avm-web-provider)](LICENSE)
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
  - [1.1. Introduction](#11-introduction)
  - [1.2. How it works](#12-how-it-works)
  - [1.3. Security](#13-security)
* [2. Documentation](#-2-documentation)
* [3. License](#-3-license)

## 🔭 1. Overview

### 1.1. Introduction

The AVM Web Provider is an interface that bridges the gap between clients (e.g. dApps) and providers (e.g. wallets), allowing clients to connect and interact with providers in a standardized way.

The AVM Web Provider works towards achieving two main goals:

1. Creating a common interface between clients and providers.
2. Allowing clients to choose what provider and network to use.

<sup>[Back to top ^][table-of-contents]</sup>

### 1.2. How it works

Traditionally, web-based provider inject script into a web page's document and "hijack" a property on the global object. This can be problematic as browser extensions are loaded in the web page in an unpredictable and unstable order, so for a user that uses multiple providers this will cause the last provider loaded to re-initialize the global property that was already initialized by another provider.

In order to prevent provider conflicts, the AVM Web Provider employs an event concurrency loop. The client and provider both add event listeners, then the client emits an event and waits for a response from the provider. The provider receives the client's event and, once it has handled the request, it will emit an event in response.

Both clients and providers use the [`window.dispatchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) function to emit events, and use the [`window.addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) function to observe events.

> ⚠️ **NOTE:** Browser extension providers **MUST** take advantage of the [content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts) that will allow the provider access to the `window` object.

The AVM Web Provider leverages the [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) API as a transport layer to deliver messages and allows clients and web-based providers to securely communicate without interfering with other providers.

> ⚠️ **NOTE:** The underlying message schema strictly conforms to [VIP-03-0027][vip-03-0027].

<sup>[Back to top ^][table-of-contents]</sup>

### 1.3. Security

One issue with using `window.dispatchEvent` is that any provider can respond to the request, which could cause providers "spoofing" the intended provider. To overcome this drawback, the [VIP-03-0027][vip-03-0027] specification proposes that each request (except the `discover` request) include a provider's [VCIC](https://vips.voi.community/03/0026) and an arbitrary challenge. A provider **MUST** sign this challenge, using the private key of the VCIC, and return the signature with the response.

As of v2, the AVMWebProvider now includes the challenge-response mechanism using a provider's VCIC.

<sup>[Back to top ^][table-of-contents]</sup>

## 📚 2. Documentation

For full documentation, please see [here](https://avm-web-provider.agoralabs.sh).

<sup>[Back to top ^][table-of-contents]</sup>

## 📄 3. License

Please refer to the [LICENSE](./LICENSE) file.

<sup>[Back to top ^][table-of-contents]</sup>

<!-- links -->
[table-of-contents]: #table-of-contents
[vip-03-0027]: https://vips.voi.community/03/0027
