import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { editReview, getOneReview } from "../../store/reviews"
import { useLocation } from "react-router-dom"
import './ReviewsForm.css'

export const EditReviewForm = () => {
    const sessionUser = useSelector(state => state.session.user);
    const location = useLocation();
    const history = useHistory()
    const { reviewId, siteId } = location.state;
    const reviewToBeEdited = useSelector(state => state.reviewState.reviews[reviewId]);
    const [review, setReview] = useState(reviewToBeEdited?.review)
    const [rating, setRating] = useState(reviewToBeEdited?.rating)
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getOneReview(reviewId))
    },[dispatch, reviewId])

    // const siteId = useParams()
    const handlePostReview = async (e) => {
        e.preventDefault()

        const newReview = {
            ...reviewToBeEdited,
            userId: sessionUser.id,
            siteId: reviewToBeEdited.siteId,
            rating,
            review
        }
        const updatedReview = await dispatch(editReview(newReview))
        .catch(async (res) => {
            const data = await res.json()
            if(data && data.errors) setErrors(data.errors) 
        })

        if(updatedReview){
            setErrors([])
            history.push(`/sites/${reviewToBeEdited.siteId}`)
            // hideForm()
        }
    }

    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     setErrors([]);
    //     // hideForm();
    //   };

    return (
        <section className="post-review-form">
            <ul id="errors">
                {errors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form className="review-form" onSubmit={handlePostReview}>
                <label>
                    Rating
                    <input 
                    id='review-input'
                    type="number"
                    value={rating}
                    required
                    onChange={e => setRating(e.target.value)}
                    /> / 5
                </label>
                <label>
                    Comments
                    <textarea
                    id='review-input'
                    type="text"
                    value={review}
                    required
                    onChange={e => setReview(e.target.value)}
                    />
                </label>
                <div id='review-button'>
                    <button type="submit">Post</button>
                    <NavLink to={`/sites/${siteId}`}>
                        <button type="button">Cancel</button>
                    </NavLink>
                </div>
            </form>
        </section>
    )
}


