import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Badge,
    Button,
    Loader,
    Notification,
    TileLayout,
    Icon
} from "@progress/kendo-react-all";

const TripPreview = ({ trip }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const getStatusTheme = (status) => {
        switch (status.toLowerCase()) {
            case "upcoming": return "info";
            case "completed": return "success";
            case "cancelled": return "error";
            default: return "neutral";
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-48">
            <Loader size="large" />
        </div>
    );

    if (error) return (
        <Notification
            type={{ style: "error", icon: true }}
            closable
            onClose={() => setError("")}
        >
            {error}
        </Notification>
    );

    return (
        <TileLayoutItem className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center rounded-lg opacity-20"
                style={{ backgroundImage: `url('https://source.unsplash.com/600x400/?${trip.destination},travel')` }}
            />

            {/* Trip Info */}
            <TileLayout orientation="vertical" gap={16} className="relative z-10">
                <div className="flex items-center gap-2">
                    <Icon name="marker-pin" className="text-red-500" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {trip.destination}
                    </h3>
                    <Badge
                        themeColor={getStatusTheme(trip.status)}
                        className="ml-auto"
                    >
                        {trip.status}
                    </Badge>
                </div>

                <TileLayoutItem>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Icon name="calendar" className="text-blue-500" />
                        <span>
                            {new Date(trip.startDate).toLocaleDateString()} -{" "}
                            {new Date(trip.endDate).toLocaleDateString()}
                        </span>
                    </div>
                </TileLayoutItem>

                <TileLayoutItem>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Icon name="clock" className="text-yellow-500" />
                        <span>{trip.duration} days</span>
                    </div>
                </TileLayoutItem>

                <TileLayoutItem className="mt-4">
                    <Button
                        themeColor="primary"
                        className="w-full"
                        onClick={() => navigate(`/view-trip/${trip.id}`)}
                    >
                        <Icon name="globe" className="mr-2" />
                        View Trip Details
                    </Button>
                </TileLayoutItem>
            </TileLayout>
        </TileLayoutItem>
    );
};

export default TripPreview;