import { useState } from "react";
import { useTrips } from "../contexts/TripContext";
import { useNavigate, useParams } from "react-router-dom";

const EditTrip = () => {
    const { tripId } = useParams();
    const { trips, updateTrip } = useTrips();
    const navigate = useNavigate();

    const trip = trips.find((t) => t.id === tripId);
    if (!trip) return <p className="text-center text-gray-500 mt-10">Trip not found</p>;

    const [formData, setFormData] = useState({ ...trip });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTrip(tripId, formData);
        navigate(`/trip/${tripId}`);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold text-primary mb-4">Edit Trip</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="destination" value={formData.destination} onChange={handleChange} className="w-full p-2 border rounded" required placeholder="Destination" />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="number" name="budget" value={formData.budget} onChange={handleChange} className="w-full p-2 border rounded" required placeholder="Budget" />
                <button type="submit" className="bg-secondary text-white px-4 py-2 rounded">Update Trip</button>
            </form>
        </div>
    );
};

export default EditTrip;
