import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";

const TripsList = () => {
    const [trips, setTrips] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchTrips = async () => {
            if (!currentUser) return;
            try {
                const querySnapshot = await getDocs(collection(db, "users", currentUser.uid, "trips"));
                const tripsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTrips(tripsData);
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };

        fetchTrips();
    }, [currentUser]);

    const handleDeleteTrip = async (tripId) => {
        if (!currentUser) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this trip?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "users", currentUser.uid, "trips", tripId));
            setTrips(trips.filter((trip) => trip.id !== tripId));
            alert("Trip deleted successfully!");
        } catch (error) {
            console.error("Error deleting trip:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Trips</h2>
            {trips.length === 0 ? (
                <p>No trips found. Create a new one!</p>
            ) : (
                <ul className="space-y-4">
                    {trips.map((trip) => (
                        <li key={trip.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{trip.destination}</h3>
                                <p>
                                    {trip.startDate} - {trip.endDate} | {trip.travelers} Traveler(s)
                                </p>
                            </div>
                            <button
                                onClick={() => handleDeleteTrip(trip.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TripsList;
