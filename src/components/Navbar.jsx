import React, { useState } from 'react';
import { ShoppingBag, Search, User, Menu, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext'; // Import the Global Brain

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // 1. Get Real Data from Context (No more manual props!)
    const { cart, products } = useShop();

    // 2. Calculate Cart Count dynamically
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    // 3. Filter Real Products from Firebase
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`); // Go to the specific product URL
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
        { label: 'Sale', path: '/sale' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact', path: '/contact' }
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 bg-luxe-beige/90 backdrop-blur-md transition-all duration-300">
                <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Mobile Menu Trigger */}
                    <button className="md:hidden p-2 hover:bg-black/5 rounded-full">
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="text-3xl font-bold tracking-tight cursor-pointer font-serif absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        LUXE
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className="hover:text-gray-500 transition-colors relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-6">
                        <button onClick={() => setIsSearchOpen(true)} className="hover:opacity-70 transition-opacity">
                            <Search className="w-5 h-5" />
                        </button>

                        <Link to="/login" className="hidden md:block hover:opacity-70 transition-opacity">
                            <User className="w-5 h-5" />
                        </Link>

                        <Link to="/checkout" className="relative hover:opacity-70 transition-opacity">
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-luxe-dark text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* --- FULL SCREEN SEARCH OVERLAY --- */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[60] bg-white animate-fade-in flex flex-col">
                    {/* Close Button Header */}
                    <div className="max-w-[1440px] mx-auto px-6 h-20 w-full flex items-center justify-end">
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Search Content */}
                    <div className="max-w-4xl mx-auto px-6 w-full pt-4">
                        {/* Input Field */}
                        <div className="relative border-b-2 border-luxe-dark pb-4 mb-12">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search products..."
                                className="w-full text-3xl md:text-5xl font-serif outline-none placeholder:text-gray-300 bg-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <ArrowRight className="absolute right-0 bottom-6 w-8 h-8 opacity-50" />
                        </div>

                        {/* Results Grid */}
                        <div className="overflow-y-auto max-h-[60vh] pb-10">
                            {searchQuery ? (
                                <div className="animate-fade-in-up">
                                    <p className="text-sm text-gray-400 mb-6 uppercase tracking-widest">
                                        {filteredProducts.length} Results Found
                                    </p>

                                    {filteredProducts.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            {filteredProducts.map(product => (
                                                <div
                                                    key={product.id}
                                                    className="cursor-pointer group"
                                                    onClick={() => handleProductClick(product.id)}
                                                >
                                                    <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden rounded-sm relative">
                                                        <img
                                                            src={product.image}
                                                            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                                                            alt={product.name}
                                                        />
                                                    </div>
                                                    <h4 className="font-serif text-sm group-hover:underline decoration-gray-400 underline-offset-4">
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-xs font-bold mt-1 text-gray-900">${product.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-10 text-gray-400">
                                            No products found matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Empty State / Suggestions */
                                <div>
                                    <p className="text-sm text-gray-400 mb-4 uppercase tracking-widest">Trending Searches</p>
                                    <div className="flex flex-wrap gap-3">
                                        {['Summer Dress', 'Leather Boots', 'Tote Bags', 'Coats', 'Jackets'].map(term => (
                                            <button
                                                key={term}
                                                onClick={() => setSearchQuery(term)}
                                                className="border border-gray-200 px-5 py-2 text-sm hover:border-black hover:bg-black hover:text-white transition-all rounded-full"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;