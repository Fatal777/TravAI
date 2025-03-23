import { ThemeProvider } from './contexts/ThemeContext';
import '@progress/kendo-theme-default/dist/all.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TripProvider } from "./contexts/TripContext";
import SplashScreen from "./components/common/SplashScreen";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTrip from "./pages/CreateTrip";
import MyTrips from "./pages/MyTrips";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import TripPlanner from "./pages/TripPlanner";
import ViewTrip from './pages/ViewTrip';


function App() {
  return (
    <ThemeProvider>
      <TripProvider>
        <AuthProvider>
          <SplashScreen>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-trip" element={<CreateTrip />} />
                <Route path="/my-trips" element={<MyTrips />} />
                <Route path="/trip/:tripId" element={<ViewTrip />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/trip-planner" element={<TripPlanner />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </SplashScreen>
        </AuthProvider>
      </TripProvider>
    </ThemeProvider>
  );
}

export default App;
