import React, { useState } from 'react';
import { Plus, Edit, Trash2, Filter } from 'lucide-react';
import { useShop } from '../../context/ShopContext'; // <--- NEW: Get data from Context
import AddProductForm from '../../components/AddProductForm';

const Products = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { products, loading } = useShop(); // <--- NEW: Use real products

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Products</h2>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800"
                >
                    <Plus className="w-4 h-4" /> Add New Product
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                <div className="relative flex-1">
                    <input type="text" placeholder="Search products..." className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm" />
                </div>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50">
                    <Filter className="w-4 h-4" /> Filter
                </button>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading products...</div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase">
                            <tr>
                                <th className="p-4 font-medium">Product</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Stock</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 flex items-center gap-4">
                                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover bg-gray-100" />
                                        <span className="font-medium">{p.name}</span>
                                    </td>
                                    <td className="p-4 text-gray-500">{p.category}</td>
                                    <td className="p-4 font-medium">${p.price}</td>
                                    <td className="p-4 text-gray-500">∞</td>
                                    <td className="p-4">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Active</span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button className="p-2 hover:bg-gray-100 rounded text-blue-600"><Edit className="w-4 h-4" /></button>
                                        <button className="p-2 hover:bg-gray-100 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">
                                        No products found. Click "Add New Product" to create one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* --- ADD PRODUCT MODAL --- */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 animate-fade-in-up relative">
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black"
                        >
                            Close
                        </button>

                        {/* Use the Real Form Component */}
                        <AddProductForm />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;