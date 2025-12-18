import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { Module } from './ui/navigation-button';
import { Button } from './ui/button';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/55 backdrop-blur h-16 border-b border-gray-200">
            <div className="w-full flex items-center justify-center">
                <div className="h-16 px-4 text-zinc-900 flex items-center max-w-6xl w-full">

                    <div className="flex flex-row items-center gap-5">
                        <a href="/" className="flex items-center">
                            <h1 className="text-2xl font-bold font-inter text-black">MarketHub</h1>
                        </a>
                        <div >
                            <nav className="hidden lg:flex gap-2 ml-6">
                                <Module>
                                    <a href="/explore">Explore</a>
                                </Module>

                                <Module>
                                    <a href="/sell">Sell</a>
                                </Module>

                                <Module>
                                    <a href="/about">About</a>
                                </Module>
                            </nav>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-end gap-5">
                        <button className="hover:text-gray-600 transition-colors">
                            <Search className="h-5 w-5" />
                        </button>
                        <Button variant={"primary"}>Log In</Button>
                        <Button variant={"secondary"}>Sign Up</Button>
                    </div>

                </div>
            </div>
        </header >
    );
}
