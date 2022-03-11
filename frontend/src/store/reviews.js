import { csrfFetch } from "./csrf";


const GET_REVIEWS = '/sites/:id/GET_REVIEWS'
const POST_REVIEW = '/sites/:id/POST_REVIEW'
const EDIT_REVIEW = '/sites/:id/EDIT_REVIEW'
const DELETE_REVIEW = '/sites/:id/DELETE_REVIEW'

export const getReviews =(reviews) => ({
    type: GET_REVIEWS,
    reviews
})

export const postReview = (review) => ({
    type: POST_REVIEW,
    review
})

export const editReview = (review) => ({
    type: POST_REVIEW,
    review
})

export const deleteReview = (review) => ({
    type: POST_REVIEW,
    review
})

export const allReviews = (id) => async dispatch => {
    const res = await csrfFetch(`/api/sites/${id}`)

    const reviews = await res.json()
    // console.log(reviews)
    dispatch(getReviews(reviews))
}

export const createReview = (data) => async dispatch => {
    const res = await csrfFetch(`/api/sites/${data.siteId}/review`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    const newReview = await res.json()
    dispatch(postReview(newReview))
    return newReview
}



const initialState = {
    reviews: []
}

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_REVIEWS:
        let allReviews = {};
        //     action.reviews.reviews.forEach(review => {
        //         allReviews[review.id] = review
        // })
        return {
            ...state,
            // ...allReviews,
            reviews: action.reviews.reviews

        }
        case POST_REVIEW:
        return {
            ...state,
            [action.review.siteId]: {
                ...state[action.review.siteId],
                reviews: [...state[action.review.siteId].reviews, action.review.id]
            }
        }
        
        // case EDIT_REVIEW:

        // case DELETE_REVIEW:

        default: 
        return state
    }
}

export default reviewReducer;