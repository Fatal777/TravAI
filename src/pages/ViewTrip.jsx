import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTrip } from "../contexts/TripContext";
import BudgetGrid from "../components/dashboard/BudgetGrid";
import PackingList from "../components/dashboard/PackingList";
import ItineraryScheduler from "../components/tripPlanner/ItineraryScheduler";
import Loading from "../components/common/Loading";
import Notification from "../components/common/Notification";
import ErrorBoundary from "../components/common/ErrorBoundary";

const ViewTrip = () => {
    const { tripId } = useParams();
    const {
        currentTrip,
        packingList,
        budgetItems,
        schedule,
        fetchTripData,
        loading,
        error
    } = useTrip();

    useEffect(() => {
        if (tripId) {
            const unsubscribe = fetchTripData(tripId);
            return () => unsubscribe && unsubscribe();
        }
    }, [tripId, fetchTripData]);

    if (loading) return <Loading />;
    if (error) return <Notification message={error} type="error" />;
    if (!currentTrip) return <div className="text-center p-6">Trip not found</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
            <ErrorBoundary>
                <div className="space-y-6">
                    <ItineraryScheduler />
                </div>
            </ErrorBoundary>

            <ErrorBoundary>
                <div className="space-y-6">
                    <BudgetGrid />
                </div>
            </ErrorBoundary>

            <ErrorBoundary>
                <div className="space-y-6">
                    <PackingList />
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default ViewTrip;