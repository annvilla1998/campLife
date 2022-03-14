import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, NavLink, useHistory, Link } from "react-router-dom";
import { getSiteDetails, deleteSite } from "../../store/sites";
import './SiteDetails.css'
import '../Reviews/ReviewsForm.css'
import { EditSite } from "./EditSiteForm";
import { allReviews } from "../../store/reviews";
import { deleteReview } from "../../store/reviews";
import { EditReviewForm } from "../Reviews/EditReviewForm";


export const SiteDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const site = useSelector(state => state.siteState.sites[id])
    const imageObj = useSelector(state => state.siteState.images)
    const imageArr = Object.values(imageObj)
    const reviews = useSelector(state => state.reviewState.reviews)
    const reviewsArr = Object.values(reviews)
    const [showEditForm, setShowEditForm] = useState(false);
    const [showEditReviewForm, setShowEditReviewForm] = useState(false)

    useEffect(() => {
        dispatch(allReviews(id))
        dispatch(getSiteDetails(id))
    },[dispatch, id])
    
    
    let content = null;
                
    const handleDeleteSubmit = (e) => {
        e.preventDefault();
    
        let deletedSite;
        deletedSite = dispatch(deleteSite(site.id))

        if(deletedSite){
            history.push('/sites')
        }
    }

                
    if (showEditForm) {
        content = (
          <EditSite 
            site={site} 
            hideForm={() => setShowEditForm(false)} 
          />
        );
      }



    return (
        <div className="site-detail-container-form">
            <div className="site-detail-container">
                <div id="site-details">
                    <h2 id="site-details-h2">{site?.name}</h2>
                <span id='image-detail-page'>
                    {imageArr.map(({ siteId, url }) => (
                        siteId === site?.id ? (
                            <img key={url} src={url}/>
                        )
                    : null))}
                </span>
                <div id="site-detail-text">
                    <span>Address: {site?.address}</span>
                    <span>City: {site?.city}</span>
                    <span>State: {site?.state}</span>
                    <span>Country: {site?.country}</span>
                    <span>${site?.price}/night</span>
                    <span>Description: {site?.description}</span>
                </div>
                    {!showEditForm && (site?.userId === sessionUser?.id) &&
                    <div id="edit-delete-site">
                        <button  onClick={() => setShowEditForm(true)}>Edit</button>
                        <button onClick={handleDeleteSubmit}>Delete</button>
                    </div>
                    }
                </div>
            </div>
            <div className="edit-sites">
                {content}
            </div>
            <div className="reviews-list">
                <h3>Reviews</h3>
                {sessionUser &&
                    <NavLink to={`/sites/${site?.id}/review`}>
                        <button id="post-review-button" >Post Review</button>
                    </NavLink>
                }
                {!sessionUser &&
                    <NavLink exact to={`/signup`}>
                        <button id="post-review-button" >Post Review</button>
                    </NavLink>
                }
                {reviewsArr.map(({ id, rating, review, userId, siteId }) => (
                    <div className="review" key={id}>
                        <div>Rating: {rating} / 5</div>
                        <div>Comments: {review}</div>
                        {userId === sessionUser?.id &&
                            <div id="review-button">
                                <Link to={{
                                    pathname: `/review/${id}/edit`,
                                    state: {
                                        reviewId : id,
                                        siteId: siteId,
                                        oldrating: rating,
                                        oldreview: review
                                    }
                                }}>
                                    <button >Edit</button>
                                </Link>
                                <button onClick={() => dispatch(deleteReview(id))}>Delete</button>
                        </div>}

                        {/* {showEditReviewForm &&

                            <EditReviewForm reviewId={id} hideForm={()=> setShowEditReviewForm(false)}/>} */}
                    </div>
                ))}
            </div>
        </div>
    )
}