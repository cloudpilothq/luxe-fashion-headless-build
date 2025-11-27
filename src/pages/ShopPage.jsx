import React, { useState, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';

// FIREBASE IMPORTS
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ShopPage = ({ setPage, setCurrentProduct }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [products, setProducts] = useState([]); // State to hold DB data
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch data when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsList = querySnapshot.docs.map(doc => ({
                    id: doc.id, // Use the Firebase ID
                    ...doc.data()
                }));
                setProducts(productsList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center font-serif text-xl">Loading Luxury Items...</div>;
    }

    return (
        <div className="bg-luxe-beige min-h-screen pt-10 pb-20">
            {/* ... Header and Filter UI (Keep the same) ... */}

            <div className="max-w-[1440px] mx-auto px-6 flex gap-12 relative">
                {/* ... Sidebar Code (Keep the same) ... */}

                <main className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
                        {/* RENDER THE FIREBASE PRODUCTS */}
                        {products.map(p => (
                            <ProductCard key={p.id} product={p} setPage={setPage} setCurrentProduct={setCurrentProduct} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ShopPage;