import { useEffect, useState } from 'react';
import { Loader } from '@progress/kendo-react-indicators';

const SplashScreen = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500); // 2.5 seconds delay
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center space-y-6">
                <img
                    src="/Trav.svg" // Animated logo from public folder
                    alt="TravAI Loading"
                    className="h-48 w-48 animate-pulse"
                />
                <Loader
                    size="large"
                    className="text-blue-600 dark:text-blue-400"
                />
                <p className="text-gray-600 dark:text-gray-400 animate-pulse">
                    Preparing your travel intelligence...
                </p>
            </div>
        );
    }

    return children;
};

export default SplashScreen;