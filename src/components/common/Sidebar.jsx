import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaSuitcase, FaChartPie, FaPlus, FaCog, FaBars } from "react-icons/fa";

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { name: "My Trips", path: "/my-trips", icon: <FaSuitcase /> },
        { name: "Analytics", path: "/analytics", icon: <FaChartPie /> },
        { name: "New Trip", path: "/create-trip", icon: <FaPlus /> }, // Updated path
        { name: "Settings", path: "/settings", icon: <FaCog /> },
    ];

    return (
        <div className={`h-screen bg-black text-white transition-all ${isOpen ? "w-64" : "w-16"} border-r border-gray-800`}>
            {/* Sidebar Toggle Button */}
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <h2 className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>Features</h2>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white hover:text-blue-500 transition-colors"
                >
                    <FaBars />
                </button>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-4 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center p-3 mx-2 rounded-md transition-colors ${location.pathname === item.path
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-800 text-gray-300"
                            }`}
                    >
                        <span className="text-lg mr-2">{item.icon}</span>
                        <span className={`font-medium ${isOpen ? "block" : "hidden"}`}>{item.name}</span>
                    </Link>
                ))}
            </nav>

            {/* Additional Elements */}
            <div className="absolute bottom-4 left-4 right-4 px-2">
                <div className="text-gray-400 text-sm mt-4 border-t border-gray-800 pt-4">
                    <p className={`${isOpen ? "block" : "hidden"}`}>
                        Active Trips: <span className="text-blue-500">3</span>
                    </p>
                    <p className={`${isOpen ? "block" : "hidden"} mt-1`}>
                        Upcoming: <span className="text-green-500">2</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;