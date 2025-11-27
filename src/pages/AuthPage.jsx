import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = getAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                // --- LOGIN LOGIC ---
                const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;

                // Check Role
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const role = docSnap.data().role;
                    if (role === 'admin') navigate('/admin');
                    else navigate('/account'); // Customers go to their profile
                } else {
                    navigate('/'); // Fallback
                }

            } else {
                // --- SIGN UP LOGIC ---
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;

                // Create User Profile in Database
                await setDoc(doc(db, "users", user.uid), {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    role: 'customer', // <--- Default role
                    createdAt: new Date()
                });

                navigate('/account');
            }
        } catch (err) {
            console.error(err);
            setError(err.message.replace("Firebase: ", ""));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">
            <div className="hidden md:block relative bg-[#E8E6E1]">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90" alt="Fashion" />
                <div className="absolute bottom-12 left-12 text-luxe-dark max-w-xs z-10">
                    <h2 className="text-4xl font-serif mb-4">Join the Club.</h2>
                </div>
            </div>

            <div className="flex items-center justify-center bg-luxe-beige p-8 md:p-24">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-serif mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                        <p className="text-gray-500 text-sm">Please enter your details.</p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        {!isLogin && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold tracking-widest">First Name</label>
                                    <input name="firstName" onChange={handleChange} className="w-full bg-transparent border-b border-gray-400 py-3 focus:outline-none" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold tracking-widest">Last Name</label>
                                    <input name="lastName" onChange={handleChange} className="w-full bg-transparent border-b border-gray-400 py-3 focus:outline-none" required />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold tracking-widest">Email Address</label>
                            <input name="email" type="email" onChange={handleChange} className="w-full bg-transparent border-b border-gray-400 py-3 focus:outline-none" required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold tracking-widest">Password</label>
                            <input name="password" type="password" onChange={handleChange} className="w-full bg-transparent border-b border-gray-400 py-3 focus:outline-none" required />
                        </div>

                        {error && <p className="text-red-600 text-sm">{error}</p>}

                        <button disabled={loading} className="w-full bg-luxe-dark text-white py-4 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors">
                            {loading ? "Processing..." : (isLogin ? 'Sign In' : 'Sign Up')}
                        </button>
                    </form>

                    <div className="text-center text-sm">
                        <p className="text-gray-500">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={() => setIsLogin(!isLogin)} className="text-black font-bold underline underline-offset-4">
                                {isLogin ? 'Sign up' : 'Log in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;