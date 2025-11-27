import React from 'react';

const PolicyPage = ({ type }) => {
    const content = {
        shipping: {
            title: "Shipping Policy",
            text: (
                <>
                    <p>Orders are processed within 2-3 business days. We offer complimentary shipping on all orders over $500.</p>
                    <h3 className="text-xl font-serif mt-6 mb-2">International Shipping</h3>
                    <p>We ship worldwide via DHL Express. Customs duties and taxes are calculated at checkout.</p>
                </>
            )
        },
        returns: {
            title: "Returns & Exchanges",
            text: (
                <>
                    <p>We accept returns within 30 days of delivery. Items must be unworn, unwashed, and with original tags attached.</p>
                    <h3 className="text-xl font-serif mt-6 mb-2">How to Return</h3>
                    <p>Visit our Returns Portal to generate a prepaid shipping label. Refunds are processed to the original payment method within 5-7 business days of receipt.</p>
                </>
            )
        }
    };

    const data = content[type] || content.shipping;

    return (
        <div className="bg-luxe-beige min-h-screen py-20 px-6">
            <div className="max-w-2xl mx-auto bg-white p-12 shadow-sm border border-gray-100">
                <h1 className="text-4xl font-serif mb-8 text-center">{data.title}</h1>
                <div className="prose prose-stone leading-relaxed text-gray-600">
                    {data.text}
                </div>
            </div>
        </div>
    );
};

export default PolicyPage;