import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { registerSW } from "virtual:pwa-register";

// PWA registration (safe with vite-plugin-pwa)
registerSW({ immediate: true });
// Apply saved/system theme before first paint
function applyInitialTheme() {
  const saved = localStorage.getItem("theme") as "light" | "dark" | null;
  const systemDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;
  const theme = saved ?? (systemDark ? "dark" : "light");
  document.documentElement.dataset.theme = theme;
}

applyInitialTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
