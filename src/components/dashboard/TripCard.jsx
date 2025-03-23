import { useContext } from "react";
import { TripContext } from "../contexts/TripContext";
import { Link } from "react-router-dom";
import { ClockIcon, UserGroupIcon, MapPinIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline";

const TripCard = ({ trip }) => {
    const { deleteTrip } = useContext(TripContext);

    return (
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
                <img
                    src={`https://source.unsplash.com/random/800x600/?${trip.destination}`}
                    alt={trip.destination}
                    className="w-full h-48 object-cover rounded-t-xl"
                />
                <span className="absolute top-2 right-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm text-brand dark:text-brandDark">
                    {trip.status}
                </span>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{trip.destination}</h3>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    <span>{trip.dates}</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    <span>{trip.travelers} travelers</span>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
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
                    <div className="flex items-center gap-2">
                        <Link
                            to={`/trip/${trip.id}`}
                            className="flex items-center text-brand dark:text-brandDark hover:underline"
                        >
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            View Details
                        </Link>
                        <button
                            onClick={() => deleteTrip(trip.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripCard;