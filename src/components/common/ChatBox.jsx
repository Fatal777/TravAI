import { useState, useRef, useEffect } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { TextBox } from "@progress/kendo-react-inputs";
import { Notification } from "@progress/kendo-react-notification";
import { Window } from "@progress/kendo-react-dialogs";
import { Avatar } from "@progress/kendo-react-layout";
import { Loader } from "@progress/kendo-react-indicators";
import { generateItinerary } from "../../services/cloudflareAIService";
const geminiLogo = "/gemini-logo.svg";

// Custom styles for the component
const customStyles = `
  /* Window and title styles */
  .k-window-titlebar {
    background-color: #111827 !important;
    border-bottom: 1px solid #374151 !important;
  }
  
  .k-window-title {
    color: white !important;
  }

  .k-window-actions .k-icon {
    color: #f97316 !important;
    font-size: 20px !important;
  }
  
  /* Scrollbar styling */
  .chat-messages::-webkit-scrollbar {
    width: 8px !important;
  }
  
  .chat-messages::-webkit-scrollbar-track {
    background: #1f2937 !important;
    border-radius: 10px !important;
  }
  
  .chat-messages::-webkit-scrollbar-thumb {
    background: #4f46e5 !important;
    border-radius: 10px !important;
    transition: background 0.3s ease !important;
  }
  
  .chat-messages::-webkit-scrollbar-thumb:hover {
    background: #6366f1 !important;
  }
  
  /* Custom send button */
  .custom-send-btn {
    background-color: #4f46e5 !important;
    border-color: #4f46e5 !important;
    border-radius: 8px !important;
    transition: all 0.2s ease !important;
    width: 40px !important;
    height: 40px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  .custom-send-btn:hover {
    background-color: #6366f1 !important;
    transform: translateY(-2px) !important;
  }
  
  .custom-send-btn:active {
    transform: translateY(0) !important;
  }
  
  .custom-send-icon {
    fill: white !important;
    width: 18px !important;
    height: 18px !important;
  }
`;

