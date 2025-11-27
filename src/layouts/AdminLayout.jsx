import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, ShoppingBag, ShoppingCart, Users,
    BarChart2, Settings, Bell, Search, LogOut
} from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const menu = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
        { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
        { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
        { icon: Users, label: 'Customers', path: '/admin/customers' },
        { icon: BarChart2, label: 'Analytics', path: '/admin/analytics' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            {/* --- SIDEBAR --- */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
                <div className="p-6 flex items-center justify-center border-b border-gray-100">
                    <h1 className="text-2xl font-serif font-bold tracking-tight">LUXE. Admin</h1>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menu.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                ${isActive(item.path)
                                    ? 'bg-black text-white shadow-md'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg w-full text-sm font-medium transition-colors">
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-20">
                    <div className="relative w-96">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 hover:bg-gray-100 rounded-full">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold">Admin User</p>
                                <p className="text-xs text-gray-500">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-serif">A</div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8 overflow-y-auto flex-1">
                    <Outlet /> {/* This is where the specific pages will load */}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;