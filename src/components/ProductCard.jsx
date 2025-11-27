import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div className="group cursor-pointer text-center" onClick={() => navigate(`/product/${product.id}`)}>
            <div className="relative overflow-hidden aspect-[3/4] bg-[#F4F4F4] mb-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</p>
                <h3 className="text-base font-medium font-serif">{product.name}</h3>
                <p className="text-sm font-semibold">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;