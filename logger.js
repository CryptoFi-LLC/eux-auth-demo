const outputElement = document.getElementById("output");

function log(message, data) {
  const logEntry = document.createElement("div");
  logEntry.classList.add("log-entry");

  const timestamp = new Date().toLocaleTimeString();
  const formattedMessage = `[${timestamp}] ${message}`;

  if (data) {
    logEntry.innerHTML = `<p>${formattedMessage}</p><pre>${JSON.stringify(
      data,
      null,
      2
    )}</pre>`;
  } else {
    logEntry.innerHTML = `<p>${formattedMessage}</p>`;
  }

  outputElement.appendChild(logEntry);
  // Auto-scroll to the bottom
  outputElement.scrollTop = outputElement.scrollHeight;
}
