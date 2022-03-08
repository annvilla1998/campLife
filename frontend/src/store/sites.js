import { applyMiddleware } from "redux";
import { csrfFetch } from "./csrf";

const GET_SITES = 'sites/GET_SITES'
const POST_SITE = 'sites/POST_SITE'
const DELETE_SITE = 'sites/DELETE_SITE'

const getSites = (siteList) => { 
    type: GET_SITES,
    siteList
}

const initialState = {
    siteList: []
}

export const getAllSites = () => async dispatch => {
    const res = await csrfFetch('/api/sites');

    if(res.ok) {
        const siteList = await res.json();
        dispatch(getSites(siteList))
    }
}

const siteReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SITES:
            const allSites = {};
            action.sites.forEach(site => {
                allSites[site.id] = site
            })
            return {
                ...allSites,
                ...state,
                siteList: action.siteList
            }
        default:
            return state
    }
}