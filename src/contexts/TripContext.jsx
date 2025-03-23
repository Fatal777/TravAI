import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    doc,
    addDoc,
    deleteDoc,
    onSnapshot,
    updateDoc,
    query,
    where
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [trips, setTrips] = useState([]);
    const [currentTrip, setCurrentTrip] = useState(null);
    const [packingList, setPackingList] = useState([]);
    const [budgetItems, setBudgetItems] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [ratings, setRatings] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all trips for the current user
    useEffect(() => {
        if (!currentUser) {
            setTrips([]);
            setLoading(false);
            return;
        }

        const tripsRef = collection(db, "trips");
        const q = query(tripsRef, where("userId", "==", currentUser.uid));

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const tripsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTrips(tripsData);
                setLoading(false);
                setError(null);
            },
            (error) => {
                console.error("Error fetching trips:", error);
                setError("Failed to load trips. Please try again.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentUser]);

    // Fetch data for a specific trip
    const fetchTripData = (tripId) => {
        if (!currentUser || !tripId) return;

        const tripRef = doc(db, "trips", tripId);
        return onSnapshot(tripRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setCurrentTrip(data);
                // Ensure array types with fallbacks
                setPackingList(Array.isArray(data.packingList) ? data.packingList : []);
                setBudgetItems(Array.isArray(data.budgetItems) ? data.budgetItems : []);
                setSchedule(Array.isArray(data.schedule) ? data.schedule : []);
                setRatings(typeof data.ratings === 'object' ? data.ratings : {});
            }
        });
    };

    // Update nested trip data in Firestore
    const updateNestedTripData = async (tripId, field, data) => {
        try {
            if (!tripId || !field || !data) {
                throw new Error("Invalid arguments for updateNestedTripData");
            }

            await updateDoc(doc(db, "trips", tripId), {
                [field]: Array.isArray(data) ? data : []
            });
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
            setError(`Failed to update ${field}`);
            throw error;
        }
    };

    // Add a new trip
    const addTrip = async (tripData) => {
        try {
            if (!currentUser) {
                throw new Error("User not authenticated.");
            }

            const docRef = await addDoc(collection(db, "trips"), {
                ...tripData,
                userId: currentUser.uid,
                createdAt: new Date().toISOString(),
                packingList: [],
                budgetItems: [],
                schedule: [],
                ratings: {}
            });

            return { id: docRef.id, ...tripData };
        } catch (error) {
            console.error("Error adding trip:", error);
            setError("Failed to add trip. Please try again.");
            throw error;
        }
    };

    // Delete a trip
    const deleteTrip = async (tripId) => {
        try {
            await deleteDoc(doc(db, "trips", tripId));
        } catch (error) {
            console.error("Error deleting trip:", error);
            setError("Failed to delete trip. Please try again.");
            throw error;
        }
    };

    // Update trip details
    const updateTrip = async (tripId, updatedData) => {
        try {
            await updateDoc(doc(db, "trips", tripId), updatedData);
        } catch (error) {
            console.error("Error updating trip:", error);
            setError("Failed to update trip. Please try again.");
            throw error;
        }
    };

    const value = {
        trips,
        currentTrip,
        packingList,
        budgetItems,
        schedule,
        ratings,
        loading,
        error,
        setCurrentTrip,
        fetchTripData,
        addTrip,
        deleteTrip,
        updateTrip,
        updatePackingList: (tripId, items) => updateNestedTripData(tripId, 'packingList', items),
        updateBudget: (tripId, budget) => updateNestedTripData(tripId, 'budgetItems', budget),
        updateSchedule: (tripId, schedule) => updateNestedTripData(tripId, 'schedule', schedule),
        updateRatings: (tripId, ratings) => updateNestedTripData(tripId, 'ratings', ratings)
    };

    return (
        <TripContext.Provider value={value}>
            {children}
        </TripContext.Provider>
    );
};

export const useTrip = () => useContext(TripContext);