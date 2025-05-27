import { log } from "./logger.js";

import { base64URLEncode, generateRandomString } from "./pkce.js";

// import { getStorageValue, setStorageValue, clearStorageValue } from "./localStorage.js"
// import { getStorageValue, setStorageValue, clearStorageValue } from "./cookies.js"
// import { getStorageValue, setStorageValue, clearStorageValue } from "./storageAccess.js"

window.onload = async function () {
  const dbpAuthEndpoint = "https://api.cryptofi-dev.com/v2/dbp/auth";
  const urlParams = new URLSearchParams(window.location.search);
  const hasCode = urlParams.has("code");
  const delay = 2000; // add a small delay to allow reading the logs before redirect

  try {
    if (!hasCode) {
      log("ℹ️ No code parameter found in URL, initiating auth flow...", null);
      log("➡️ Sending GET request to /dbp/auth...", null);

      const response = await fetch(dbpAuthEndpoint, {
        method: "GET",
      });

      const data = await response.json();

      // TODO check if PKCE is required
      const redirectUrl = new URL(data.redirect_url);

      // if (redirectUrl.searchParams.get("pkce_required") === "True") {
      //   // If PKCE is required, we need to generate a challenge
      //   // Since we can't use pkce-challenge directly in vanilla JS,
      //   // we'll need to implement a simplified version or use a CDN

      //   // This is a placeholder - in production you'd need a proper PKCE implementation
      //   const codeVerifier = generateRandomString(50);
      //   const codeChallenge = base64URLEncode(codeVerifier); // This is simplified

      //   // Store code verifier in cookie
      //   document.cookie = `verifier=${codeVerifier}; path=/; max-age=3600`;

      //   // Add code challenge to redirect URL
      //   redirectUrl.searchParams.set("code_challenge", codeChallenge);

      //   log("🧚 PKCE required, code_challenge URL parameter added:", codeChallenge);
      // }

      log("ℹ️ Redirecting to auth URL...", redirectUrl.toString());

      setTimeout(() => {
        // redirect to auth URL
        window.location.replace(redirectUrl.toString());
      }, delay);
    }

    if (hasCode) {
      const code = urlParams.get("code");
      log("ℹ️ Found code parameter in URL:", code);

      // const codeVerifier = getCookie("verifier");
      const requestBody = {
        code: code,
      };

      // Add code_verifier to request if it exists
      // if (codeVerifier) {
      //   requestBody.code_verifier = codeVerifier;
      // }

      log("➡️ Sending POST request to /dbp/auth:", requestBody);

      const response = await fetch(dbpAuthEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      log("✅ Auth successful:", data);
    }
  } catch (error) {
    log("❌ Auth error:", error.message);
  }
};
