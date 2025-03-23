import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { BoltIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import HeroPattern from "../assets/hero-pattern.png"; // Import the background pattern

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (userDetails.password !== userDetails.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            await register(userDetails.email, userDetails.password, userDetails.fullName, userDetails.username);
            navigate("/dashboard");
        } catch (error) {
            setError("Registration failed: " + error.message);
        }
        setIsLoading(false);
    };

    const handleFacebookSignup = () => {
        window.location.href = "https://travel-companion-d15dd.firebaseapp.com/__/auth/handler";
    };

    const handleGoogleSignup = () => {
        alert("Google sign up coming soon!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <img
                src={HeroPattern}
                alt="Travel pattern"
                className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-5"
            />

            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 relative z-10">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
                    Sign Up for TravAi
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={userDetails.fullName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand dark:bg-gray-700 dark:text-gray-200"
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={userDetails.username}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand dark:bg-gray-700 dark:text-gray-200"
                            required
                            placeholder="Choose a username"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand dark:bg-gray-700 dark:text-gray-200"
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand dark:bg-gray-700 dark:text-gray-200"
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={userDetails.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand dark:bg-gray-700 dark:text-gray-200"
                            required
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
            text-white bg-brand hover:bg-brandDark focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-brand disabled:opacity-50"
                    >
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Or sign up with</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleGoogleSignup}
                            className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <BoltIcon className="h-6 w-6 text-yellow-500" />
                            <span>Google</span>
                        </button>
                        <button
                            onClick={handleFacebookSignup}
                            className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <UserGroupIcon className="h-6 w-6 text-blue-600" />
                            <span>Facebook</span>
                        </button>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already registered?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-brand hover:text-brandDark"
                        >
                            Log in now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;