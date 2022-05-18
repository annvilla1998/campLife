import { csrfFetch } from './csrf';

const GET_TRIPS = 'trips/GET_TRIPS'

export const getTrips = (trips) => ({
    type: GET_TRIPS,
    trips
})

export const getAllTrips = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/trips`);
    const trips = await res.json()
    dispatch(getTrips(trips))
}


const initialState = {
    trips: {}
}

export const tripsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIPS:
            action.trips.forEach(trip => {
                state.trips[trip.id] = trip
            })
            return {
                ...state.trips
            }
        default:
            return state
    }
}