import React from 'react';
import { Eye, Search } from 'lucide-react';

const Orders = () => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Processing': return 'bg-blue-100 text-blue-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Orders</h2>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input type="text" placeholder="Search orders by ID, name..." className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm" />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase">
                        <tr>
                            <th className="p-4 font-medium">Order ID</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium">Customer</th>
                            <th className="p-4 font-medium">Total</th>
                            <th className="p-4 font-medium">Items</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-bold">#ORD-2025-{i}</td>
                                <td className="p-4 text-gray-500">Oct 24, 2025</td>
                                <td className="p-4">Jane Doe</td>
                                <td className="p-4 font-medium">$420.00</td>
                                <td className="p-4 text-gray-500">3 items</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(i % 2 === 0 ? 'Delivered' : 'Pending')}`}>
                                        {i % 2 === 0 ? 'Delivered' : 'Pending'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-gray-400 hover:text-black flex items-center gap-1 ml-auto">
                                        <Eye className="w-4 h-4" /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;