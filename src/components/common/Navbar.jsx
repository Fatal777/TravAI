import { useNavigate } from "react-router-dom";
import { AppBar, AppBarSection, AppBarSpacer } from "@progress/kendo-react-layout";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import LogoDark from "../../assets/Trav.svg";
import LogoLight from "../../assets/Travwithbg.svg";

const Navbar = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    return (
        <AppBar className="shadow-md z-40 bg-white dark:bg-black transition-colors duration-300">
            {/* Logo Section */}
            <AppBarSection className="flex items-center gap-2 p-2">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate('/')}
                    role="link"
                    aria-label="Go to home page"
                >
                    {/* Logo */}
                    <img
                        src={isDarkMode ? LogoDark : LogoLight}
                        alt="TravAI Logo"
                        className="h-10 w-auto transition-all duration-300 hover:scale-105"
                    />
                    {/* Gradient Text */}
                    <div className="ml-2 bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent text-2xl font-bold">
                        TravAI
                    </div>
                </div>
            </AppBarSection>

            <AppBarSpacer />

            {/* Navigation Links */}
            <AppBarSection className="hidden md:flex items-center gap-6 p-2 text-lg font-medium">
                <span
                    className="cursor-pointer bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-teal-500 transition-all duration-300"
                    onClick={() => navigate('/')}
                >
                    Home
                </span>

                <span
                    className="cursor-pointer bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-teal-500 transition-all duration-300"
                    onClick={() => navigate('/dashboard')}
                >
                    Dashboard
                </span>

                <span
                    className="cursor-pointer bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-teal-500 transition-all duration-300"
                    onClick={() => navigate('/settings')}
                >
                    Profile
                </span>

                {/* Dark Mode Toggle */}
                <ThemeToggle />
            </AppBarSection>
        </AppBar>
    );
};

export default Navbar;