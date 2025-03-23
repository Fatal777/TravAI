export const generateItinerary = async (destination, startDate, endDate) => {
    const response = await fetch("https://api.cloudflare.com/your-ai-endpoint", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_CLOUDFLARE_KEY`,
        },
        body: JSON.stringify({ destination, startDate, endDate }),
    });

    if (!response.ok) throw new Error("AI failed to generate an itinerary.");

    return response.json();
};
