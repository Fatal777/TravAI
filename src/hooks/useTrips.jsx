const updateTrip = (id, updatedTrip) => {
    setTrips((prevTrips) => prevTrips.map((trip) => (trip.id === id ? updatedTrip : trip)));
};
