import React from 'react';
import { useShop } from '../context/ShopContext'; // <--- NEW: Get data from Context
import ProductCard from '../components/ProductCard';

const SalePage = ({ setPage, setCurrentProduct }) => {
    const { products, loading } = useShop(); // <--- NEW: Use real products

    if (loading) return <div className="min-h-screen pt-20 text-center">Loading Sale Items...</div>;

    // Filter items under $500 as "Sale" items
    const saleProducts = products.filter(p => p.price < 500);

    return (
        <div className="bg-luxe-beige min-h-screen pt-10 pb-20">
            <div className="max-w-[1440px] mx-auto px-6 mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-serif text-red-800 mb-4">Seasonal Sale</h1>
                <p className="text-gray-600 uppercase tracking-widest">Up to 50% Off Selected Items</p>
            </div>

            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
                    {saleProducts.map(p => (
                        <div key={p.id} className="relative">
                            {/* Sale Badge */}
                            <div className="absolute top-2 left-2 z-10 bg-red-800 text-white text-xs px-2 py-1 uppercase tracking-widest font-bold">
                                -30%
                            </div>
                            <ProductCard product={p} />
                        </div>
                    ))}
                    {/* If no items on sale */}
                    {saleProducts.length === 0 && (
                        <div className="col-span-3 text-center text-gray-400">
                            No items currently on sale. Check back soon!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalePage;