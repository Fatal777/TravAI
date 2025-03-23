import {
    Scheduler,
    TimelineView
} from "@progress/kendo-react-scheduler";
import { DateRangePicker } from "@progress/kendo-react-dateinputs";
import { Button } from "@progress/kendo-react-buttons";
import { useTrip } from "../../contexts/TripContext";
import { useState, useEffect } from "react";

const ItineraryScheduler = () => {
    const { currentTrip, schedule, updateSchedule } = useTrip();
    const [events, setEvents] = useState(schedule);
    const [newEvent, setNewEvent] = useState({
        title: "",
        start: null,
        end: null
    });

    useEffect(() => {
        setEvents(schedule);
    }, [schedule]);

    const handleAddEvent = () => {
        if (newEvent.title && newEvent.start && newEvent.end) {
            const updatedEvents = [...events, {
                ...newEvent,
                id: Date.now(),
                isAllDay: true
            }];
            updateSchedule(currentTrip.id, updatedEvents);
            setNewEvent({ title: "", start: null, end: null });
        }
    };

    const handleEventUpdate = (e) => {
        const updated = events.map(event =>
            event.id === e.value[0].id ? { ...event, ...e.value[0] } : event
        );
        updateSchedule(currentTrip.id, updated);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-4">Trip Schedule</h3>

            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Activity name"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(p => ({ ...p, title: e.target.value }))}
                    className="flex-1 p-2 bg-gray-700 text-white rounded"
                />
                <DateRangePicker
                    value={{ start: newEvent.start, end: newEvent.end }}
                    onChange={({ value }) => setNewEvent(p => ({
                        ...p,
                        start: value.start,
                        end: value.end
                    }))}
                    className="k-dark"
                />
                <Button
                    onClick={handleAddEvent}
                    themeColor="primary"
                    className="px-4 py-2"
                >
                    Add Activity
                </Button>
            </div>

            <Scheduler
                data={events}
                view={TimelineView}
                style={{ height: "400px" }}
                className="k-dark"
                onDataChange={handleEventUpdate}
                editable={{
                    add: false,
                    remove: true,
                    drag: true,
                    resize: true,
                    edit: true
                }}
            />
        </div>
    );
};

export default ItineraryScheduler;