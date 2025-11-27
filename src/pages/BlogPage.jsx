import React from 'react';

const BlogPage = ({ setPage }) => (
    <div className="bg-luxe-beige min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-serif mb-6">The Journal</h1>
        <p className="text-gray-500 max-w-md mb-8">
            We are curating stories about fashion, sustainability, and the modern lifestyle.
        </p>
        <div className="border border-luxe-dark p-8 inline-block">
            <span className="uppercase tracking-[0.3em] font-bold text-lg">Coming Soon</span>
        </div>
        <button onClick={() => setPage('home')} className="mt-8 text-sm underline underline-offset-4 hover:text-gray-600">
            Return Home
        </button>
    </div>
);

export default BlogPage;