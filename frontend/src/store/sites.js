import { applyMiddleware } from "redux";
import { csrfFetch } from "./csrf";

const GET_SITES = 'sites/GET_SITES'
const POST_SITE = 'sites/POST_SITE'
const DELETE_SITE = 'sites/DELETE_SITE'

export const getSites = (sites) => ({ 
    type: GET_SITES,
    sites
})

export const postSite = (site) => ({
    type: POST_SITE,
    site
})


export const getAllSites = () => async dispatch => {
    const res = await csrfFetch('/api/sites');
    const sites = await res.json();
    dispatch(getSites(sites))
}

export const createSite = (data) => async dispatch => {
    const res = await csrfFetch('/api/sites', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    const newSite = await res.json();
    dispatch(postSite(newSite))
    return newSite
}

const initialState = {
    sites : {},
    images: {}
}

const siteReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SITES:
            // const newState = { ...state}
            // action.sites.forEach(site => newState[site.id] = site)
            // return newState
            const allSites = {};
            const allImages = {}
            action.sites.sites.forEach(site => {
                allSites[site.id] = site
            })
            action.sites.images.forEach(image => {
                allImages[image.id] = image
            })
            return {
                sites: {
                    ...allSites,
                    ...state.sites
                },
                images: {
                    ...allImages,
                    ...state.images
                },
            }
        default:
            return state
    }
}

export default siteReducer