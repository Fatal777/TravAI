import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setIsLoading(true);

        try {
            await resetPassword(email);
            setMessage("Check your inbox for further instructions.");
        } catch (err) {
            setError("Failed to reset password. Please try again.");
            console.error(err);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {message}
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand dark:bg-gray-700 dark:text-gray-200"
                    placeholder="Enter your email"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
        text-white bg-brand hover:bg-brandDark focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-brand disabled:opacity-50"
            >
                {isLoading ? "Sending..." : "Reset Password"}
            </button>
        </form>
    );
};

export default ForgotPassword;