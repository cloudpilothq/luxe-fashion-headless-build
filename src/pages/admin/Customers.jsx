import React from 'react';
import { Search, MoreHorizontal, Mail, Phone, MapPin } from 'lucide-react';

const CUSTOMERS = [
    { id: 1, name: 'Jane Cooper', email: 'jane@example.com', orders: 14, spent: '$2,400.00', location: 'New York, USA', status: 'Active' },
    { id: 2, name: 'Wade Warren', email: 'wade@example.com', orders: 8, spent: '$850.00', location: 'London, UK', status: 'Active' },
    { id: 3, name: 'Esther Howard', email: 'esther@example.com', orders: 1, spent: '$120.00', location: 'Berlin, DE', status: 'Inactive' },
    { id: 4, name: 'Cameron Williamson', email: 'cam@example.com', orders: 25, spent: '$4,250.00', location: 'Paris, FR', status: 'Active' },
    { id: 5, name: 'Brooklyn Simmons', email: 'brooklyn@example.com', orders: 2, spent: '$230.00', location: 'Tokyo, JP', status: 'Active' },
];

const Customers = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Customers</h2>
                <div className="flex gap-2">
                    <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Export CSV</button>
                    <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">Add Customer</button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 max-w-md">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input type="text" placeholder="Search by name, email, or location..." className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-black" />
                </div>
            </div>

            {/* Customer Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase">
                        <tr>
                            <th className="p-4 font-medium">Customer</th>
                            <th className="p-4 font-medium">Contact</th>
                            <th className="p-4 font-medium">Location</th>
                            <th className="p-4 font-medium">Orders</th>
                            <th className="p-4 font-medium">Total Spent</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {CUSTOMERS.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-luxe-dark text-white flex items-center justify-center font-bold font-serif">
                                            {c.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{c.name}</p>
                                            <p className="text-xs text-gray-500">ID: #{c.id + 1000}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Mail className="w-3 h-3" /> {c.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Phone className="w-3 h-3" /> +1 (555) 000-0000
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-500 flex items-center gap-2">
                                    <MapPin className="w-3 h-3" /> {c.location}
                                </td>
                                <td className="p-4 font-medium">{c.orders} Orders</td>
                                <td className="p-4 font-bold text-gray-900">{c.spent}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${c.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-gray-400 hover:text-black p-2 hover:bg-gray-100 rounded-full transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination (Mock) */}
            <div className="flex justify-between items-center text-sm text-gray-500">
                <p>Showing 1-5 of 1,240 customers</p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border rounded hover:bg-gray-50">Previous</button>
                    <button className="px-4 py-2 border rounded hover:bg-gray-50">Next</button>
                </div>
            </div>
        </div>
    );
};

export default Customers;