import { csrfFetch } from "./csrf";

const GET_SITES = 'sites/GET_SITES'
const GET_ONE = 'sites/GET_ONE'
const POST_SITE = 'sites/POST_SITE'
const EDIT_SITE = 'sites/EDIT_SITE'
const DELETE_SITE = 'sites/DELETE_SITE'

export const getSites = (sites) => ({ 
    type: GET_SITES,
    sites
})

export const getOne = (site, images) => ({
    type: GET_ONE,
    site,
    images
})

export const postSite = (site) => ({
    type: POST_SITE,
    site
})

export const editOne = (site) => ({
    type: EDIT_SITE,
    site
})

export const remove = (siteId) => ({
    type: DELETE_SITE,
    siteId,
    
})


export const getAllSites = () => async dispatch => {
    const res = await csrfFetch('/api/sites');
    const sites = await res.json();
    dispatch(getSites(sites))
}
//thunk
export const getSiteDetails = (id) => async dispatch => {
    const res = await csrfFetch(`/api/sites/${id}`)
    if(res.ok){
        const site = await res.json();
        console.log(site)
        dispatch(getOne(site))
    }
}

export const createSite = (data) => async dispatch => {
    const res = await csrfFetch('/api/sites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    const newSite = await res.json();
    // console.log(newSite)
    dispatch(postSite(newSite))
    return newSite
}

export const editSite = (data) => async dispatch => {
    const res = await csrfFetch(`/api/sites/${data.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    // console.log(res)
    const site = await res.json();
    dispatch(editOne(site))
    return site
}

//thunk
export const deleteSite = (siteId) => async dispatch => {
    const response = await csrfFetch(`/api/sites/${siteId}`, {
      method: 'DELETE',
    });
    const site = await response.json();
    dispatch(remove(site.id));
      return site;
  };


const initialState = {
    sites : {},
    images: {}
}

const siteReducer = (state = initialState, action) => {
    const allSites = {};
    const allImages = {}
    let newState = {}
    switch(action.type) {
        case GET_SITES:
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
        case GET_ONE:
            newState = {...state}
            newState[action.site.site.id] = action.site.site;
            return {
                ...newState,
                site: action.site.site,
                images: action.site.images
            }
        case POST_SITE:
              return {
                ...state,
                sites: {
                    ...state.sites,
                    [action.site.id]: {
                        ...action.site
                    }    
                },
                images: {
                    ...state.images,
                    ...action.images
                }
              };
        case EDIT_SITE:
              return {
                ...state,
                sites: {
                    ...state.sites,
                    [action.site.id]: {
                        ...action.site
                    }    
                },
                images: {
                    ...state.images,
                    ...action.images
                }
              };
        case DELETE_SITE:
            newState = { ...state };
            delete newState[action.siteId];            
            return newState;
        default:
            return state
    }
}

export default siteReducer