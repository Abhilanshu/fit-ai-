'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Check auth status
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/login');
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
                    <Dumbbell className="text-blue-500" size={32} />
                    <span>Fit<span className="text-blue-500">AI</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                    <Link href="/#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
                    <Link href="/#about" className="text-gray-300 hover:text-white transition-colors">About</Link>

                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                            <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">Profile</Link>
                            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
                            <Link
                                href="/signup"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-lg shadow-blue-500/30"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-gray-800 p-6 flex flex-col gap-4">
                    <Link href="/" className="text-gray-300 hover:text-white text-lg" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/#features" className="text-gray-300 hover:text-white text-lg" onClick={() => setIsOpen(false)}>Features</Link>
                    <Link href="/#about" className="text-gray-300 hover:text-white text-lg" onClick={() => setIsOpen(false)}>About</Link>

                    {isAuthenticated ? (
                        <>
                            <Link href="/dashboard" className="text-gray-300 hover:text-white text-lg" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <Link href="/profile" className="text-gray-300 hover:text-white text-lg" onClick={() => setIsOpen(false)}>Profile</Link>
                            <Link href="/contact" className="text-gray-300 hover:text-white text-lg" onClick={() => setIsOpen(false)}>Contact</Link>
                            <button
                                onClick={() => { handleLogout(); setIsOpen(false); }}
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-center"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-300 hover:text-white text-lg" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link
                                href="/signup"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
