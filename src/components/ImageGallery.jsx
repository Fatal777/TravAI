import { useState } from "react";
import { searchImages } from "../utils/unsplash";  // ✅ Corrected import

const ImageGallery = () => {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const results = await searchImages(query);
        setImages(results);
        setLoading(false);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Search Travel Images</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    placeholder="Search destination..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 border rounded mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Search</button>
            </form>

            {loading && <p>Loading...</p>}

            <div className="grid grid-cols-3 gap-4">
                {images.map((image) => (
                    <img key={image.id} src={image.urls.small} alt={image.alt_description} className="rounded shadow-lg" />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
