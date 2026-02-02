import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from 'react-icons/lu';
import { APP_FEATURES } from '../utils/data';
import Modal from '../components/Modal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';


const LandingPage = () => {
    const navigate = useNavigate();
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState('login');

    const handleCTA = () => {
        setOpenAuthModal(true);
    };

    return (
        <>
        <div className='w-full min-h-screen bg-[#fffcef]'>
            {/* 1. HERO WRAPPER */}
            <div className='relative w-full bg-amber-200/10'>
                <div className='container mx-auto px-6 pt-8 pb-20 relative z-10'>
                    <header className='flex justify-between items-center mb-20'>
                        <div className='text-2xl text-black font-bold tracking-tight'>
                            InterviewPrep AI
                        </div>
                        <button
                            className='bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm rounded-full hover:shadow-lg transition-all cursor-pointer border border-white/50 text-white px-8 py-2.5 font-semibold'
                            onClick={() => setOpenAuthModal(true)}
                        >
                            Login / Sign Up
                        </button>
                    </header>

                    <div className='flex flex-col md:flex-row items-start gap-8'>
                        <div className='w-full md:w-1/2'>
                            <div className='flex items-center mb-4'>
                                <div className='flex items-center gap-2 text-[13px] text-amber-700 font-bold bg-amber-100 px-4 py-1.5 rounded-full border border-amber-200'>
                                    <LuSparkles className="animate-pulse" />
                                    AI POWERED
                                </div>
                            </div>
                            <h1 className='text-5xl md:text-5xl text-black font-bold mb-6 leading-[1.1]'>
                                Ace Interviews with
                                <br />
                                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#FF9324] via-[#FCD760] to-[#FF9324] bg-[length:200%_auto] animate-text-shine'>
                                    AI-Powered
                                </span>{" "} 
                                Learning
                            </h1>
                        </div>
                        <div className='w-full md:w-1/2 md:pt-4'>
                            <p className='text-lg text-gray-700 mb-8 max-w-lg leading-relaxed'>
                                Get role-specific questions, expand answers when you need them, and dive deeper into concepts.
                            </p>
                            <button
                                className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-amber-600 transition-all shadow-xl active:scale-95"
                                onClick={handleCTA}
                            >
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. IMAGE SECTION (Extracted from the hero div) */}
            <div className='relative z-20 flex justify-center px-4 mt-16 mb-20'>
                <div className='relative group max-w-5xl w-full'>
                    <div className='absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000'></div>
                    <img 
                        src="/hero-img.png" 
                        alt="Dashboard Preview" 
                        className='relative w-full rounded-2xl shadow-2xl border border-white/20' 
                    />
                </div>
            </div>

            {/* 3. FEATURES SECTION (Now separate and visible) */}
            <div className='w-full bg-[#FFFCEF]'>
                <div className='container mx-auto px-4 py-20'>
                    <section>
                        <h2 className='text-4xl font-bold text-center mb-12 text-gray-900'>
                            Features That Make You Shine
                        </h2>
                        
                        <div className='flex flex-col items-center gap-8'>
                                {/* first 3 cards  */}

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                                {
                                    APP_FEATURES.slice(0,3).map((feature) => (
                                    <div key={feature.id} className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100'>
                                        <h3 className='text-base font-semibold mb-3'>
                                        {feature.title}
                                        </h3>
                                        <p className='text-gray-600'>{feature.description}</p>
                                    </div>
                                    ))
                                }

                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                                {
                                    APP_FEATURES.slice(3).map((feature) => (
                                    <div key={feature.id} className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100'>
                                        <h3 className='text-base font-semibold mb-3'>
                                        {feature.title}
                                        </h3>
                                        <p className='text-gray-600'>{feature.description}</p>
                                    </div>
                                    ))
                                }

                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <div className="text-center backdrop-blur-md text-sm text-gray-600 mt-5 bg-gray-50 p-5 border-gray-50 border-t">
            © {new Date().getFullYear()} AKASH KATTI . All rights reserved.
            </div>

        </div>

        <Modal isOpen={openAuthModal} onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage('login');
                }}
                    hideHeader>
                    <div>
                    {
                        currentPage === "login" && (
                        <Login setCurrentPage={setCurrentPage} />
                        )
                    }
                    {
                        currentPage === "signup" && (
                        <SignUp setCurrentPage={setCurrentPage} />
                        )
                    }
                    </div>
        </Modal>

        </>

       
    );
}

export default LandingPage;