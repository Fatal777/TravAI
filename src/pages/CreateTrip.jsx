import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../contexts/TripContext";
import Notification from "../components/common/Notification";
import Loading from "../components/common/Loading";
import Sidebar from "../components/common/Sidebar";
import { motion } from "framer-motion";
import axios from "axios";
import debounce from "../utils/debounce";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const PEXELS_URL = "https://api.pexels.com/v1/search?query=travel&per_page=10";
const GEO_API_URL = "https://restcountries.com/v3.1/name/";

const CreateTrip = () => {
    const navigate = useNavigate();
    const { addTrip } = useContext(TripContext);

    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [tripType, setTripType] = useState("solo");
    const [numTravelers, setNumTravelers] = useState(1);
    const [backgroundImages, setBackgroundImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Fetch travel images
    useEffect(() => {
        const fetchBackgroundImages = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await axios.get(PEXELS_URL, {
                    headers: { Authorization: PEXELS_API_KEY }
                });

                if (res.data.photos.length > 0) {
                    const images = res.data.photos.map(photo => photo.src.large);
                    setBackgroundImages(images);
                    setCurrentImageIndex(Math.floor(Math.random() * images.length));
                } else {
                    setBackgroundImages(["/fallback.jpg"]);
                }
            } catch (err) {
                setBackgroundImages(["/fallback.jpg"]);
                setError("Failed to load background images.");
            } finally {
                setLoading(false);
            }
        };

        fetchBackgroundImages();
    }, []);

    // Change images every 10s
    useEffect(() => {
        if (backgroundImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [backgroundImages]);

    // Debounced API call for location suggestions
    const fetchLocations = debounce(async (query) => {
        if (!query) return setLocationSuggestions([]);

        try {
            const res = await axios.get(`${GEO_API_URL}${query}`);
            setLocationSuggestions(res.data.map((country) => country.name.common));
            setShowSuggestions(true);
        } catch (error) {
            setLocationSuggestions([]);
        }
    }, 300);

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
        fetchLocations(e.target.value);
    };

    const handleSuggestionClick = (location) => {
        setDestination(location);
        setShowSuggestions(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!destination || !startDate || !endDate) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            // Wait for Firestore write to complete
            await addTrip({  // Remove manual ID: Firestore auto-generates
                destination,
                startDate,
                endDate,
                tripType,
                numTravelers,
                backgroundImage: backgroundImages[currentImageIndex] || "/fallback.jpg"
            });

            // Navigate AFTER successful write
            navigate("/dashboard");
        } catch (error) {
            setError("Failed to create trip: " + error.message);
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <motion.div
                className="flex-1 flex flex-col justify-center items-center px-6 bg-cover bg-center relative"
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
                    className="relative z-10 w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Plan Your Trip</h2>

                    {error && <Notification message={error} type="error" onClose={() => setError("")} />}
                    {loading && <Loading />}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Destination Input with Autocomplete */}
                        <div className="relative">
                            <label className="block text-gray-700 font-medium">Destination</label>
                            <input
                                type="text"
                                value={destination}
                                onChange={handleDestinationChange}
                                onFocus={() => setShowSuggestions(true)}
                                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                                placeholder="Enter destination..."
                            />
                            {showSuggestions && locationSuggestions.length > 0 && (
                                <ul className="absolute z-50 mt-2 bg-white border rounded-lg shadow-md max-h-40 overflow-y-auto w-full">
                                    {locationSuggestions.map((loc, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSuggestionClick(loc)}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                        >
                                            {loc}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-medium">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Traveler Type</label>
                            <select
                                value={tripType}
                                onChange={(e) => setTripType(e.target.value)}
                                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                            >
                                <option value="solo">Solo</option>
                                <option value="couple">Couple</option>
                                <option value="group">Group</option>
                            </select>
                        </div>

                        {tripType === "group" && (
                            <div>
                                <label className="block text-gray-700 font-medium">Number of Travelers</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={numTravelers}
                                    onChange={(e) => setNumTravelers(e.target.value)}
                                    className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                                />
                            </div>
                        )}

                        <motion.button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Create Trip
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CreateTrip;
