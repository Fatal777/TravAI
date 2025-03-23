import { Dialog } from "@progress/kendo-react-dialogs";

const TripPreviewDialog = ({ trip, onClose }) => {
    return (
        <Dialog onClose={onClose} title={`Trip to ${trip.destination}`}>
            <p><strong>Start:</strong> {trip.startDate}</p>
            <p><strong>End:</strong> {trip.endDate}</p>
            <p><strong>Budget:</strong> ${trip.budget}</p>
        </Dialog>
    );
};

export default TripPreviewDialog;
