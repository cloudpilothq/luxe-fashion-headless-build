import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';

const data = [
    { name: 'Mon', sales: 4000, visitors: 2400 },
    { name: 'Tue', sales: 3000, visitors: 1398 },
    { name: 'Wed', sales: 2000, visitors: 9800 },
    { name: 'Thu', sales: 2780, visitors: 3908 },
    { name: 'Fri', sales: 1890, visitors: 4800 },
    { name: 'Sat', sales: 2390, visitors: 3800 },
    { name: 'Sun', sales: 3490, visitors: 4300 },
];

const StatCard = ({ title, value, trend, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                {trend} <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
        </div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold mt-1 text-gray-900">{value}</p>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Sales" value="$124,500" trend="+12.5%" icon={DollarSign} color="bg-blue-500" />
                <StatCard title="Total Orders" value="1,240" trend="+5.2%" icon={ShoppingBag} color="bg-purple-500" />
                <StatCard title="Total Customers" value="8,540" trend="+2.4%" icon={Users} color="bg-orange-500" />
                <StatCard title="Conversion Rate" value="3.2%" trend="+1.1%" icon={Activity} color="bg-green-500" />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Sales Graph */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold mb-6">Revenue Analytics</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="sales" stroke="#000" fill="#f3f4f6" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold mb-6">Top Selling Products</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold">Luxury Wool Coat</h4>
                                    <p className="text-xs text-gray-500">240 sales</p>
                                </div>
                                <span className="font-bold text-sm">$850</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;