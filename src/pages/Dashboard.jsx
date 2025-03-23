import { useState, useEffect, useContext } from "react";
import { TripContext } from "../contexts/TripContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Chatbox from "../components/common/Chatbox";
import Loading from "../components/common/Loading";
import { motion } from "framer-motion";
import axios from "axios";
import { UserIcon } from "@heroicons/react/24/outline";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const PEXELS_URL = "https://api.pexels.com/v1/search?query=travel&per_page=15";

const Dashboard = () => {
    const { trips, loading: tripsLoading, error } = useContext(TripContext);
    const navigate = useNavigate();
    const [backgroundImages, setBackgroundImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imagesLoading, setImagesLoading] = useState(true);

    // Fetch background images
    useEffect(() => {
        const fetchRandomImage = async () => {
            try {
                const res = await axios.get(PEXELS_URL, {
                    headers: { Authorization: PEXELS_API_KEY }
                });

                if (res.data?.photos?.length > 0) {
                    const images = res.data.photos.map(photo => photo.src.landscape);
                    setBackgroundImages(images);
                    setCurrentImageIndex(Math.floor(Math.random() * images.length));
                }
            } catch (error) {
                console.error("Error fetching background images:", error);
                setBackgroundImages(["/fallback.jpg"]);
            } finally {
                setImagesLoading(false);
            }
        };

        fetchRandomImage();
    }, []);

    // Background image rotation
    useEffect(() => {
        if (backgroundImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex(prev => (prev + 1) % backgroundImages.length);
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [backgroundImages]);

    // Handle trip click
    const handleTripClick = (tripId) => {
        navigate(`/trip/${tripId}`);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <motion.div
                className="flex-1 flex flex-col items-center px-6 bg-cover bg-center relative"
                style={{
                    backgroundImage: `url(${backgroundImages[currentImageIndex] || "/fallback.jpg"})`,
                    transition: "background-image 1s ease-in-out",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                <motion.div
                    className="relative z-10 w-full max-w-4xl p-6 mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Your Trips
                        </h2>
                        <button
                            onClick={() => navigate("/create-trip")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                        >
                            + Create Trip
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
                            {error}
                        </div>
                    )}

                    {tripsLoading || imagesLoading ? (
                        <Loading message={tripsLoading ? "Loading your trips..." : "Preparing your adventure..."} />
                    ) : trips.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-300 text-lg mb-4">
                                No trips found. Start by creating a new adventure!
                            </p>
                            <button
                                onClick={() => navigate("/create-trip")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                            >
                                Create Your First Trip
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trips.map((trip) => (
                                <motion.div
                                    key={trip.id}
                                    className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleTripClick(trip.id)}
                                >
                                    <img
                                        src={trip.backgroundImage || "/fallback.jpg"}
                                        alt={trip.destination}
                                        className="w-full h-40 object-cover rounded-md"
                                        onError={(e) => {
                                            e.target.src = "/fallback.jpg";
                                        }}
                                    />
                                    <div className="mt-4">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                            {trip.destination}
                                        </h3>
                                        {trip.startDate && trip.endDate && (
                                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                                                {new Date(trip.startDate).toLocaleDateString()} -{" "}
                                                {new Date(trip.endDate).toLocaleDateString()}
                                            </p>
                                        )}
                                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                                            {trip.tripType === 'group' ?
                                                `${trip.numTravelers || 0} travelers` :
                                                'Solo trip'
                                            }
                                        </p>
                                        <div className="flex -space-x-2 mt-2">
                                            {(trip.collaborators || []).map((user, index) => (
                                                <div key={index} className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                                    {user.avatar ? (
                                                        <img
                                                            src={user.avatar}
                                                            alt={user.name || "Collaborator"}
                                                            className="h-full w-full rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                <Chatbox className="fixed bottom-6 right-6 z-50" />
            </motion.div>
        </div>
    );
};

export default Dashboard;