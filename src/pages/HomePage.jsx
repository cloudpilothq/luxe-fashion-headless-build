import React from 'react';
import { useShop } from '../context/ShopContext'; // <--- NEW: Get data from Context
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = ({ setCurrentProduct }) => {
    const navigate = useNavigate();
    const { products, loading } = useShop(); // <--- NEW: Destructure products from context

    // Helper to handle click
    const handleProductClick = (product) => {
        setCurrentProduct(product);
        navigate(`/product/${product.id}`); // Use ID in URL
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="bg-luxe-beige">
            <Hero />

            {/* Browse Categories */}
            <section className="max-w-[1440px] mx-auto px-6 py-16">
                <h2 className="text-2xl font-serif mb-8 uppercase tracking-widest">Browse Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { bg: "bg-[#F0F0F0]", img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop", title: "Shoes" },
                        { bg: "bg-[#EFE8D8]", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop", title: "Bags" },
                        { bg: "bg-[#F4EAEA]", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigj6gAzbr4VW3swd7VXdGZMCe76-5nqwNT-oNzPu7QF-foDFRwdh_a8q267Od9k5BReeQpgDiybauvdDgSI9s-mNS4-cCuy5HSybKV6zdi9Mtp1CxgVCHYEU28GopdUrXJYPmipboNJBTrKTN4R3Q5WuoTJVpAw25Zf-jRsHWcR-wjxVTQW0uOXYvvBzc/s4080/parker-burchfield-tvG4WvjgsEY-unsplash.jpg?q=80&w=800&auto=format&fit=crop", title: "Apparel" },
                        { bg: "bg-[#EAF2F4]", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop", title: "Accessories" },
                    ].map((cat, idx) => (
                        <div
                            key={idx}
                            onClick={() => navigate('/shop')}
                            className={`${cat.bg} h-48 relative overflow-hidden group cursor-pointer flex items-end p-4`}
                        >
                            <img src={cat.img} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-500" alt={cat.title} />
                            <h3 className="relative z-10 font-serif text-lg">{cat.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Split Banner */}
            <section className="max-w-[1440px] mx-auto px-6 pb-16">
                <div className="grid md:grid-cols-2 bg-white">
                    <div className="p-12 md:p-24 flex flex-col justify-center items-start">
                        <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Browse Categories<br />For Men</h2>
                        <Link to="/shop" className="bg-luxe-dark text-white px-8 py-3 text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-colors">
                            Explore Now <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="h-96 md:h-auto bg-[#F4F4F4]">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhk4KNIXatjTmA4yyB_NQecWlqW3UyZo6y8XC7rh2fDVIiU0lUduVXB1P8939fRTdKuQM-buKLRoveMETHfS1mSe-GGlq8TeC_mOPNJGIZcF_ysXGs-d63VBlJJFqGrwmAs_gdHPYB8cwydXc302iu8gY3e3ofoeLTmdIrLDK1YaHqpbU-pBIjz3_wshlE/s5315/maksym-tymchyk-jvo1UJ-eQaU-unsplash.jpg?q=80&w=1287&auto=format&fit=crop" className="w-full h-full object-cover object-top mix-blend-multiply" alt="Men's Fashion" />
                    </div>
                </div>
            </section>

            {/* Sale Section */}
            <section className="max-w-[1440px] mx-auto px-6 py-16">
                <h2 className="text-2xl font-serif mb-8 uppercase tracking-widest">Sale is On!</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[#F3EBE3] h-80 relative overflow-hidden p-8 flex flex-col justify-center group">
                        <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1376&auto=format&fit=crop" className="absolute right-0 top-0 h-full w-1/2 object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" alt="Clearance" />
                        <div className="relative z-10">
                            <h3 className="text-3xl font-serif mb-2">Clearance</h3>
                            <p className="text-sm mb-6">Up to 70% off.</p>
                            <Link to="/sale" className="bg-luxe-dark text-white px-6 py-2 text-xs uppercase tracking-widest inline-block">Shop Sale</Link>
                        </div>
                    </div>
                    <div className="bg-[#F4EAEA] h-80 relative overflow-hidden p-8 flex flex-col justify-center group">
                        <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop" className="absolute right-0 bottom-0 h-3/4 w-1/2 object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" alt="High Boots" />
                        <div className="relative z-10">
                            <h3 className="text-3xl font-serif mb-2">High Boots</h3>
                            <p className="text-sm mb-6">Winter Essentials.</p>
                            <Link to="/shop" className="bg-luxe-dark text-white px-6 py-2 text-xs uppercase tracking-widest inline-block">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Arrivals - USING REAL DATA NOW */}
            <div className="py-16 px-6 max-w-[1440px] mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif uppercase tracking-widest">New Arrivals</h2>
                    <Link to="/shop" className="text-sm underline underline-offset-4">View All</Link>
                </div>

                {/* Show only first 4 items from database */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.slice(0, 4).map(p => (
                        <div key={p.id}>
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Black Mid-Banner */}
            <section className="bg-luxe-dark text-white py-20 px-6 text-center relative overflow-hidden mb-16">
                <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNKwOTL_66u7U6zUTsnGrAGfiasL0pX4GqCPvo36FGeyoxWOhV7v1npUScPdOXLpdFaXtTlh43fv1fw8_RuOlWFYqPgmvWT71krGzMVkAGxTQTvQIVmfPO8wxOP4evdn5xcMU3Q1b8OUujD_xhLb6T-6QYqNPQ8QSlxyHqTA5UVyhYhhRKMY4E30Er7dE/s3000/5398889.jpg?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Banner Background" />
                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    <h2 className="text-4xl md:text-5xl font-serif">End of Season Sale</h2>
                    <p className="text-xl tracking-[0.2em]">UP TO 50% OFF</p>
                    <Link to="/sale" className="bg-white text-luxe-dark px-8 py-3 text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors mt-4 inline-block">
                        Shop The Sale
                    </Link>
                </div>
            </section>

            {/* Newsletter */}
            <div className="bg-luxe-tan py-24 text-center px-6">
                <h3 className="text-3xl font-serif mb-4">Subscribe Our Newsletters</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">Stay updated regarding sales, new products and exclusive offers.</p>
                <div className="flex justify-center max-w-md mx-auto bg-white p-1 pl-4">
                    <input type="email" placeholder="Your email address" className="flex-1 outline-none text-sm" />
                    <button className="bg-luxe-dark text-white px-8 py-3 text-sm uppercase tracking-widest">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;