import { ShoppingCart, Search, Menu, User } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur">
            <div className="w-full flex items-center justify-center">
                <div className="h-16 px-4 text-zinc-900 flex items-center max-w-6xl w-full">

                    <div className="flex flex-row items-center gap-10">
                        <a href="/" className="flex items-center">
                            <h1 className="text-2xl font-bold text-black">MarketHub</h1>
                        </a>
                        <div className="flex items-center">
                            <nav className="hidden lg:flex gap-6 ml-6">
                                <a href="#" className="text-sm hover:text-gray-600 transition-colors">Explore</a>

                                <a href="#" className="text-sm hover:text-gray-600 transition-colors">Sell Products</a>

                                <a href="#" className="text-sm hover:text-gray-600 transition-colors">About</a>
                            </nav>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-end gap-5">
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
            </div>
        </header >
    );
}
