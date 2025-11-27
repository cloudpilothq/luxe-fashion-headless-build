import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { User, Package, LogOut, MapPin, ChevronRight, Loader, CreditCard, Wallet } from 'lucide-react';

const AccountPage = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('orders');
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // --- NEW: State for Payment Methods ---
    const [enabledProviders, setEnabledProviders] = useState({});
    const [connectedWallets, setConnectedWallets] = useState({}); // Local state to simulate user connections

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        address: '',
        city: '',
        zip: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // 1. Fetch User Profile
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setProfile(data);
                    setFormData({
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        phone: data.phone || '',
                        country: data.country || '',
                        address: data.address || '',
                        city: data.city || '',
                        zip: data.zip || ''
                    });
                    // Load mock connected wallets from profile if they existed
                    setConnectedWallets(data.connectedWallets || {});
                }

                // 2. Fetch Orders
                const q = query(collection(db, "orders"), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(userOrders.sort((a, b) => b.createdAt - a.createdAt));

                // 3. Fetch Store Config (To know which Payment Methods are active)
                const configDoc = await getDoc(doc(db, "settings", "storeConfig"));
                if (configDoc.exists()) {
                    // Default to all true if not configured yet, or use the DB value
                    setEnabledProviders(configDoc.data().paymentMethods || {
                        stripe: true, paypal: true, paystack: true, opay: true
                    });
                } else {
                    // Fallback if settings document doesn't exist yet
                    setEnabledProviders({ stripe: true, paypal: true, paystack: true, opay: true });
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => fetchUserData(), 500);
        return () => clearTimeout(timer);
    }, [auth, navigate]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        const user = auth.currentUser;
        if (!user) return;

        try {
            await updateDoc(doc(db, "users", user.uid), { ...formData });
            alert("Information Updated Successfully");
            setProfile({ ...profile, ...formData });
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update information");
        } finally {
            setIsSaving(false);
        }
    };

    // --- NEW: Simulate connecting a wallet ---
    const toggleWalletConnection = async (providerId) => {
        const user = auth.currentUser;
        if (!user) return;

        const newStatus = !connectedWallets[providerId];
        const newWallets = { ...connectedWallets, [providerId]: newStatus };

        setConnectedWallets(newWallets);

        // Save this preference to the user's profile in DB
        try {
            await updateDoc(doc(db, "users", user.uid), { connectedWallets: newWallets });
        } catch (err) {
            console.error("Failed to save wallet preference", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Definition of all supported providers
    const ALL_PROVIDERS = [
        { id: 'stripe', name: 'Stripe', type: 'Credit/Debit Cards', color: 'bg-indigo-600' },
        { id: 'paypal', name: 'PayPal', type: 'Wallet', color: 'bg-blue-700' },
        { id: 'paystack', name: 'Paystack', type: 'Direct Bank', color: 'bg-green-600' },
        { id: 'opay', name: 'OPay', type: 'Mobile Money', color: 'bg-green-500' }
    ];

    if (loading) return <div className="min-h-screen flex items-center justify-center font-serif text-xl animate-pulse">Loading Account...</div>;

    return (
        <div className="bg-white min-h-screen pt-12 pb-20 px-6">
            <div className="max-w-[1440px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-6 border-b border-gray-100">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif mb-2">My Account</h1>
                        <p className="text-gray-500 text-lg">Welcome back, {profile?.firstName || 'User'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-4 md:mt-0 text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-2 transition-colors border border-red-100 px-4 py-2 rounded-full hover:bg-red-50"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* --- SIDEBAR NAVIGATION --- */}
                    <aside className="lg:col-span-3">
                        <nav className="space-y-2 sticky top-24">
                            {[
                                { id: 'orders', label: 'Order History', icon: Package },
                                { id: 'profile', label: 'Personal Details', icon: User },
                                { id: 'addresses', label: 'Addresses', icon: MapPin },
                                { id: 'payment', label: 'Payment Methods', icon: CreditCard },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full text-left px-6 py-4 rounded-xl flex items-center justify-between transition-all duration-300 group
                     ${activeTab === item.id
                                            ? 'bg-black text-white shadow-lg'
                                            : 'hover:bg-gray-50 text-gray-500'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-black'}`} />
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                    {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* --- MAIN CONTENT AREA --- */}
                    <div className="lg:col-span-9">

                        {/* TAB: ORDER HISTORY */}
                        {activeTab === 'orders' && (
                            <div className="space-y-8 animate-fade-in">
                                <h2 className="text-2xl font-serif mb-6">Order History</h2>
                                {orders.length > 0 ? (
                                    <div className="space-y-6">
                                        {orders.map(order => (
                                            <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                                                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Order Number</p>
                                                        <p className="font-mono text-sm font-medium">#{order.id.slice(0, 8).toUpperCase()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Date Placed</p>
                                                        <p className="text-sm">{order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Just now'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Total Amount</p>
                                                        <p className="font-medium">${order.total}.00</p>
                                                    </div>
                                                    <div>
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                            {order.status || 'Processing'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        {/* Simple preview of items */}
                                                        <div className="flex -space-x-2">
                                                            {order.items && order.items.slice(0, 3).map((item, i) => (
                                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                                                                    {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200" />}
                                                                </div>
                                                            ))}
                                                            {order.items && order.items.length > 3 && (
                                                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-500">
                                                                    +{order.items.length - 3}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className="text-sm text-gray-500">{order.items?.length || 0} items</span>
                                                    </div>
                                                    <button className="text-sm font-bold underline underline-offset-4 hover:text-gray-600 transition-colors">
                                                        View Invoice
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                        <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                                        <p className="text-gray-500 mb-6">You haven't placed any orders yet. Start shopping to see them here.</p>
                                        <button onClick={() => navigate('/shop')} className="bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-all">
                                            Start Shopping
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB: PROFILE SETTINGS */}
                        {activeTab === 'profile' && (
                            <div className="max-w-3xl animate-fade-in">
                                <h2 className="text-2xl font-serif mb-8">Personal Details</h2>

                                <form onSubmit={handleUpdateProfile} className="space-y-10">
                                    <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
                                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                            <User className="w-5 h-5 text-gray-400" /> Contact Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">First Name</label>
                                                <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-colors" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                                                <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-colors" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                                                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-colors" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Country / Region</label>
                                                <input name="country" value={formData.country} onChange={handleChange} placeholder="United States" className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            disabled={isSaving}
                                            className="bg-black text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-gray-900 transition-all shadow-lg flex items-center gap-2"
                                        >
                                            {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : null}
                                            {isSaving ? 'Saving...' : 'Update Profile'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* TAB: ADDRESSES */}
                        {activeTab === 'addresses' && (
                            <div className="max-w-3xl animate-fade-in">
                                <h2 className="text-2xl font-serif mb-8">Saved Addresses</h2>

                                <form onSubmit={handleUpdateProfile} className="space-y-10">
                                    <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
                                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-gray-400" /> Default Shipping Address
                                        </h3>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Street Address</label>
                                                <input name="address" value={formData.address} onChange={handleChange} placeholder="123 Fashion St" className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-colors" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">City</label>
                                                    <input name="city" value={formData.city} onChange={handleChange} placeholder="New York" className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-colors" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">ZIP Code</label>
                                                    <input name="zip" value={formData.zip} onChange={handleChange} placeholder="10001" className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50 focus:bg-white focus:border-black focus:outline-none transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            disabled={isSaving}
                                            className="bg-black text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-gray-900 transition-all shadow-lg flex items-center gap-2"
                                        >
                                            {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : null}
                                            {isSaving ? 'Saving...' : 'Save Address'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* TAB: PAYMENT METHODS (Active & Dynamic) */}
                        {activeTab === 'payment' && (
                            <div className="max-w-3xl animate-fade-in">
                                <h2 className="text-2xl font-serif mb-8">Payment Methods</h2>
                                <div className="bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
                                    <p className="text-gray-500 mb-6">Connect your preferred wallets for a faster checkout experience.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {ALL_PROVIDERS.map((provider) => {
                                            const isEnabledByAdmin = enabledProviders[provider.id];
                                            const isConnected = connectedWallets[provider.id];

                                            // Only show what the Admin has enabled
                                            if (!isEnabledByAdmin) return null;

                                            return (
                                                <div key={provider.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-black transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded flex items-center justify-center text-white font-bold text-xs ${provider.color}`}>
                                                            {provider.name.substring(0, 2)}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-sm">{provider.name}</h4>
                                                            <p className="text-xs text-gray-500">{provider.type}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => toggleWalletConnection(provider.id)}
                                                        className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${isConnected ? 'bg-green-100 text-green-700' : 'bg-black text-white hover:bg-gray-800'}`}
                                                    >
                                                        {isConnected ? 'Connected' : 'Connect'}
                                                    </button>
                                                </div>
                                            );
                                        })}

                                        {/* Fallback if no providers are enabled */}
                                        {Object.values(enabledProviders).every(v => !v) && (
                                            <div className="col-span-2 text-center py-4 text-gray-400 italic">
                                                No payment methods available at this time.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;