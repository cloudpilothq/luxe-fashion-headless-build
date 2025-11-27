import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const StoreLocator = () => (
    <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row">
        {/* Sidebar List */}
        <div className="w-full md:w-1/3 bg-white p-8 overflow-y-auto border-r border-gray-200">
            <h1 className="text-3xl font-serif mb-8">Our Boutiques</h1>
            <div className="space-y-8">
                {[1, 2, 3].map((store) => (
                    <div key={store} className="border-b border-gray-100 pb-8 last:border-0">
                        <h3 className="font-serif text-xl mb-2">Luxe New York</h3>
                        <p className="text-sm text-gray-500 mb-4">123 Fashion Ave, NY 10012<br />Mon-Sun: 10am - 8pm</p>
                        <button className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-gray-600">
                            Get Directions <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
        {/* Map Placeholder */}
        <div className="flex-1 bg-gray-200 relative">
            <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                className="w-full h-full object-cover grayscale opacity-50"
                alt="Map Background"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-full shadow-xl">
                    <MapPin className="w-8 h-8 text-luxe-dark" />
                </div>
            </div>
        </div>
    </div>
);

export default StoreLocator;