const ChatBox = ({ trip }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ text: "Hi! Need help planning your trip?", type: "ai" }]);
    const [inputMessage, setInputMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [awaitingDetails, setAwaitingDetails] = useState({ destination: false, startDate: false, endDate: false });
    const [tripDetails, setTripDetails] = useState({
        destination: trip?.destination || "",
        startDate: trip?.startDate || "",
        endDate: trip?.endDate || ""
    });

    const messagesEndRef = useRef(null);

    // Add custom styles to the document
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = customStyles;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    useEffect(() => {
        if (trip) {
            setTripDetails({
                destination: trip.destination || tripDetails.destination,
                startDate: trip.startDate || tripDetails.startDate,
                endDate: trip.endDate || tripDetails.endDate
            });
        }
    }, [trip]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const resetChat = () => {
        setMessages([{ text: "Hi! Need help planning your trip?", type: "ai" }]);
        setTripDetails({ destination: "", startDate: "", endDate: "" });
        setInputMessage("");
        setAwaitingDetails({ destination: false, startDate: false, endDate: false });
    };

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const userMessage = { text: inputMessage, type: "user" };
        setMessages(prev => [...prev, userMessage]);

        if (awaitingDetails.destination) {
            setTripDetails(prev => ({ ...prev, destination: inputMessage }));
            setAwaitingDetails({ destination: false, startDate: true, endDate: false });
            setMessages(prev => [...prev, { text: "What is your trip's start date?", type: "ai" }]);
        } else if (awaitingDetails.startDate) {
            setTripDetails(prev => ({ ...prev, startDate: inputMessage }));
            setAwaitingDetails({ destination: false, startDate: false, endDate: true });
            setMessages(prev => [...prev, { text: "What is your trip's end date?", type: "ai" }]);
        } else if (awaitingDetails.endDate) {
            setTripDetails(prev => ({ ...prev, endDate: inputMessage }));
            setAwaitingDetails({ destination: false, startDate: false, endDate: false });
            generateItineraryHandler(tripDetails.destination, tripDetails.startDate, inputMessage);
        } else if (inputMessage.toLowerCase().includes("generate itinerary") ||
            inputMessage.toLowerCase().includes("plan my trip")) {
            checkAndGenerateItinerary();
        } else if (inputMessage.toLowerCase().includes("new trip")) {
            resetChat();
        } else {
            setMessages(prev => [...prev, {
                text: "I can help you generate a travel itinerary! Just type 'Generate Itinerary' or click the button below.",
                type: "ai"
            }]);
        }

        setInputMessage("");
    };

    const checkAndGenerateItinerary = () => {
        if (!tripDetails.destination) {
            setAwaitingDetails({ destination: true, startDate: false, endDate: false });
            setMessages(prev => [...prev, { text: "Where are you traveling to?", type: "ai" }]);
        } else if (!tripDetails.startDate) {
            setAwaitingDetails({ destination: false, startDate: true, endDate: false });
            setMessages(prev => [...prev, { text: "What is your trip's start date?", type: "ai" }]);
        } else if (!tripDetails.endDate) {
            setAwaitingDetails({ destination: false, startDate: false, endDate: true });
            setMessages(prev => [...prev, { text: "What is your trip's end date?", type: "ai" }]);
        } else {
            generateItineraryHandler(tripDetails.destination, tripDetails.startDate, tripDetails.endDate);
        }
    };

    const generateItineraryHandler = async (destination, startDate, endDate) => {
        setMessages(prev => [...prev, { text: "Generating your itinerary...", type: "ai" }]);
        setLoading(true);

        try {
            const itinerary = await generateItinerary(destination, startDate, endDate);
            setMessages(prev => [
                { text: `Here's your ${destination} itinerary:`, type: "ai" },
                { text: itinerary, type: "ai" },
                { text: "Can I help with anything else?", type: "ai" }
            ]);
        } catch (error) {
            console.error("Error generating itinerary:", error);
            setMessages(prev => [...prev, {
                text: error.message.includes("resetRequired")
                    ? "Please start a new request."
                    : "Sorry, I couldn't generate your itinerary. Please try again.",
                type: "error"
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Custom send button with SVG icon
    const SendButton = () => (
        <button
            className="custom-send-btn"
            onClick={handleSendMessage}
            disabled={loading}
        >
            <svg
                className="custom-send-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
        </button>
    );

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen ? (
                <Button
                    shape="circle"
                    themeColor="primary"
                    onClick={() => setIsOpen(true)}
                    className="shadow-xl"
                >
                    <Avatar type="image">
                        <img
                            src={geminiLogo}
                            alt="Gemini Logo"
                            className="w-8 h-8 rounded-full object-cover bg-transparent"
                        />
                    </Avatar>
                </Button>
            ) : (
                <Window
                    title={
                        <div className="flex items-center space-x-2 text-white">
                            <img
                                src={geminiLogo}
                                alt="TravAi Logo"
                                className="w-6 h-6 rounded-full object-cover"
                            />
                            <span>TravAi Assistant</span>
                        </div>
                    }
                    initialWidth={320}
                    initialHeight={500}
                    onClose={() => setIsOpen(false)}
                    className="rounded-xl shadow-xl bg-gray-900 text-white custom-window"
                >
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages">
                            {messages.map((msg, index) => (
                                <Notification
                                    key={index}
                                    type={{
                                        style: msg.type === "error" ? "error" : "info",
                                        icon: msg.type === "ai"
                                    }}
                                    className={`${msg.type === "user" ? "ml-auto" : ""}`}
                                >
                                    {msg.text}
                                </Notification>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t border-gray-700">
                            <div className="flex gap-2 mb-4">
                                <TextBox
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-gray-800 text-white placeholder-gray-400"
                                />
                                <SendButton />
                            </div>

                            <Button
                                themeColor="success"
                                className="w-full bg-green-600 hover:bg-green-700"
                                onClick={checkAndGenerateItinerary}
                                disabled={loading}
                            >
                                {loading ? <Loader size="small" /> : "Generate Itinerary"}
                            </Button>
                        </div>
                    </div>
                </Window>
            )}
        </div>
    );
};

export default ChatBox;