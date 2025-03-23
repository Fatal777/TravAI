import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const RegisterForm = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await signup(formData.email, formData.password);
            navigate("/dashboard");
        } catch (err) {
            setError("Failed to create an account.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-2"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-2"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-4"
                        required
                    />
                    <button type="submit" className="w-full bg-brand text-white py-2 rounded hover:bg-brandDark transition">
                        Create Account
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                    Already have an account? <Link to="/login" className="text-brand hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
