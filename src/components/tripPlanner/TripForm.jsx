import { Stepper } from "@progress/kendo-react-layout";
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { useState, useContext } from "react";
import { TripContext } from "../../contexts/TripContext";
import DestinationSelector from "./DestinationSelector";
import { DateSelector, TripScheduler } from "./ItineraryScheduler";
import MoodBoard from "./MoodBoard";

const TripForm = () => {
    const { addTrip } = useContext(TripContext);
    const [step, setStep] = useState(0);
    const [tripData, setTripData] = useState({
        destination: "",
        dates: { start: null, end: null },
        activities: [],
        type: "solo",
        travelers: 1
    });

    const TripTypeSlider = () => (
        <div className="mb-6 pb-4">
            <ButtonGroup width="100%">
                {["Solo", "Couple", "Friends", "Family"].map((type) => (
                    <Button
                        key={type}
                        togglable={true}
                        selected={tripData.type === type.toLowerCase()}
                        onClick={() => setTripData(prev => ({
                            ...prev,
                            type: type.toLowerCase(),
                            travelers: type === "Friends" || type === "Family" ? prev.travelers : 1
                        }))}
                        themeColor={tripData.type === type.toLowerCase() ? "primary" : "base"}
                        className="rounded-full px-6 py-3 whitespace-nowrap"
                    >
                        {type} Trip
                    </Button>
                ))}
            </ButtonGroup>

            {(tripData.type === "friends" || tripData.type === "family") && (
                <div className="mt-4 flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-300">Travelers:</span>
                    <NumericTextBox
                        value={tripData.travelers}
                        min={1}
                        max={20}
                        width="100px"
                        onChange={(e) => setTripData(prev => ({ ...prev, travelers: e.value }))}
                        className="kendo-numeric-textbox"
                    />
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Stepper
                value={step}
                items={[
                    { label: "Destination" },
                    { label: "Dates" },
                    { label: "Details" }
                ]}
                className="mb-8"
            />

            {step === 0 && (
                <>
                    <TripTypeSlider />
                    <DestinationSelector
                        onSelect={destination => setTripData(prev => ({ ...prev, destination }))}
                    />
                </>
            )}

            {step === 1 && (
                <DateSelector
                    dates={tripData.dates}
                    onChange={value => setTripData(prev => ({ ...prev, dates: value }))}
                />
            )}

            {step === 2 && (
                <>
                    <TripScheduler
                        events={tripData.activities}
                        onUpdate={activities => setTripData(prev => ({ ...prev, activities }))}
                    />
                    <MoodBoard destination={tripData.destination} />
                </>
            )}

            <div className="mt-8 flex justify-between">
                <Button
                    disabled={step === 0}
                    onClick={() => setStep(prev => prev - 1)}
                    themeColor="base"
                    className="px-6 py-2"
                >
                    Back
                </Button>

                <Button
                    themeColor="primary"
                    onClick={() => step < 2 ? setStep(prev => prev + 1) : addTrip(tripData)}
                    className="px-6 py-2"
                >
                    {step === 2 ? "Create Trip" : "Next"}
                </Button>
            </div>
        </div>
    );
};

export default TripForm;