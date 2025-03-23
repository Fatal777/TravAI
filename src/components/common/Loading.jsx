import { motion } from "framer-motion";
import Trav from "../../assets/Trav.svg"; // Ensure the path is correct

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.img
                    src={Trav}
                    alt="Trav AI Logo"
                    className="w-24 h-24"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = "/fallback-logo.png"; // Use a fallback logo if not found
                    }}
                />
                <motion.p
                    className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    Preparing Your Adventure...
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Loading;
