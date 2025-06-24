import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import RootLayout from "../layOut/RootLayOut";
import AuthLayOut from "../layOut/AuthLayOut";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Register";
import Coverage from "../pages/Coverage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/coverage',
                Component: Coverage
            }
        ],
    },
    {
        path: '/',
        Component: AuthLayOut,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }
]);
