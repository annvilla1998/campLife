import { csrfFetch } from "./csrf";


const GET_REVIEWS = '/reviews/:id/GET_REVIEWS'
const POST_REVIEW = '/reviews/:id/POST_REVIEW'
const EDIT_REVIEW = '/reviews/:id/EDIT_REVIEW'
const DELETE_REVIEW = '/reviews/:id/DELETE_REVIEW'
const GET_REVIEW = '/review/GET_REVIEW'

export const getReviews =(reviews) => ({
    type: GET_REVIEWS,
    reviews
})

export const getOne = (review) => ({
    type: GET_REVIEW,
    review
})

export const postReview = (review) => ({
    type: POST_REVIEW,
    review
})

export const edit = (review) => ({
    type: EDIT_REVIEW,
    review
})

export const remove = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const allReviews = (id) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${id}/review`)

    const reviews = await res.json()
    dispatch(getReviews(reviews))
}

export const createReview = (data) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${data.siteId}/review`,{
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

export const getOneReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/review/${reviewId}/edit`)
    const review = await res.json()
    dispatch(getOne(review))
}

export const editReview = (data) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/review/${data.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const review = await res.json();
    dispatch(edit(review))
    return review
}

export const deleteReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/review/${reviewId}`, {
        method: 'DELETE'
    })
    const review= await res.json();
    dispatch(remove(review.id))
    return review;
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
        reviews = {}
        action.reviews.forEach(review=> reviews[review.id] = review)
        newState.reviews = reviews
        return newState;
        
        case POST_REVIEW:
        newState = {...state};
        let newReviews = {...state.reviews}
        newReviews[action.review.id] = action.review;
        newReviews.reviews = newReviews
        return newState;

        case GET_REVIEW:
        newState = {...state}
        reviews = {}
        reviews[action.review.id] = action.review;
        newState.reviews = reviews
        return newState
        // return {
        //     ...state,
        //     reviews: {
        //         [action.review.id] : action.review
        //     }
        // }
     
        case EDIT_REVIEW:
            // newState = {...state}
            // newState.reviews = reviews
            // return newState
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    [action.review.id] : action.review
                }
            }
        case DELETE_REVIEW:
            // reviews = newState.reviews.filter(review => !(review.id === action.reviewId) )
            // newState.reviews = reviews
            // return newState
        newState = {...state};
        reviews = {...state.reviews};
        delete reviews[action.reviewId]; 
        newState.reviews = reviews
        return newState;
        default: 
        return state
    }
}

export default reviewReducer;