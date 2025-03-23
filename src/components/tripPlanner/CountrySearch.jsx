import { useState, useEffect } from "react";

const CountrySearch = ({ onSelectCountry }) => {
    const [query, setQuery] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => setCountries(data.map((country) => country.name.common)))
            .catch((err) => console.error("Error fetching countries:", err));
    }, []);

    const filteredCountries = countries.filter((c) => c.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search country..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            {filteredCountries.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-auto">
                    {filteredCountries.map((country) => (
                        <li
                            key={country}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setQuery(country);
                                onSelectCountry(country);
                            }}
                        >
                            {country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CountrySearch;
