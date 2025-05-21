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
      log("ℹ️ Redirecting to auth URL...", redirectUrl.toString());

      setTimeout(() => {
        // redirect to auth URL
        window.location.replace(redirectUrl.toString());
      }, delay);
    }

    if (hasCode) {
      const code = urlParams.get("code");
      log("ℹ️ Found code parameter in URL:", code);

      const requestBody = {
        code: code,
      };

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
