import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
import "./index.css";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <div className="font-urbanist max-w-7xl mx-auto">
            <RouterProvider router={router} />
        </div>
    </StrictMode>
);
