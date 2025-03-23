import "@progress/kendo-theme-default/dist/all.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { TripProvider } from "./contexts/TripContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ AuthProvider should be the outermost provider */}
      <TripProvider> {/* ✅ TripProvider inside AuthProvider */}
        <App />
      </TripProvider>
    </AuthProvider>
  </React.StrictMode>
);