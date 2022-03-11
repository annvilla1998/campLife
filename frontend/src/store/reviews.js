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
    type: EDIT_REVIEW,
    review
})

export const remove = (review) => ({
    type: DELETE_REVIEW,
    review
})

export const allReviews = (id) => async dispatch => {
    const res = await csrfFetch(`/api/sites/${id}/review`)

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
    console.log(newReview)
    dispatch(postReview(newReview))
    return newReview
}

export const deleteReview = (reviewId, siteId) => async dispatch => {
    const res = await csrfFetch(`/api/sites/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    const { id: deletedReviewId }= await res.json();
    dispatch(remove(deletedReviewId, siteId))
    return deletedReviewId;
}


const initialState = {
    reviews: {}
}

const reviewReducer = (state = initialState, action) => {
    let newState;
    let reviews;
    switch(action.type) {
        case GET_REVIEWS:
        newState = { ...state}
        newState.reviews = action.reviews
        return newState;
        
        case POST_REVIEW:
        newState = {...state};
        let newReviews = {...state.reviews}
        newReviews[action.review.id] = action.review;
        newReviews.reviews = newReviews
        return newState;
        // return {
        //     ...state,
        //     reviews: {
        //         ...action.review
        //     }
        // }
        
        // case EDIT_REVIEW:

        // case DELETE_REVIEW:
        //  const newState = {...state}
        //  delete newState.reviews[action.review]
        //  return newState
        default: 
        return state
    }
}

export default reviewReducer;