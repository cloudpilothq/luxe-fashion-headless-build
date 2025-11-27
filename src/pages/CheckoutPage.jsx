import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext'; // Get Cart & User
import { db } from '../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { cart, getCartTotal, user } = useShop();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        email: '', firstName: '', lastName: '', address: '', city: '', zip: ''
    });

    // --- NEW: Fetch Saved Address from Profile ---
    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setFormData({
                            email: data.email || '',
                            firstName: data.firstName || '',
                            lastName: data.lastName || '',
                            address: data.address || '',
                            city: data.city || '',
                            zip: data.zip || ''
                        });
                    }
                } catch (err) {
                    console.error("Error pre-filling checkout:", err);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlePayment = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert("Your cart is empty");
        if (!user) return alert("Please log in to checkout"); // Force login for now

        setLoading(true);

        try {
            // Create Order in Firebase
            await addDoc(collection(db, "orders"), {
                userId: user.uid,
                customerName: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                items: cart,
                total: getCartTotal(),
                status: "Processing",
                createdAt: new Date(),
                shippingAddress: { // Save address snapshot with order
                    address: formData.address,
                    city: formData.city,
                    zip: formData.zip
                }
            });

            alert("Order Placed Successfully!");
            navigate('/account'); // Go to dashboard
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-luxe-beige min-h-screen py-12 px-6">
            <div className="max-w-[1440px] mx-auto grid lg:grid-cols-3 gap-12">
                {/* Left: Form */}
                <div className="lg:col-span-2">
                    <h1 className="text-4xl font-serif mb-12">Checkout</h1>
                    <form onSubmit={handlePayment} className="space-y-8">
                        {/* Contact */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-serif border-b pb-2">Contact Info</h2>
                            <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Email" className="w-full p-4 border focus:outline-black bg-white" />
                        </section>

                        {/* Shipping */}
                        <section className="space-y-4">
                            <h2 className="text-xl font-serif border-b pb-2">Shipping Address</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" className="w-full p-4 border focus:outline-black bg-white" />
                                <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" className="w-full p-4 border focus:outline-black bg-white" />
                            </div>
                            <input name="address" value={formData.address} onChange={handleChange} required placeholder="Address" className="w-full p-4 border focus:outline-black bg-white" />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="city" value={formData.city} onChange={handleChange} required placeholder="City" className="w-full p-4 border focus:outline-black bg-white" />
                                <input name="zip" value={formData.zip} onChange={handleChange} required placeholder="ZIP Code" className="w-full p-4 border focus:outline-black bg-white" />
                            </div>
                        </section>

                        <button disabled={loading} className="w-full bg-luxe-dark text-white py-5 uppercase tracking-widest hover:bg-gray-800">
                            {loading ? "Processing..." : `Pay $${getCartTotal()}`}
                        </button>
                    </form>
                </div>

                {/* Right: Summary */}
                <div className="bg-white p-8 h-fit shadow-sm">
                    <h3 className="font-serif text-xl mb-6">Order Summary</h3>
                    <div className="space-y-4 mb-6">
                        {cart.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${getCartTotal()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;