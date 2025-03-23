import { db } from "../firebase/config";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";

const tripsCollection = collection(db, "trips");

export const addTrip = async (trip) => {
  const docRef = await addDoc(tripsCollection, trip);
  return { id: docRef.id, ...trip };
};

export const getTrips = async () => {
  const snapshot = await getDocs(tripsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteTrip = async (id) => {
  await deleteDoc(doc(db, "trips", id));
};

export const updateTrip = async (id, updatedTrip) => {
  await updateDoc(doc(db, "trips", id), updatedTrip);
};

export const subscribeToTrips = (callback) => {
  return onSnapshot(tripsCollection, (snapshot) => {
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  });
};
