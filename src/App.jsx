import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useShop } from './context/ShopContext'; // We use the context hook now

// Layouts & Components
import AdminLayout from './layouts/AdminLayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetails from './pages/ProductDetails';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import SalePage from './pages/SalePage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';
import FAQPage from './pages/FAQPage';
import StoreLocator from './pages/StoreLocator';
import GiftCardPage from './pages/GiftCardPage';
import AccountPage from './pages/AccountPage';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';

const StoreLayout = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="font-sans text-gray-900 antialiased bg-luxe-beige min-h-screen selection:bg-luxe-dark selection:text-white">
      <Navbar /> {/* No props needed! */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default function App() {
  const { user, loading } = useShop(); // Check global user status

  if (loading) return <div className="h-screen flex items-center justify-center">Loading Luxe...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC STORE */}
        <Route element={<StoreLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/sale" element={<SalePage />} />
          {/* Note: ProductDetails needs to read ID from URL now */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/store" element={<StoreLocator />} />
          <Route path="/giftcard" element={<GiftCardPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/shipping" element={<PolicyPage type="shipping" />} />
          <Route path="/returns" element={<PolicyPage type="returns" />} />
        </Route>

        {/* ADMIN DASHBOARD (Protected) */}
        <Route path="/admin" element={user ? <AdminLayout /> : <AuthPage />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}