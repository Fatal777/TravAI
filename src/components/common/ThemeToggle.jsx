import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all"
            aria-label="Toggle Theme"
        >
            {isDarkMode ? "🌙" : "☀️"}
        </button>
    );
};

export default ThemeToggle;
