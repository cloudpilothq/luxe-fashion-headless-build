import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex justify-between items-center">
                <h3 className="font-serif text-lg">{question}</h3>
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </div>
            {isOpen && <p className="mt-4 text-gray-500 leading-relaxed text-sm animate-fade-in">{answer}</p>}
        </div>
    );
};

const FAQPage = () => (
    <div className="bg-luxe-beige min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-serif mb-2 text-center">Frequently Asked Questions</h1>
            <p className="text-center text-gray-500 mb-12">Answers to your most common questions.</p>

            <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100">
                <FAQItem question="How do I track my order?" answer="Once your order ships, you will receive a confirmation email with a tracking number and link." />
                <FAQItem question="Do you offer international shipping?" answer="Yes, we ship to over 100 countries worldwide via DHL Express." />
                <FAQItem question="What is your return policy?" answer="We accept returns within 30 days of purchase for a full refund." />
                <FAQItem question="Are your products sustainable?" answer="Yes, we prioritize eco-friendly materials and ethical manufacturing processes." />
            </div>
        </div>
    </div>
);

export default FAQPage;