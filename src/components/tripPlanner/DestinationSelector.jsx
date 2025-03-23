import { AutoComplete } from "@progress/kendo-react-dropdowns";
import { useState } from "react";

const DestinationSelector = ({ onSelect }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDestinations = async (searchTerm) => {
        if (!searchTerm) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://restcountries.com/v3.1/name/${searchTerm}`
            );
            const data = await response.json();

            if (Array.isArray(data)) {
                setSuggestions(data.map((place) => place.name.common));
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error("Error fetching destinations:", error);
        }
        setLoading(false);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        fetchDestinations(value);
    };

    return (
        <div className="relative">
            <AutoComplete
                data={suggestions}
                value={query}
                onChange={handleSearchChange}
                onSelect={(event) => {
                    onSelect(event.target.value);
                    setQuery(event.target.value);
                }}
                placeholder="Search for a destination..."
                className="w-full"
                filterable={false} // Disable built-in filtering since we're using API
                loading={loading}
            />
            {loading && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-md p-2 text-gray-500 text-sm">
                    Searching destinations...
                </div>
            )}
        </div>
    );
};

export default DestinationSelector;