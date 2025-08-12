import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Workbox } from "workbox-window";
if ("serviceWorker" in navigator) {
  const wb = new Workbox("/sw.js");
  wb.register();
}

console.log("booting app"); // should appear in preview

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
