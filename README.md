# EUX Auth Demo

A vanilla JS implementation of the [EUX](https://github.com/CryptoFi-LLC/dbp-frontend-v2/) / [CWS API](https://github.com/CryptoFi-LLC/cws-api/) auth flow, to demonstrate the happy path with minimal error handling.

## Dev

Run `npx http-server` to launch locally.

## Browser Storage

Some DBPs require PKCE, which requires persisting a code verifier in browser storage. See **pkce.js** for details.  
