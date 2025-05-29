
// When a DBP requires PKCE, the verifier code must be saved in browser storage before the user is redirected
// to the auth URL, then retrieved when they arrive back at the callback URL (defined by the IDP). Enable ONE 
// of the modules below to compare options.

import {
  getStorageValue,
  setStorageValue,
  clearStorageValue,
  storageType,
} from "./storage/localStorage.js";
// import { getStorageValue, setStorageValue, clearStorageValue, storageType } from "./storage/cookies.js"
// import { getStorageValue, setStorageValue, clearStorageValue, storageType } from "./storage/windowName.js"

import { log } from "./logger.js";
import pkceChallenge from "./pkce-challenge.js";

export async function addCodeChallenge(url) {
    const { code_verifier, code_challenge } = await pkceChallenge(50);

  setStorageValue("verifier", code_verifier);

  // Add code challenge to redirect URL
  url.searchParams.set("code_challenge", code_challenge);

  log(`🧚 PKCE required, code_challenge URL parameter added:`, code_challenge);

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
