import { useContext } from "react";
import { TripContext } from "../contexts/TripContext";
import { motion } from "framer-motion";

const MyTrips = () => {
    const { trips, deleteTrip } = useContext(TripContext);

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-6">My Trips</h1>

            {trips.length === 0 ? (
                <p className="text-gray-400">No trips found. Start by creating a trip!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip) => (
                        <motion.div
                            key={trip.id}
                            className="bg-gray-800 rounded-lg p-4 shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <img
                                src={trip.backgroundImage || "/fallback.jpg"} // Fallback image
                                alt={trip.destination}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-white">{trip.destination}</h3>
                            <p className="text-gray-400 text-sm mb-2">
                                {trip.startDate} - {trip.endDate}
                            </p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-blue-400 text-sm">{trip.tripType}</span>
                                <button
                                    onClick={() => deleteTrip(trip.id)}
                                    className="text-red-500 hover:text-red-400 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTrips;