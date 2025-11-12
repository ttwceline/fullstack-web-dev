import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Hello from "./components/Hello.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Welcome />
  </StrictMode>
);
