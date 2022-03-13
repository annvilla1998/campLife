import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { editReview } from "../../store/reviews"

export const EditReviewForm = ({reviewId, hideForm}) => {
    const sessionUser = useSelector(state => state.session.user);
    const reviewToBeEdited = useSelector(state => state.reviewState.reviews[reviewId]);
    const [review, setReview] = useState(reviewToBeEdited.review)
    const [rating, setRating] = useState(reviewToBeEdited.rating)
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const siteId = useParams()
    const handlePostReview = async (e) => {
        e.preventDefault()

        const newReview = {
            ...reviewToBeEdited,
            userId: sessionUser.id,
            siteId: +siteId.id,
            rating,
            review
        }
        const updatedReview = await dispatch(editReview(newReview))
        
        if(updatedReview){
            setErrors([])
            hideForm()
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors([]);
        hideForm();
      };

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
                    type="number"
                    value={rating}
                    required
                    onChange={e => setRating(e.target.value)}
                    />
                </label>
                <label>
                    Comments
                    <input
                    type="text"
                    value={review}
                    required
                    onChange={e => setReview(e.target.value)}
                    />
                </label>
                <button type="submit">Post</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
}


