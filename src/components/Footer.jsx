import React from 'react';

// Pass setPage prop here!
const Footer = ({ setPage }) => (
    <footer className="bg-luxe-dark text-white pt-16 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
            <div>
                <h4 className="font-serif text-xl mb-6">About Us</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Crafting timeless elegance for the modern individual. Quality and style in every detail.</p>
            </div>
            <div>
                <h4 className="font-serif text-xl mb-6">Customer Service</h4>
                <ul className="text-sm text-gray-400 space-y-3 cursor-pointer">
                    <li onClick={() => setPage('contact')} className="hover:text-white transition-colors">Contact Us</li>
                    <li onClick={() => setPage('shipping')} className="hover:text-white transition-colors">Shipping Policy</li>
                    <li onClick={() => setPage('returns')} className="hover:text-white transition-colors">Returns & Exchanges</li>
                    <li onClick={() => setPage('faq')} className="hover:text-white transition-colors">FAQs</li>
                </ul>
            </div>
            <div>
                <h4 className="font-serif text-xl mb-6">Quick Links</h4>
                <ul className="text-sm text-gray-400 space-y-3 cursor-pointer">
                    <li onClick={() => setPage('account')} className="hover:text-white transition-colors">My Account</li>
                    <li onClick={() => setPage('store')} className="hover:text-white transition-colors">Find a Store</li>
                    <li onClick={() => setPage('giftcard')} className="hover:text-white transition-colors">Gift Cards</li>
                </ul>
            </div>
            <div>
                <h4 className="font-serif text-xl mb-6">Newsletter</h4>
                <p className="text-sm text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and deals.</p>
                <div className="flex border-b border-gray-700 pb-2">
                    <input type="email" placeholder="Enter your email" className="bg-transparent outline-none flex-1 text-sm" />
                    <button className="text-sm uppercase tracking-widest">Subscribe</button>
                </div>
            </div>
        </div>
        <div className="text-[20vw] leading-[0.8] font-serif font-bold text-center text-white/10 pointer-events-none select-none tracking-tighter">
            LUXE
        </div>
    </footer>
);

export default Footer;