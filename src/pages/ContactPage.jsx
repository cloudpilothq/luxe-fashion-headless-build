import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => (
    <div className="bg-luxe-beige min-h-screen py-20">
        <div className="max-w-[1440px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="space-y-8">
                <h1 className="text-5xl font-serif mb-6">Get in Touch</h1>
                <p className="text-gray-600 max-w-md mb-8">
                    Our client service team is at your disposal to assist with any inquiries or styling advice you may require.
                </p>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Mail className="w-5 h-5 mt-1" />
                        <div>
                            <h3 className="font-serif text-lg">Email Us</h3>
                            <p className="text-sm text-gray-500">concierge@luxe-fashion.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="w-5 h-5 mt-1" />
                        <div>
                            <h3 className="font-serif text-lg">Call Us</h3>
                            <p className="text-sm text-gray-500">+1 (800) 123-4567</p>
                            <p className="text-xs text-gray-400">Mon-Fri, 9am - 6pm EST</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 mt-1" />
                        <div>
                            <h3 className="font-serif text-lg">Flagship Store</h3>
                            <p className="text-sm text-gray-500">123 Fashion Avenue<br />New York, NY 10012</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white p-10 shadow-sm border border-gray-100">
                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold tracking-widest">Name</label>
                            <input type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold tracking-widest">Order #</label>
                            <input type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold tracking-widest">Email</label>
                        <input type="email" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold tracking-widest">Message</label>
                        <textarea rows="4" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black resize-none"></textarea>
                    </div>
                    <button className="w-full bg-luxe-dark text-white py-4 uppercase tracking-widest hover:bg-gray-800 transition-colors">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </div>
);

export default ContactPage;