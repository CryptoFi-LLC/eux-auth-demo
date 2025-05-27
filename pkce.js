

export function generateRandomString(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

// Simplified base64 URL encoding (not suitable for production)
export function base64URLEncode(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function addCodeChallengeToUrl(url, codeChallenge) {
  const urlObj = new URL(url);
  urlObj.searchParams.set("code_challenge", codeChallenge);
  return urlObj.toString();
}
