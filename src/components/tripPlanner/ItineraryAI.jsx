import { useState } from "react";
import { motion } from "framer-motion";
import { generateItinerary } from "../../services/aiService"; // Cloudflare AI function

const ItineraryAI = ({ destination, startDate, endDate }) => {
    const [loading, setLoading] = useState(false);
    const [itinerary, setItinerary] = useState(null);
    const [error, setError] = useState("");

    const fetchItinerary = async () => {
        setLoading(true);
        setError("");
        try {
            const result = await generateItinerary(destination, startDate, endDate);
            setItinerary(result);
        } catch (err) {
            setError("Failed to generate itinerary. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI-Generated Itinerary
            </h3>
            {loading ? (
                <motion.div
                    className="mt-4 text-blue-600 dark:text-blue-400"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    Generating itinerary...
                </motion.div>
            ) : itinerary ? (
                <div className="mt-4 text-gray-700 dark:text-gray-300">
                    {itinerary.map((item, index) => (
                        <p key={index} className="mb-2">
                            {item}
                        </p>
                    ))}
                </div>
            ) : (
                <button
                    onClick={fetchItinerary}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                    Generate Itinerary
                </button>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default ItineraryAI;
