import { csrfFetch } from './csrf';

const GET_TRIPS = 'trips/GET_TRIPS'
const POST_TRIP = 'trips/POST_TRIP'
const DELETE_TRIP = 'trips/DELETE_TRIP'

export const getTrips = (trips) => ({
    type: GET_TRIPS,
    trips
})

export const postTrip = (trip) => ({
    type: POST_TRIP,
    trip
})

export const removeTrip = (trip) => ({
    type: DELETE_TRIP,
    trip
})

export const getAllTrips = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/trips/${userId}`);
    const trips = await res.json()
    dispatch(getTrips(trips))
}

export const createTrip = (data) => async dispatch => {
    const { userId } = data
    const res = await csrfFetch(`/api/trips/${userId}`, {
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

export const deleteTrip = (trip) => async dispatch => {
    const { userId, id } = trip
    
    const res = await csrfFetch(`/api/trips/${userId}/${id}`, { 
        method: 'DELETE'
    })
    const deletedTrip = await res.json()
    dispatch(removeTrip(deletedTrip))
    return deletedTrip;
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
            state.trips = trips;
            return {
                ...state
            }
        case POST_TRIP:
            state.trips[action.trip.id] = action.trip
            return {
                ...state
            }
        case DELETE_TRIP:
            delete state.trips[action.trip.id];
            return {
                ...state
            };
        default:
            return state
    }
}