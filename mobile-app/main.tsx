import React from "react";
import { createRoot } from "react-dom/client";
import MobileApp from "../components/mobile/MobileApp";
import "../app/globals.css";

const root = document.getElementById("root");
if (!root) throw new Error("Mobile app root element is missing");
createRoot(root).render(<React.StrictMode><MobileApp /></React.StrictMode>);
