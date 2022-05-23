import { csrfFetch } from './csrf';

const GET_TRIPS = 'trips/GET_TRIPS'
const POST_TRIP = 'trips/POST_TRIP'

export const getTrips = (trips) => ({
    type: GET_TRIPS,
    trips
})

export const postTrip = (trip) => ({
    type: POST_TRIP,
    trip
})

export const getAllTrips = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/trips`);
    const trips = await res.json()
    dispatch(getTrips(trips))
}

export const createTrip = (data) => async dispatch => {
    const { userId } = data
    const res = await csrfFetch(`/api/users/${userId}/trips`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const newTrip = await res.json()
    if(!newTrip.errors){
        dispatch(postTrip(newTrip))
    }
    return newTrip
}


const initialState = {
    trips: {},
}

export const tripsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIPS:
            let trips = {};
            action.trips.forEach(trip => {
                trips[trip.id] = trip
            })
            return {
                ...state,
                trips: {
                    ...trips
                }
            }
        case POST_TRIP:
            state.trips[action.trip.id] = action.trip
            return {
                ...state,
                trips: {
                    ...state.trips,
                    [action.trip.id]: action.trip
                }
            }
        default:
            return state
    }
}