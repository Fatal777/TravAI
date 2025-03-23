import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config"; // Import Firebase auth and Firestore
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile as firebaseUpdateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // For storing additional user data

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe; // Cleanup subscription
    }, []);

    // Login an existing user
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user);
            return userCredential;
        } catch (error) {
            throw error;
        }
    };

    // Register a new user
    const register = async (email, password, fullName, username) => {
        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with display name
            await firebaseUpdateProfile(user, {
                displayName: fullName,
            });

            // Store additional user details in Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullName,
                username,
                email,
                createdAt: new Date().toISOString(),
            });

            // Update current user state
            setCurrentUser({ ...user, displayName: fullName });

            return userCredential;
        } catch (error) {
            throw error;
        }
    };

    // Logout the current user
    const logout = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
        } catch (error) {
            throw error;
        }
    };

    // Update user profile
    const updateProfile = async (profileData) => {
        if (!auth.currentUser) throw new Error("No authenticated user");

        try {
            await firebaseUpdateProfile(auth.currentUser, profileData);
            setCurrentUser({ ...auth.currentUser, ...profileData });
        } catch (error) {
            throw error;
        }
    };

    // Context value
    const value = {
        currentUser,
        loading,
        login,
        register,
        logout,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);