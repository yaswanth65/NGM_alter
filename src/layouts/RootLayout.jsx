import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/global/Navbar';
import Preloader from '@/components/global/Preloader';
import Footer from '@/components/global/Footer';
import GlobalContact from '@/components/global/GlobalContact';
import '../styles/fonts.css';

export default function RootLayout({ children }) {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="antialiased font-sans">
            <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
                <div className="red-glow" />
            </div>
            {isHome && <Preloader />}
            <Navbar />
            <main className="relative z-10">
                {children}
            </main>
            <GlobalContact />
            <Footer />
        </div>
    );
}
