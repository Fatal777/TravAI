import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { BoltIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import HeroPattern from "../assets/hero-pattern.png"; // Import the background pattern

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await login(credentials.email, credentials.password);
            navigate("/dashboard");
        } catch (error) {
            setError("Login failed: " + error.message);
        }
        setIsLoading(false);
    };

    const handleFacebookLogin = () => {
        window.location.href = "https://travel-companion-d15dd.firebaseapp.com/__/auth/handler";
    };

    const handleGoogleLogin = () => {
        alert("Google login coming soon!");
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
                    Login to Travel Companion
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
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
                            value={credentials.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand dark:bg-gray-700 dark:text-gray-200"
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
            text-white bg-brand hover:bg-brandDark focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-brand disabled:opacity-50"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Or login with</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <BoltIcon className="h-6 w-6 text-yellow-500" />
                            <span>Google</span>
                        </button>
                        <button
                            onClick={handleFacebookLogin}
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
                        Not registered yet?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-brand hover:text-brandDark"
                        >
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;