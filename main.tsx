import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Bee Home Creators: #root element was not found in index.html");
}

createRoot(root).render(<App />);
