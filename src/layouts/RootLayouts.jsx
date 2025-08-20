import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';

const RootLayouts = () => {
    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }, []);
    return (
        <div className='max-w-7xl mx-auto  overflow-hidden'>
            <Navbar/>
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayouts;