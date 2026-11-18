import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { RouterProvider } from "./router.jsx";
import "./styles.css";
import "./pages.css";
import "./pages2.css";
import "./design-system/styles.css";
import "./design-system/business.css";
import "./design-system/calibrated.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </React.StrictMode>,
);
