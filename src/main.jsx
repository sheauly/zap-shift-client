import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
import "./index.css";
import "./style.css";
import AuthProvider from "./AuthProvider.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider,} from '@tanstack/react-query'

// import 'aos/dist/aos.css';
// import Aos from 'aos';

// Aos.init();

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <div className="font-urbanist max-w-7xl mx-auto">
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={router} />
                    <ToastContainer />
                </AuthProvider>
            </QueryClientProvider>
        </div>
    </StrictMode>
);
