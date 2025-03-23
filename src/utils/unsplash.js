const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const fetchTravelImages = async () => {
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?query=travel&count=5&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch images");
        return await response.json();
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
};
