import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import RootLayout from "../layOut/RootLayOut";
import AuthLayOut from "../layOut/AuthLayOut";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Register";
import Coverage from "../pages/Coverage";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/sendParcel";
import DashboardLayt from '../pages/DashboardLayt';
import MyParcels from '../Dashboard/MyParcels';
import PayMent from '../pages/PayMent';
import PaymentHistory from '../Dashboard/PaymentHistory';
import TrackParcel from '../Dashboard/TrackParcel';


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
                Component: Coverage,
                loader: () => fetch('./warehousesCenter.json')
            },
            {
                path: '/sendParcel',
                loader: () => fetch('./warehousesCenter.json'),
                element: <PrivateRoute>
                    <SendParcel></SendParcel>
                </PrivateRoute>
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

    },

    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayt></DashboardLayt>
        </PrivateRoute>,
        children: [
            {
                path: "myParcels",
                Component: MyParcels
            },
            {
                path: "payment/:parcelId",
                Component: PayMent
            },
            {
                path: "paymentHistory",
                Component: PaymentHistory
            },
            {
                path: 'track',
                Component: TrackParcel
            }

        ]
    }
]);
