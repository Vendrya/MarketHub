"use client";

import { ShoppingCart, Search, Menu, User } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <button className="lg:hidden">
                        <Menu className="h-6 w-6" />
                    </button>
                    <a href="/" className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">LUXE</h1>
                    </a>
                    <nav className="hidden lg:flex gap-6">
                        <a href="#" className="text-sm hover:text-gray-600 transition-colors">New Arrivals</a>
                        <a href="#" className="text-sm hover:text-gray-600 transition-colors">Men</a>
                        <a href="#" className="text-sm hover:text-gray-600 transition-colors">Women</a>
                        <a href="#" className="text-sm hover:text-gray-600 transition-colors">Accessories</a>
                        <a href="#" className="text-sm hover:text-gray-600 transition-colors">Sale</a>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <button className="hover:text-gray-600 transition-colors">
                        <Search className="h-5 w-5" />
                    </button>
                    <button className="hover:text-gray-600 transition-colors">
                        <User className="h-5 w-5" />
                    </button>
                    <button className="relative hover:text-gray-600 transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                            3
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
}
