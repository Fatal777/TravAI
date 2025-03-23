export const generateItinerary = async (destination, startDate, endDate) => {
    try {
        // Validate input dates
        if (!destination || !startDate || !endDate) {
            throw new Error("Please provide destination, start date, and end date.");
        }

        const payload = {
            messages: [
                { 
                    role: 'system', 
                    content: `You are a professional travel planner. Provide detailed daily itineraries with:
- Day-wise structure (Day 1: Date - Location)
- Morning/Afternoon/Evening sections
- Short bullet points with times (e.g., 9:00 AM)
- Key attractions, dining recommendations, and transportation tips
- Avoid markdown formatting
- Keep each day under 300 words`
                },
                { 
                    role: 'user', 
                    content: `Create a ${dayDifference(startDate, endDate)}-day itinerary for ${destination} from ${startDate} to ${endDate}.`
                }
            ]
        };

        console.log("Sending AI request payload:", JSON.stringify(payload, null, 2));

        const response = await fetch("https://small-shape-4144.saadilkal-99.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        console.log("Received response status:", response.status);

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP ${response.status} - ${errorBody}`);
        }

        const data = await response.json();
        console.log("Full response data:", JSON.stringify(data, null, 2));

        if (!data.success) {
            throw new Error(data.error || "Unknown error from AI service");
        }

        // Handle response structure
        return data.response?.result?.response || 
               data.response?.response || 
               data.response || 
               "Could not parse itinerary";

    } catch (error) {
        console.error("Error in generateItinerary:", {
            error: error.message,
            destination,
            startDate,
            endDate
        });
        throw new Error(`Itinerary generation failed: ${error.message}`);
    }
};

// Helper function to calculate day difference
const dayDifference = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};