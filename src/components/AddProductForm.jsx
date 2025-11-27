import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Link, Loader } from 'lucide-react';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Women',
        description: '',
        imageUrl: '' // Changed from 'image' file to 'imageUrl' string
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Direct save to Database (No Storage upload needed)
            await addDoc(collection(db, "products"), {
                name: formData.name,
                price: Number(formData.price),
                category: formData.category,
                image: formData.imageUrl, // Saving the text link directly
                createdAt: new Date()
            });

            alert("Product Added Successfully!");
            setFormData({ name: '', price: '', category: 'Women', description: '', imageUrl: '' });
        } catch (error) {
            console.error("Error adding product: ", error);
            alert("Error uploading product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
            <h2 className="text-2xl font-serif mb-6">Add New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Image URL Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest">Image URL</label>
                    <div className="flex items-center border-b border-gray-300 py-2">
                        <Link className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                            className="w-full focus:outline-none focus:border-black"
                            placeholder="Paste image link here (https://...)"
                        />
                    </div>
                    {/* Image Preview */}
                    {formData.imageUrl && (
                        <div className="mt-4 aspect-[3/4] w-32 bg-gray-50 rounded overflow-hidden">
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest">Product Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" placeholder="e.g. Silk Dress" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest">Price ($)</label>
                        <input name="price" type="number" value={formData.price} onChange={handleChange} required className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" placeholder="e.g. 250" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none">
                        <option>Women</option>
                        <option>Men</option>
                        <option>Shoes</option>
                        <option>Accessories</option>
                    </select>
                </div>

                <button disabled={loading} className="w-full bg-luxe-dark text-white py-4 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors flex justify-center items-center gap-2">
                    {loading ? <><Loader className="w-4 h-4 animate-spin" /> Saving...</> : "Publish Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;