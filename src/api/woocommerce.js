import axios from 'axios';

const BASE_URL = import.meta.env.VITE_WORDPRESS_URL;
const CK = import.meta.env.VITE_WC_CONSUMER_KEY;
const CS = import.meta.env.VITE_WC_CONSUMER_SECRET;

// Create an Axios instance with pre-configured Auth
const api = axios.create({
    baseURL: `${BASE_URL}/wp-json/wc/v3`,
    params: {
        consumer_key: CK,
        consumer_secret: CS
    }
});

export const wooCommerceApi = {
    // 1. Fetch All Products
    getProducts: async () => {
        try {
            const response = await api.get('/products');
            // Transform WordPress data to match our App's structure
            return response.data.map(item => ({
                id: item.id,
                name: item.name,
                price: Number(item.price),
                // Get the first image or a placeholder
                image: item.images[0]?.src || 'https://via.placeholder.com/300',
                category: item.categories[0]?.name || 'Uncategorized',
                description: item.description,
                stock: item.stock_quantity
            }));
        } catch (error) {
            console.error("Error fetching WC products:", error);
            return [];
        }
    },

    // 2. Fetch Single Product
    getProduct: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            const item = response.data;
            return {
                id: item.id,
                name: item.name,
                price: Number(item.price),
                image: item.images[0]?.src,
                category: item.categories[0]?.name,
                description: item.description,
            };
        } catch (error) {
            console.error("Error fetching product:", error);
            return null;
        }
    },

    // 3. Create Order
    createOrder: async (orderData) => {
        try {
            const response = await api.post('/orders', orderData);
            return response.data;
        } catch (error) {
            console.error("Error creating WC order:", error);
            throw error;
        }
    }
};