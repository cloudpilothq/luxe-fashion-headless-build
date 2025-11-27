import React, { createContext, useContext, useState, useEffect } from 'react';
import { wooCommerceApi } from '../api/woocommerce';

const ShopContext = createContext();

// HMR FIX: Use a named function instead of an arrow function
export function ShopProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // ROBUST DEFAULT CONFIG
    const [siteConfig, setSiteConfig] = useState({
        storeName: 'LUXE',
        heroTitle: 'New Collection',
        heroSubtitle: 'Spring/Summer 2025',
        heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
        contactEmail: 'support@luxe.com'
    });

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("luxeCart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // --- 1. FETCH DATA FROM WORDPRESS ---
    useEffect(() => {
        const fetchData = async () => {
            console.log("Context: Starting Data Fetch...");
            setLoading(true);

            try {
                const wpProducts = await wooCommerceApi.getProducts();
                console.log("Context: Fetched Products:", wpProducts);

                if (wpProducts && wpProducts.length > 0) {
                    setProducts(wpProducts);
                } else {
                    console.warn("Context: No products returned. Check CORS/Permalinks.");
                }
            } catch (err) {
                console.error("Context: Critical Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("luxeCart", JSON.stringify(cart));
    }, [cart]);

    // --- 2. CART ACTIONS ---
    const addToCart = (product, size, color) => {
        setCart((prev) => {
            const existing = prev.find(item => item.id === product.id && item.size === size && item.color === color);
            if (existing) {
                return prev.map(item => (item.id === product.id && item.size === size && item.color === color) ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, size, color, quantity: 1 }];
        });
    };

    const getCartTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // --- 3. PLACE ORDER (NEW) ---
    const placeOrder = async (customerData) => {
        try {
            // Format cart items for WooCommerce
            const line_items = cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }));

            const orderData = {
                payment_method: "cod", // Default to Cash on Delivery for testing
                payment_method_title: "Cash on Delivery",
                set_paid: false,
                billing: {
                    first_name: customerData.firstName,
                    last_name: customerData.lastName,
                    address_1: customerData.address,
                    city: customerData.city,
                    state: "",
                    postcode: customerData.zip,
                    country: "US",
                    email: customerData.email,
                    phone: customerData.phone
                },
                line_items: line_items
            };

            console.log("Sending Order to WordPress:", orderData);
            const response = await wooCommerceApi.createOrder(orderData);

            // Clear cart on success
            setCart([]);
            return response;
        } catch (error) {
            console.error("Context: Failed to place order", error);
            throw error;
        }
    };

    return (
        <ShopContext.Provider value={{
            products, loading, user, cart,
            siteConfig,
            addToCart, getCartTotal, placeOrder // <--- Exposed placeOrder
        }}>
            {children}
        </ShopContext.Provider>
    );
}

// HMR FIX
export function useShop() {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error("useShop must be used within a ShopProvider");
    }
    return context;
}