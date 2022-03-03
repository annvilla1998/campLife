import { csrfFetch } from "./csrf";

const SET_SESSION = 'session/SET_SESSION';
const REMOVE_SESSION = 'session/REMOVE_SESSION'
const GET_USER = 'session/GET_USER'
const SIGN_UP = 'session/SIGN_UP'

const setSession = (user) => ({
    type: SET_SESSION,
    payload: user
})

const removeSession = () => ({
    type: REMOVE_SESSION
})


export const signUpUser = (user) => async dispatch => {
    const { email, username, password } = user
    const res = await csrfFetch('/api/users',{
        method: 'POST',
        body: JSON.stringify({
            email,
            username,
            password
        })
    })
    const data = res.json()
    dispatch(setSession(data.user))
    return res
}

export const restoreUser = () => async dispatch => {
    const res = await csrfFetch(`/api/session`)

    const data = await res.json();
    dispatch(setSession(data.user))
    return res
}

export const login = (user) => async dispatch => {
    const { credential, password } = user
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    })
    const data = await res.json();
    dispatch(setSession(data.user));
    return res;
}


const initialState = {
    user: null
}

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case SET_SESSION:
        newState = Object.assign({}, state);
        newState.user = action.payload.user
            return newState
        case REMOVE_SESSION:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState
        default:
            return state;
    }
}

export default sessionReducer