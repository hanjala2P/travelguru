import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main className="min-h-screen bg-base-200"> <Outlet></Outlet></main>
        </div>
    );
};

export default Layout;