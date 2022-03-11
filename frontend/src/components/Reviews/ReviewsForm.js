import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createReview } from "../../store/reviews"
import './ReviewsForm.css'

export const ReviewForm = () => {
    const [rating, setRating] = useState('')
    const [review, setReview] = useState('')
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const siteId = useParams()

    const handlePostReview = async (e) => {
        e.preventDefault()

        const newReview = {
            userId: sessionUser.id,
            siteId: siteId.id,
            rating,
            review
        }
        let createdReview; 
        createdReview = await dispatch(createReview(newReview))
        .catch(async (res) => {
            const data = await res.json()
            if(data && data.errors) setErrors(data.errors) 
        })
        if(createdReview){
            setErrors([])
            history.push(`/sites/${siteId.id}`)
        }
    }

    return (
        <section className="post-review-form">
            <ul>
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
            </form>
        </section>
    )
}