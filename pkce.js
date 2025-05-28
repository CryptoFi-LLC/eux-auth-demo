/**
 * Example implementation of PKCE (Proof Key for Code Exchange) for OAuth 2.0.
 * ⚠️ Not suitable for production. ⚠️
 */

// When a DBP requires PKCE, the verifier code must be saved in browser storage before the user is redirected
// to the auth URL, then retrieved when they arrive back at the callback URL (defined by the IDP). Enable ONE 
// of the modules below to compare options.

import {
  getStorageValue,
  setStorageValue,
  clearStorageValue,
  storageType,
} from "./localStorage.js";
// import { getStorageValue, setStorageValue, clearStorageValue, storageType } from "./cookies.js"

import { log } from "./logger.js";

function generateRandomString(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

function base64URLEncode(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function addCodeChallenge(url) {
  const codeVerifier = generateRandomString(50);
  const codeChallenge = base64URLEncode(codeVerifier); // This is simplified

  setStorageValue("verifier", codeVerifier);

  // Add code challenge to redirect URL
  url.searchParams.set("code_challenge", codeChallenge);

  log(`🧚 PKCE required, code_challenge URL parameter added:`, codeChallenge);

  return url;
}

export function getCodeVerifier() {
  return getStorageValue("verifier");
}

export function clearCodeVerifier() {
  clearStorageValue("verifier");
  log(`🧹 Code verifier cleared from storage`);
}

export function getStorageType() {
  return storageType;
}
