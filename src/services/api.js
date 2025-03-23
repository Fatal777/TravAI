export const API = {
  // OpenStreetMap Location Search
  async searchLocations(query) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      return await response.json();
    } catch (error) {
      console.error("Location search error:", error);
      return [];
    }
  },

  // Mock Travel Data
  async getTravelOptions() {
    return {
      flights: [
        { id: 1, airline: "SkyAir", departure: "09:00", price: 299 },
        { id: 2, airline: "GlobalWings", departure: "11:30", price: 349 }
      ],
      hotels: [
        { id: 1, name: "Grand Plaza", rating: "★★★★", price: 199 },
        { id: 2, name: "Harbor View", rating: "★★★", price: 149 }
      ]
    };
  },

  // Mock Mood Board Images
  async getMoodBoardImages(destination) {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      url: `https://source.unsplash.com/random/800x600/?${destination},travel`,
      alt: `Travel inspiration ${i + 1}`
    }));
  }
};