import axios from "axios";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // For chat
const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY; // For images

// Existing functions
export const generateItinerary = async (destination, interests, budget) => {
  try {
    const prompt = `Act as a travel expert. Create a detailed 5-day itinerary for ${destination} focusing on ${interests}. Budget: $${budget}. Include hidden gems.`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return "Sorry, I couldn't generate an itinerary. Please try again.";
  }
};

export const fetchUnsplashImage = async (destination, activity) => {
  try {
    const query = `${destination} ${activity} travel`;
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_API_KEY}`
    );

    return response.data.urls.regular; // Get image URL
  } catch (error) {
    console.error("Error fetching Unsplash image:", error);
    return null;
  }
};

// New function for chat responses
export const generateChatResponse = async (message) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{
          role: "user",
          content: `Act as a professional travel advisor. Respond to: "${message}". 
          Keep responses concise and focused on travel-related topics.`
        }],
        temperature: 0.7,
      },
      {
        headers: { 
          Authorization: `Bearer ${OPENAI_API_KEY}`, 
          "Content-Type": "application/json" 
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Chat error:", error);
    throw new Error("Failed to get AI response");
  }
};