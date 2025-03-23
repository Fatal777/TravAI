import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../contexts/TripContext";
import { DateRangePicker } from "@progress/kendo-react-dateinputs";
import { Scheduler, WeekView, DayView } from "@progress/kendo-react-scheduler";
import MoodBoard from "../components/tripPlanner/MoodBoard";

const TripPlanner = () => {
    const { addTrip } = useContext(TripContext);
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [events, setEvents] = useState([]);

    const handleCreateTrip = () => {
        if (!dateRange.start || !dateRange.end) return;

        addTrip({
            destination: "New Trip",
            dates: dateRange,
            activities: events
        });
        navigate("/dashboard");
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <DateRangePicker
                value={dateRange}
                onChange={(e) => setDateRange(e.value)}
                className="mb-8 w-full"
            />

            <Scheduler
                data={events}
                onDataChange={(e) => setEvents(e.value)}
                defaultView="week"
                style={{ height: '600px' }}
            >
                <WeekView />
                <DayView />
            </Scheduler>

            <MoodBoard />

            <button
                onClick={handleCreateTrip}
                className="k-button k-primary mt-6"
            >
                Finalize Trip
            </button>
        </div>
    );
};

export default TripPlanner;