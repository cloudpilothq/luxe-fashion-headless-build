import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Star, Heart, Truck, RefreshCcw, ShieldCheck } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
    const { id } = useParams(); // Get ID from URL
    const { products, addToCart, loading } = useShop(); // Get real data
    const navigate = useNavigate();

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    if (loading) return <div>Loading...</div>;

    // Find product from the real list
    const product = products.find(p => p.id === id);

    if (!product) return <div className="p-20 text-center">Product not found.</div>;

    const handleAddToCart = () => {
        if (!selectedSize) return alert('Please select a size');
        if (!selectedColor) return alert('Please select a color');
        addToCart(product, selectedSize, selectedColor);
        alert('Added to Bag');
    };

    return (
        <div className="bg-white min-h-screen">
            {/* ... existing layout ... */}
            <div className="max-w-[1440px] mx-auto px-6 py-12 grid md:grid-cols-2 gap-16">
                {/* Image Side */}
                <div className="bg-[#F4F4F4] aspect-[3/4]">
                    <img src={product.image} className="w-full h-full object-cover mix-blend-multiply" alt={product.name} />
                </div>

                {/* Info Side */}
                <div className="py-8">
                    <h1 className="text-4xl font-serif mb-2">{product.name}</h1>
                    <span className="text-2xl font-medium">${product.price}</span>

                    {/* Size Selector */}
                    <div className="mt-8 mb-4">
                        <p className="text-sm font-bold uppercase mb-2">Size</p>
                        <div className="flex gap-2">
                            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-10 h-10 border text-sm ${selectedSize === size ? 'bg-black text-white' : 'hover:border-black'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selector */}
                    <div className="mb-8">
                        <p className="text-sm font-bold uppercase mb-2">Color</p>
                        <div className="flex gap-2">
                            {['Black', 'Brown', 'Beige'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 border text-sm ${selectedColor === color ? 'bg-black text-white' : 'hover:border-black'}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={handleAddToCart} className="w-full bg-black text-white py-4 uppercase tracking-widest hover:bg-gray-800">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Related Products Logic */}
            <div className="max-w-[1440px] mx-auto px-6 py-20 border-t border-gray-200">
                <h2 className="text-3xl font-serif mb-10 text-center">You May Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(p => (
                        <div key={p.id} onClick={() => navigate(`/product/${p.id}`)}>
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;