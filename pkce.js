

// Simple random string generator for code verifier
function generateRandomString(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

// Simplified base64 URL encoding (not suitable for production)
function base64URLEncode(str) {
  // In a real implementation, you'd use a proper base64 encoding and URL-safe transformation
  // This is just a placeholder to show the concept
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
