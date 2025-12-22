"use client";
import { Search } from 'lucide-react';
import { Module } from './ui/navigation-button';
import { Button } from './ui/button';
import { useState } from 'react';
import { useProductSearch } from '@/services/hooks/useProductSearch';

export function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const {
        search: searchBar,
        results: searchBarResults,
        loading: searchBarLoading,
        error: searchBarError,
    } = useProductSearch();

    // TODO: Implement search functionality by querying the backend API for tagged products
    // TODO: Create context to manage Login state across the app


    return (
        <header className="sticky top-0 z-50 w-full bg-[--background]/55 backdrop-blur h-16 border-b border-gray-200 px-10">
            <div className="w-full flex items-center justify-center">
                <div className="h-16 text-zinc-900 flex flex-row items-center justify-baseline w-full max-w-7xl">

                    <div className="flex flex-row items-center gap-5">
                        <a href="/" className="flex items-center">
                            <h1 className="text-2xl font-bold font-inter text-black">MarketHub</h1>
                        </a>
                        <div >
                            <nav className="sm:flex gap-2 ml-6">
                                <Module href="/explore">
                                    Explore
                                </Module>

                                <Module href="/sell">
                                    Sell
                                </Module>

                                <Module href="/about">
                                    About
                                </Module>
                            </nav>
                        </div>
                    </div>

                    <div className='flex-1 justify-center hidden lg:flex'>
                        <div className="border border-zinc-300 hover:border-zinc-600 duration-300 px-3 py-2 rounded-lg flex items-center justify-center gap-2">
                            <Search className="h-5 w-5" />
                            <input
                                className="outline-none bg-transparent"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { searchBar(searchQuery); } }}
                            />
                        </div>
                    </div>

                    <div className="flex-1 sm:flex justify-end gap-5 hidden">
                        <Button variant={"primary"} onClick={() => {
                            window.location.href = "/login"
                        }}>Log In</Button>
                        <Button variant={"secondary"} onClick={() => {
                            window.location.href = "/register"
                        }}>Sign Up</Button>
                    </div>

                </div>
            </div>
        </header >
    );
}
