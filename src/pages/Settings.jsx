import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ProgressBar } from "@progress/kendo-react-progressbars";

const Settings = () => {
    const { currentUser, logout, updateProfile } = useAuth();
    const [profileData, setProfileData] = useState({ displayName: "", email: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [storageUsed] = useState(65); // Example storage usage
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setProfileData({
                displayName: currentUser.displayName || "",
                email: currentUser.email || ""
            });
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await updateProfile({
                displayName: profileData.displayName
            });
            setSuccess("Profile updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(""), 5000);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>
            )}

            {/* Storage Usage Section */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Storage Usage</h2>
                <ProgressBar value={storageUsed} />
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {storageUsed}% of 100GB used
                </p>
            </div>

            {/* Profile Update Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-medium">Name</label>
                    <input
                        type="text"
                        value={profileData.displayName}
                        onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Email</label>
                    <input
                        type="email"
                        value={profileData.email}
                        className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
                        readOnly
                        disabled
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;