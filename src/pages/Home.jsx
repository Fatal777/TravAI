import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import { useAuth } from "../contexts/AuthContext";

// Assets
import HeroPattern from "../assets/hero-pattern.png";
import PlaneIcon from "../assets/airplane.png";
import SuitcaseIcon from "../assets/suitcase.png";

const Home = () => {
    const heroRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        setTimeout(() => {
            if (heroRef.current) {
                heroRef.current.classList.add("show");
            }
        }, 200);
    }, []);

    const handleGetStarted = () => {
        if (user) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="dark:bg-gray-900 dark:text-gray-200 min-h-screen flex flex-col relative overflow-hidden">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 z-0">
                {/* Background Pattern */}
                <img
                    src={HeroPattern}
                    alt="Travel pattern"
                    className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-5"
                />

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-10 w-24 opacity-15 animate-float">
                    <img src={PlaneIcon} alt="Plane" className="w-full rotate-12" />
                </div>
                <div className="absolute bottom-20 right-12 w-20 opacity-15 animate-float-delayed">
                    <img src={SuitcaseIcon} alt="Suitcase" className="w-full -rotate-12" />
                </div>
            </div>

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="fade-in flex-1 flex flex-col items-center justify-center px-4 transition-opacity duration-700 relative z-10"
            >
                <div className="text-center space-y-6 max-w-4xl mx-auto">
                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
                        TravAi
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Your AI-powered travel planning partner - Craft perfect itineraries,
                        discover hidden gems, and collaborate seamlessly
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={handleGetStarted}
                        className="bg-teal-600 hover:bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl mt-8"
                    >
                        Start Your Journey
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-4 py-16 max-w-7xl mx-auto w-full relative z-10">
                {/* Fixed "Why Choose Us?" Heading */}
                <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600 pb-2 leading-tight">
                    Why Choose Us?
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature Cards */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
                            Smart Itinerary Builder
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            AI-generated daily plans with optimized routes, must-see attractions,
                            and local dining recommendations
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
                            Real-time Collaboration
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Plan trips together with friends, share notes, and sync updates instantly
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600">
                            Visual Inspiration
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Create mood boards with AI-generated destination visuals and travel photography
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;