import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";

const RootLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
           </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer></footer>
        </div>
    );
};

export default RootLayout;
