import React from 'react';

const GiftCardPage = ({ addToCart }) => (
    <div className="bg-luxe-beige min-h-screen py-20 px-6 flex items-center justify-center">
        <div className="bg-white max-w-4xl w-full grid md:grid-cols-2 shadow-lg overflow-hidden">
            <div className="bg-luxe-dark p-12 text-white flex flex-col justify-between aspect-square relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h2 className="text-3xl font-serif z-10">LUXE.</h2>
                <div className="z-10">
                    <p className="uppercase tracking-[0.3em] text-sm opacity-70">Gift Card</p>
                </div>
            </div>

            <div className="p-12 flex flex-col justify-center space-y-8">
                <div>
                    <h1 className="text-3xl font-serif mb-2">Digital Gift Card</h1>
                    <p className="text-gray-500 text-sm">The perfect gift for the modern individual. Delivered instantly via email.</p>
                </div>

                <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-3">Select Amount</p>
                    <div className="grid grid-cols-3 gap-3">
                        {['$50', '$100', '$200', '$500', '$1000'].map(amt => (
                            <button key={amt} className="border border-gray-200 py-3 text-sm hover:border-black hover:bg-black hover:text-white transition-all">
                                {amt}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={addToCart} className="w-full bg-luxe-dark text-white py-4 uppercase tracking-widest hover:bg-gray-800 transition-colors">
                    Add to Bag
                </button>
            </div>
        </div>
    </div>
);

export default GiftCardPage;