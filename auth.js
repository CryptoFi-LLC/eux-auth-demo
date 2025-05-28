import { log } from "./logger.js";
import {
  addCodeChallenge,
  clearCodeVerifier,
  getCodeVerifier,
} from "./pkce.js";

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

      // handle PKCE if required
      if (redirectUrl.searchParams.get("pkce_required") === "True") {
        redirectUrl = addCodeChallenge(redirectUrl);
      }

      log(`ℹ️ Redirecting to auth URL...`, redirectUrl.toString());

      setTimeout(() => {
        // redirect to auth URL
        window.location.replace(redirectUrl.toString());
      }, delay);
    }

    if (hasCode) {
      const code = urlParams.get("code");
      log(`ℹ️ Found code parameter in URL:`, code);

      // Add code_verifier to request if it exists
      const verifier = getCodeVerifier();
      const requestBody = verifier
        ? { code, code_verifier: verifier } // pkce
        : { code }; // non pkce

      log(`➡️ Sending POST request to /dbp/auth:`, requestBody);

      const response = await fetch(dbpAuthEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      log(`✅ Auth successful:`, data);

      clearCodeVerifier();
    }
  } catch (error) {
    log(`❌ Auth error:`, error.message);
  }
};
