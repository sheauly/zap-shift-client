import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer";

const RootLayout = () => {
    return (
        <div className="min-h-screen mx-auto">
            <header>
                <Navbar></Navbar>
           </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;
