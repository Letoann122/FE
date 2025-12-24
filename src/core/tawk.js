const TAWK_SRC = "https://embed.tawk.to/69267c1f7a43e3195d75e558/1jav59mqa";
const SCRIPT_ID = "tawkto-script";

export function loadTawk() {
  if (document.getElementById(SCRIPT_ID)) return;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  const s1 = document.createElement("script");
  s1.id = SCRIPT_ID;
  s1.async = true;
  s1.src = TAWK_SRC;
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  document.head.appendChild(s1);
}

export function removeTawk() {
  try {
    window.Tawk_API?.hideWidget?.();
  } catch (e) {}

  const script = document.getElementById(SCRIPT_ID);
  if (script) script.remove();

  // xoá đúng iframe của tawk
  document.querySelectorAll("iframe").forEach((iframe) => {
    const src = iframe.getAttribute("src") || "";
    if (src.includes("tawk.to")) iframe.remove();
  });
}
