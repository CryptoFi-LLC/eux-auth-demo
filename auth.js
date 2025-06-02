import pkceChallenge from "./lib/pkce-challenge.js";
import { jwtDecode } from "./lib/jwt-decode.js";

import { log } from "./logger.js";

// When a DBP requires PKCE, the verifier code must be saved in browser storage before the user is redirected
// to the auth URL, then retrieved when they arrive back at the callback URL (defined by the IDP). Enable ONE
// of the import paths below to compare options.

// Local storage
import {
  getStorageValue,
  clearStorageValue,
  storageType,
  setStorageValue
} from "./storage/cacheAPI.js"; // One of: localStorage.js | cookies.js | windowName.js | cacheAPI.js

export { storageType };

window.onload = async function () {
  const dbpAuthEndpoint = "https://api.cryptofi-dev.com/v2/dbp/auth";
  const urlParams = new URLSearchParams(window.location.search);
  const hasCode = urlParams.has("code");
  const delay = 2000; // add a small delay to allow reading the logs before redirect

  try {
    if (!hasCode) {
      log(`ℹ️ No code parameter found in URL, initiating auth flow...`, null);
      log(`➡️ Sending GET request to /dbp/auth...`, null);

      const response = await fetch(dbpAuthEndpoint, {
        method: "GET",
      });
      const data = await response.json();
      let redirectUrl = new URL(data.redirect_url);
      const isPkceRequired = redirectUrl.searchParams.has("pkce_required");

      // handle PKCE if required
      if (isPkceRequired && redirectUrl) {
        const { code_verifier, code_challenge } = await pkceChallenge(50);

        redirectUrl.searchParams.set("code_challenge", code_challenge); // add code challenge to redirect URL
        await setStorageValue("verifier", code_verifier); // save code verifier in storage

        log(
          `🧚 PKCE required, code_challenge URL parameter added:`,
          code_challenge
        );
      }

      document.getElementById("pkceEnabled").innerText = isPkceRequired;
      log(`ℹ️ Redirecting to auth URL...`, redirectUrl.toString());

      // redirect to auth URL
      setTimeout(() => {
        window.location.replace(redirectUrl.toString());
      }, delay);
    }

    if (hasCode && getStorageValue) {
      const code = urlParams.get("code");
      log(`ℹ️ Found code parameter in URL:`, code);

      // Add code_verifier to request if it exists
      const verifier = await getStorageValue("verifier");
      const requestBody = verifier
        ? { code, code_verifier: verifier } // pkce
        : { code }; // non pkce

      document.getElementById("pkceEnabled").innerText = Boolean(verifier);
      log(`➡️ Sending POST request to /dbp/auth:`, requestBody);

      const response = await fetch(dbpAuthEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.id_token) {
        log(`✅ Auth successful:`, data);

        const decodedToken = jwtDecode(data.id_token);

        document.getElementById("token").innerText = JSON.stringify(
          decodedToken,
          null,
          2
        );

        const expirationDate = new Date(decodedToken.exp * 1000); // Convert seconds to milliseconds
        document.getElementById("tokenExpiration").innerText = expirationDate.toLocaleString();
      } else {
        log(`❌ Auth error:`, data.error || `Unknown error`);
      }

      if (verifier) {
        await clearStorageValue("verifier");
        log(`🧹 Code verifier cleared from storage`);
      }
    }
  } catch (error) {
    log(`❌ Auth error:`, error.message);
  }
};
