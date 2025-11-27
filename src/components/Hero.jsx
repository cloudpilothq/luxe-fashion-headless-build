import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext'; // Import context

const Hero = () => {
    const { siteConfig } = useShop(); // Get the dynamic settings

    return (
        <section className="max-w-[1440px] mx-auto px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">

                {/* Main Big Banner - NOW DYNAMIC */}
                <div className="md:col-span-7 bg-[#F3EBE3] relative overflow-hidden p-8 md:p-12 flex flex-col justify-center group">
                    <img
                        src={siteConfig.heroImage || "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOsgXTO3xukQxnsb68CpK0gq9MCt5HFfFFygLHSWC4Um1UxvyfGOUa06OGfnOxJbEjfN5GMTOxvVrysiMe9-f2TL-ykg7iReqwpPOlSRs_Dz8sYeTrOsD4_h3vOO3Itt0pXmBEBSj1neZ33wJvXIfCWkrrJWJBuZqBeHLwyukycBsO-2JxNhq1lyiHtl8/s5000/glassesshop-gnmpNEdMHWs-unsplash.jpg?q=80"}
                        alt="Hero Banner"
                        className="absolute right-0 bottom-0 h-[110%] object-cover object-bottom mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="relative z-10 max-w-md">
                        {/* Use values from Admin */}
                        <h2 className="text-6xl md:text-8xl font-serif leading-none mb-4 whitespace-pre-wrap">
                            {siteConfig.heroTitle || "Elegance Redefined."}
                        </h2>
                        <p className="text-lg mb-8 max-w-xs font-medium text-gray-800">
                            {siteConfig.heroSubtitle || "Discover our new collection."}
                        </p>

                        <Link to="/shop" className="bg-luxe-dark text-white px-8 py-3 text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-colors w-fit">
                            Shop Now <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Right Side Column (Keep static or make dynamic later) */}
                <div className="md:col-span-5 flex flex-col gap-6">
                    <div className="bg-[#F4EAEA] flex-1 relative overflow-hidden p-8 flex flex-col justify-center group">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgxH9zt7RCvEcOZ04jfAHdkf2er1JTeob_JD_JwJfCxqKmNaYmEkcurpVFtm0_ME16m0OXuITr6WsPkYUuH-upg0e9syAhfkYI7WsuUl92t3Cg0zikAY_y2AHCBIwsHE0CeL9dLHKrZEL-vfKX1Nfo36iSs6p7jlOAiBOtIn8GLQcpy5osYWJZRSFHqYCw/s6000/creativitymedia-vershka-j-QNV7XS0O4-unsplash.jpg?q=80&w=1374&auto=format&fit=crop" className="absolute right-0 top-0 h-full w-1/2 object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-serif mb-2">Exclusive Offer</h3>
                            <p className="text-sm mb-6">Get 20% off on swimwear.</p>
                            <Link to="/sale" className="underline text-sm uppercase tracking-widest underline-offset-4">View Details</Link>
                        </div>
                    </div>
                    <div className="bg-[#EAF2F4] flex-1 relative overflow-hidden p-8 flex flex-col justify-center group">
                        <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1480&auto=format&fit=crop" className="absolute right-4 bottom-4 h-3/4 object-contain mix-blend-multiply transition-transform duration-700 group-hover:-rotate-12" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-serif mb-2">Accessories</h3>
                            <p className="text-sm mb-6">Complete your look.</p>
                            <Link to="/shop" className="bg-luxe-dark text-white px-6 py-2 text-xs uppercase tracking-widest inline-block">Browse</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;