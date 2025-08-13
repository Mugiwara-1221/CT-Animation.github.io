// azure-api.js
const API_PROXY_BASE = "https://animationkey.vault.azure.net/"; // or leave empty if using anonymous

async function api(path, options = {}) {
  const res = await fetch(`${API_PROXY_BASE}/proxySession?path=${encodeURIComponent(path)}`, {
    ...options
  });
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? null : res.json();
}

/*async function api(path, options = {}) {
  const url = `${API_BASE}${path}${API_KEY ? `?code=${API_KEY}` : ""}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options
  });
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? null : res.json();
}*/

// Sessions
export const createSession = (maxSeats=6) =>
  api(`/session`, { method: "POST", body: JSON.stringify({ maxSeats }) });

export const getSession = (sessionCode) =>
  api(`/session/${sessionCode}`, { method: "GET" });

export const lockCharacter = (sessionCode, character, uid) =>
  api(`/lock`, { method: "POST", body: JSON.stringify({ sessionCode, character, uid }) });

// Submissions (you’ll wire the backend next)
export const submitDrawing = (sessionCode, character, dataURL, uid) =>
  api(`/submit`, { method: "POST", body: JSON.stringify({ sessionCode, character, dataURL, uid }) });

export const getSubmissions = (sessionCode) =>
  api(`/submissions/${sessionCode}`, { method: "GET" });
