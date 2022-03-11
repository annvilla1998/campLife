import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, NavLink, useHistory } from "react-router-dom";
import { getSiteDetails, deleteSite } from "../../store/sites";
import './SiteDetails.css'
import { EditSite } from "./EditSiteForm";
import { allReviews } from "../../store/reviews";
import { deleteReview } from "../../store/reviews";


export const SiteDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const site = useSelector(state => state.siteState.sites[id])
    const imageObj = useSelector(state => state.siteState.images)
    const imageArr = Object.values(imageObj)
    const reviews = useSelector(state => state.reviewState.reviews)
    // const reviewsArr = Object.values(reviews)
    const [showButtons, setShowButtons] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false);
    // console.log(reviews)
    useEffect(() => {
        dispatch(getSiteDetails(id))
        dispatch(allReviews(id))
        setShowButtons(false)
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
            {content}
            <div className="reviews-list">
                <h3>Reviews</h3>
                {sessionUser &&
                    <NavLink to={`/sites/${site?.id}/review`}>
                        <button id="post-review-button" >Post Review</button>
                    </NavLink>
                }
                {reviews.map(({ id, rating, review, siteId }) => (
                    <div className="review" key={id}>
                        <div>Rating: {rating} / 5</div>
                        <div>Comments: {review}</div>
                        {!showEditForm && (site?.userId === sessionUser?.id) &&
                            <div id="edit-delete-review">
                                <button>Edit</button>
                                <button onClick={() => dispatch(deleteReview(siteId, id))}>Delete</button>
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}