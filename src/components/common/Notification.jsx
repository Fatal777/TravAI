import { motion, AnimatePresence } from "framer-motion";

const Notification = ({ message, type, onClose }) => {
    const bgColor =
        type === "success"
            ? "bg-green-500"
            : type === "error"
                ? "bg-red-500"
                : "bg-gray-500";

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    className={`fixed top-5 right-5 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm">{message}</p>
                        <button className="ml-4" onClick={onClose}>
                            ✖
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;
