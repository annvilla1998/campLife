import { applyMiddleware } from "redux";
import { csrfFetch } from "./csrf";

const GET_SITES = 'sites/GET_SITES'
const POST_SITE = 'sites/POST_SITE'
const DELETE_SITE = 'sites/DELETE_SITE'

export const getSites = (sites) => ({ 
    type: GET_SITES,
    sites
})


export const getAllSites = () => async dispatch => {
    const res = await csrfFetch('/api/sites');
    const sites = await res.json();
    dispatch(getSites(sites))
}

const initialState = {
    sites : {}
}

const siteReducer = (state = initialState, action) => {
    let newState;
    let sites;
    switch(action.type) {
        case GET_SITES:
            // const newState = { ...state}
            // action.sites.forEach(site => newState[site.id] = site)
            // return newState
            const allSites = {};
            action.sites.sites.forEach(site => {
                allSites[site.id] = site
            })
            return {
                ...allSites,
                ...state,
            }
        default:
            return state
    }
}

export default siteReducer