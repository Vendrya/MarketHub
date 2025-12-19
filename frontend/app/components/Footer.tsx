import { Facebook, Instagram, X, Youtube } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[--background] border-t border-gray-200 text-[--foreground]">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-xl mb-4">MarketHub</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Your destination for premium fashion and lifestyle products.
                        </p>
                        <div className="flex gap-4">
                            <button className="hover:text-gray-600 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </button>
                            <button className="hover:text-gray-600 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </button>
                            <button className="hover:text-gray-600 transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                            <button className="hover:text-gray-600 transition-colors">
                                <Youtube className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-black transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Best Sellers</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Sale</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Gift Cards</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Shipping Info</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Returns</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
                    <p>&copy; 2025 MarketHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
