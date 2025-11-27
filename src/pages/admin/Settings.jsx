import React, { useState, useEffect } from 'react';
import {
    Save, Globe, Layout, Instagram, Facebook, Twitter,
    ToggleLeft, ToggleRight, Loader, Image as ImageIcon,
    CreditCard, Key, ShieldCheck, AlertCircle, Eye, EyeOff, Lock
} from 'lucide-react';
import { db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('general');
    const [hasChanges, setHasChanges] = useState(false);

    // Security: Toggle visibility for secret keys
    const [showSecrets, setShowSecrets] = useState({});

    // Expanded State for full CMS
    const [config, setConfig] = useState({
        storeName: '',
        supportEmail: '',
        phone: '',
        address: '',
        currency: 'USD',

        // Homepage Hero
        heroTitle: '',
        heroSubtitle: '',
        heroImage: '',

        // Announcement Bar
        showAnnouncement: true,
        announcementText: '',

        // Categories (Fixed 4 slots for the grid)
        categories: [
            { title: 'Shoes', image: '' },
            { title: 'Bags', image: '' },
            { title: 'Apparel', image: '' },
            { title: 'Accessories', image: '' }
        ],

        // Sale Banners
        saleBanner1: { title: 'Clearance', subtitle: 'Up to 70% off', image: '' },
        saleBanner2: { title: 'High Boots', subtitle: 'Winter Essentials', image: '' },

        // Social Media
        instagram: '',
        facebook: '',
        twitter: '',

        // Payment Configuration
        paymentMethods: {
            stripe: false,
            paypal: false,
            paystack: false,
            opay: false
        },
        paymentKeys: {
            stripe: { public: '', secret: '' },
            paypal: { clientId: '', secret: '' },
            paystack: { public: '', secret: '' },
            opay: { merchantId: '', public: '' }
        }
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "storeConfig");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // Merge with default state to ensure all fields exist
                    setConfig(prev => ({
                        ...prev,
                        ...data,
                        categories: data.categories || prev.categories,
                        saleBanner1: data.saleBanner1 || prev.saleBanner1,
                        saleBanner2: data.saleBanner2 || prev.saleBanner2,
                        paymentMethods: { ...prev.paymentMethods, ...data.paymentMethods },
                        paymentKeys: { ...prev.paymentKeys, ...data.paymentKeys }
                    }));
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        };
        fetchSettings();
    }, []);

    // --- Handlers ---

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setConfig({ ...config, [e.target.name]: value });
        setHasChanges(true);
    };

    // Handle nested object updates (for Sale Banners)
    const handleNestedChange = (parent, field, value) => {
        setConfig(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
        setHasChanges(true);
    };

    // Handle array updates (for Categories) - FIXED: Uses functional update for reliability
    const handleCategoryChange = (index, field, value) => {
        setConfig(prev => {
            const newCategories = [...prev.categories];
            // Ensure the object exists before spreading (safety check)
            if (!newCategories[index]) newCategories[index] = {};
            newCategories[index] = { ...newCategories[index], [field]: value };
            return { ...prev, categories: newCategories };
        });
        setHasChanges(true);
    };

    const handlePaymentToggle = (provider) => {
        setConfig(prev => ({
            ...prev,
            paymentMethods: {
                ...prev.paymentMethods,
                [provider]: !prev.paymentMethods[provider]
            }
        }));
        setHasChanges(true);
    };

    const handleKeyChange = (provider, keyType, value) => {
        setConfig(prev => ({
            ...prev,
            paymentKeys: {
                ...prev.paymentKeys,
                [provider]: {
                    ...prev.paymentKeys[provider],
                    [keyType]: value
                }
            }
        }));
        setHasChanges(true);
    };

    const toggleSecretVisibility = (provider) => {
        setShowSecrets(prev => ({ ...prev, [provider]: !prev[provider] }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // SECURITY UPDATE: Use { merge: true } to prevent accidental data loss
            await setDoc(doc(db, "settings", "storeConfig"), config, { merge: true });
            setHasChanges(false);
            alert("Settings Saved Successfully");
        } catch (error) {
            console.error("Error saving:", error);
            alert("Save failed: " + error.message); // Display the actual error
        } finally {
            setLoading(false);
        }
    };

    const menuItems = [
        { id: 'general', label: 'General', icon: Globe, desc: 'Store details & currency' },
        { id: 'storefront', label: 'Storefront', icon: Layout, desc: 'Home banners & layout' },
        { id: 'payments', label: 'Payment Gateways', icon: CreditCard, desc: 'Manage payment providers' },
        { id: 'social', label: 'Social Media', icon: Instagram, desc: 'Link your accounts' },
    ];

    return (
        <div className="flex h-[calc(100vh-100px)] gap-8">

            {/* --- LEFT SIDEBAR NAV --- */}
            <div className="w-72 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-gray-900">Configuration</h3>
                        <p className="text-xs text-gray-500">Manage your store settings</p>
                    </div>
                    <nav className="p-2 space-y-1">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all text-left
                  ${activeSection === item.id
                                        ? 'bg-luxe-dark text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <item.icon className={`w-5 h-5 mt-0.5 ${activeSection === item.id ? 'text-gray-300' : 'text-gray-400'}`} />
                                <div>
                                    <span className="block font-medium text-sm">{item.label}</span>
                                    <span className={`text-xs ${activeSection === item.id ? 'text-gray-400' : 'text-gray-400'}`}>{item.desc}</span>
                                </div>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 min-w-0 pb-20">
                {/* Header with Save Button */}
                <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-serif font-bold capitalize">{activeSection} Settings</h2>
                        <p className="text-sm text-gray-500">Update your store's {activeSection} information</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={!hasChanges && !loading}
                        className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all
              ${hasChanges
                                ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                        {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {hasChanges ? 'Save Changes' : 'Saved'}
                    </button>
                </div>

                <div className="space-y-6">

                    {/* === GENERAL SECTION === */}
                    {activeSection === 'general' && (
                        <div className="grid gap-6 animate-fade-in">
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-lg mb-4 border-b border-gray-100 pb-2">Store Identity</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Store Name</label>
                                        <div className="relative">
                                            <Globe className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                                            <input name="storeName" value={config.storeName} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Currency</label>
                                        <select name="currency" value={config.currency} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none">
                                            <option value="USD">USD ($)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="GBP">GBP (£)</option>
                                            <option value="NGN">NGN (₦)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-lg mb-4 border-b border-gray-100 pb-2">Contact Information</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Support Email</label>
                                        <input name="supportEmail" value={config.supportEmail} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Phone Number</label>
                                        <input name="phone" value={config.phone} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Address</label>
                                        <input name="address" value={config.address} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === STOREFRONT SECTION === */}
                    {activeSection === 'storefront' && (
                        <div className="grid gap-6 animate-fade-in">

                            {/* Hero Settings */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-lg mb-4 border-b border-gray-100 pb-2">Homepage Hero</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Main Title</label>
                                        <input name="heroTitle" value={config.heroTitle} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none font-serif text-lg" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Subtitle</label>
                                        <input name="heroSubtitle" value={config.heroSubtitle} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500">Hero Image URL</label>
                                        <div className="flex gap-4 items-start">
                                            <input name="heroImage" value={config.heroImage} onChange={handleChange} className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none text-sm font-mono text-blue-600" />
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                                                {config.heroImage ? <img src={config.heroImage} className="w-full h-full object-cover" alt="Preview" /> : <div className="flex items-center justify-center h-full text-xs text-gray-400">Img</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Categories Editor */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-lg mb-4 border-b border-gray-100 pb-2">Browse Categories Grid</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {config.categories.map((cat, idx) => (
                                        <div key={idx} className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                                            <p className="text-xs font-bold uppercase text-gray-400 mb-3">Slot {idx + 1}</p>
                                            <div className="space-y-3">
                                                <div className="space-y-1">
                                                    <label className="text-xs text-gray-500">Title</label>
                                                    <input
                                                        value={cat.title}
                                                        onChange={(e) => handleCategoryChange(idx, 'title', e.target.value)}
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded focus:border-black outline-none"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs text-gray-500">Image URL</label>
                                                    <input
                                                        value={cat.image}
                                                        onChange={(e) => handleCategoryChange(idx, 'image', e.target.value)}
                                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded focus:border-black outline-none text-xs font-mono text-blue-600"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sale Banners Editor */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-lg mb-4 border-b border-gray-100 pb-2">Sale Promos</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Banner 1 */}
                                    <div className="space-y-4 border-r border-gray-100 pr-6">
                                        <h4 className="font-bold text-sm uppercase text-gray-500">Left Banner</h4>
                                        <div className="space-y-2">
                                            <label className="text-xs">Title</label>
                                            <input value={config.saleBanner1.title} onChange={(e) => handleNestedChange('saleBanner1', 'title', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border rounded focus:border-black outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs">Subtitle</label>
                                            <input value={config.saleBanner1.subtitle} onChange={(e) => handleNestedChange('saleBanner1', 'subtitle', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border rounded focus:border-black outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs">Image URL</label>
                                            <input value={config.saleBanner1.image} onChange={(e) => handleNestedChange('saleBanner1', 'image', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border rounded focus:border-black outline-none text-xs text-blue-600" />
                                        </div>
                                    </div>

                                    {/* Banner 2 */}
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-sm uppercase text-gray-500">Right Banner</h4>
                                        <div className="space-y-2">
                                            <label className="text-xs">Title</label>
                                            <input value={config.saleBanner2.title} onChange={(e) => handleNestedChange('saleBanner2', 'title', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border rounded focus:border-black outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs">Subtitle</label>
                                            <input value={config.saleBanner2.subtitle} onChange={(e) => handleNestedChange('saleBanner2', 'subtitle', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border rounded focus:border-black outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs">Image URL</label>
                                            <input value={config.saleBanner2.image} onChange={(e) => handleNestedChange('saleBanner2', 'image', e.target.value)} className="w-full px-3 py-2 bg-gray-50 border rounded focus:border-black outline-none text-xs text-blue-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Announcement Bar */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                                    <h3 className="font-bold text-lg">Announcement Bar</h3>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="showAnnouncement"
                                            checked={config.showAnnouncement}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        {config.showAnnouncement
                                            ? <ToggleRight className="w-8 h-8 text-green-600 transition-colors" />
                                            : <ToggleLeft className="w-8 h-8 text-gray-300 transition-colors" />}
                                        <span className="text-sm font-medium">{config.showAnnouncement ? 'Enabled' : 'Disabled'}</span>
                                    </label>
                                </div>
                                <div className={`space-y-2 transition-opacity ${config.showAnnouncement ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                                    <label className="text-xs font-bold uppercase text-gray-500">Announcement Text</label>
                                    <input
                                        name="announcementText"
                                        value={config.announcementText || ''}
                                        onChange={handleChange}
                                        placeholder="e.g. Free shipping on orders over $500"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === PAYMENTS SECTION === */}
                    {activeSection === 'payments' && (
                        <div className="grid gap-6 animate-fade-in">
                            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 text-blue-800 text-sm border border-blue-100">
                                <ShieldCheck className="w-5 h-5 flex-shrink-0 text-blue-600" />
                                <div>
                                    <p className="font-bold mb-1">Security Protocol Active</p>
                                    <p>These keys grant access to your funds. They are stored securely. Ensure you are in a private location before revealing them.</p>
                                </div>
                            </div>

                            {/* Stripe */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">St</div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Stripe</h3>
                                            <p className="text-xs text-gray-500">Credit/Debit Cards</p>
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={config.paymentMethods?.stripe} onChange={() => handlePaymentToggle('stripe')} className="hidden" />
                                        {config.paymentMethods?.stripe ? <ToggleRight className="w-10 h-10 text-green-600" /> : <ToggleLeft className="w-10 h-10 text-gray-300" />}
                                    </label>
                                </div>
                                {config.paymentMethods?.stripe && (
                                    <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500">Publishable Key</label>
                                            <div className="relative">
                                                <Key className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                                                <input
                                                    value={config.paymentKeys?.stripe?.public}
                                                    onChange={(e) => handleKeyChange('stripe', 'public', e.target.value)}
                                                    className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded outline-none font-mono text-sm"
                                                    type={showSecrets.stripe ? "text" : "password"}
                                                />
                                                <button onClick={() => toggleSecretVisibility('stripe')} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                                                    {showSecrets.stripe ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                                                <Lock className="w-3 h-3" /> Secret Key
                                            </label>
                                            <div className="relative">
                                                <input
                                                    value={config.paymentKeys?.stripe?.secret}
                                                    onChange={(e) => handleKeyChange('stripe', 'secret', e.target.value)}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded outline-none font-mono text-sm"
                                                    type="password"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Paystack */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">Pa</div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Paystack</h3>
                                            <p className="text-xs text-gray-500">African Payments</p>
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={config.paymentMethods?.paystack} onChange={() => handlePaymentToggle('paystack')} className="hidden" />
                                        {config.paymentMethods?.paystack ? <ToggleRight className="w-10 h-10 text-green-600" /> : <ToggleLeft className="w-10 h-10 text-gray-300" />}
                                    </label>
                                </div>
                                {config.paymentMethods?.paystack && (
                                    <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500">Public Key</label>
                                            <div className="relative">
                                                <Key className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                                                <input
                                                    value={config.paymentKeys?.paystack?.public}
                                                    onChange={(e) => handleKeyChange('paystack', 'public', e.target.value)}
                                                    className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded outline-none font-mono text-sm"
                                                    type={showSecrets.paystack ? "text" : "password"}
                                                />
                                                <button onClick={() => toggleSecretVisibility('paystack')} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                                                    {showSecrets.paystack ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                                                <Lock className="w-3 h-3" /> Secret Key
                                            </label>
                                            <input
                                                value={config.paymentKeys?.paystack?.secret}
                                                onChange={(e) => handleKeyChange('paystack', 'secret', e.target.value)}
                                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded outline-none font-mono text-sm"
                                                type="password"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* PayPal */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">Py</div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">PayPal</h3>
                                            <p className="text-xs text-gray-500">Global Wallet</p>
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={config.paymentMethods?.paypal} onChange={() => handlePaymentToggle('paypal')} className="hidden" />
                                        {config.paymentMethods?.paypal ? <ToggleRight className="w-10 h-10 text-green-600" /> : <ToggleLeft className="w-10 h-10 text-gray-300" />}
                                    </label>
                                </div>
                                {config.paymentMethods?.paypal && (
                                    <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500">Client ID</label>
                                            <div className="relative">
                                                <Key className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                                                <input
                                                    value={config.paymentKeys?.paypal?.clientId}
                                                    onChange={(e) => handleKeyChange('paypal', 'clientId', e.target.value)}
                                                    className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded outline-none font-mono text-sm"
                                                    type={showSecrets.paypal ? "text" : "password"}
                                                />
                                                <button onClick={() => toggleSecretVisibility('paypal')} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                                                    {showSecrets.paypal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                                                <Lock className="w-3 h-3" /> Secret
                                            </label>
                                            <input
                                                value={config.paymentKeys?.paypal?.secret}
                                                onChange={(e) => handleKeyChange('paypal', 'secret', e.target.value)}
                                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded outline-none font-mono text-sm"
                                                type="password"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* === SOCIAL SECTION === */}
                    {activeSection === 'social' && (
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-fade-in">
                            <h3 className="font-bold text-lg mb-4 border-b border-gray-100 pb-2">Social Profiles</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center"><Instagram className="w-5 h-5" /></div>
                                    <div className="flex-1 space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-500">Instagram URL</label>
                                        <input name="instagram" value={config.instagram} onChange={handleChange} placeholder="https://instagram.com/..." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Facebook className="w-5 h-5" /></div>
                                    <div className="flex-1 space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-500">Facebook URL</label>
                                        <input name="facebook" value={config.facebook} onChange={handleChange} placeholder="https://facebook.com/..." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center"><Twitter className="w-5 h-5" /></div>
                                    <div className="flex-1 space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-500">Twitter URL</label>
                                        <input name="twitter" value={config.twitter} onChange={handleChange} placeholder="https://twitter.com/..." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Settings;