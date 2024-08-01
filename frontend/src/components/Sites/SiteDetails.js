import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory, Link } from "react-router-dom";
import { getSiteDetails, deleteSite } from "../../store/sites";
import { EditSite } from "./EditSiteForm";
import { allReviews } from "../../store/reviews";
import { deleteReview } from "../../store/reviews";
import { Modal } from '../../context/Modal';
import { BookTrip } from '../BookTrip';
import ProtectedRoute from '../LoginForm/ProtectedRoute';
import './SiteDetails.css';
import '../Reviews/ReviewsForm.css';


export const SiteDetails = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const dispatch = useDispatch()
    const { id } = useParams();
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const site = useSelector(state => state.siteState?.sites[id]);
    const images = [site?.image1, site?.image2, site?.image3, site?.image4].filter(image => image);
    const reviews = useSelector(state => state.reviewState.reviews)
    const reviewsArr = Object.values(reviews)
    const [showSiteModal, setShowSiteModal] = useState(false)
    const [showBookModal, setShowBookModal] = useState(false)

    useEffect(() => {
        dispatch(getSiteDetails(id))
        dispatch(allReviews(id))
    },[dispatch, id])
    

    const swipeRight = () => {
        if(currentImage !== images.length - 1){
            setCurrentImage(currentImage + 1)
        }
    }

    const swipeLeft = () => {
        if(currentImage !== 0){
            setCurrentImage(currentImage - 1)
        }
    }

    
    let content = null;
                
    const handleDeleteSubmit = (e) => {
        e.preventDefault();
    
        let deletedSite;
        deletedSite = dispatch(deleteSite(site.id))

        if(deletedSite){
            history.push('/')
        }
    }

    
    return (
        <div className="site-detail-container-form">
            <div className="site-detail-container">
                <div id="site-details">
                <span id='image-detail-page'>
                    {images && (
                        <>
                            <img alt="site-image" src={images[currentImage]}/>
                            {currentImage !== 0 && images.length > 1 &&
                                <i className="fa-solid fa-angle-left" onClick={swipeLeft}></i>
                            }
                            {currentImage !== images.length - 1 && images.length > 1 &&
                                <i className="fa-solid fa-angle-right" onClick={swipeRight}></i>
                            }
                        </>
                    )}
                </span>
                <div id="site-detail-text">
                    <h2 >{site?.name}</h2>
                    <div id='book-container'>
                        <span className="price">${site?.price} per night</span>
                        <ProtectedRoute>
                            <div onClick={() => setShowBookModal(true)} className="book-button">Book</div>
                        </ProtectedRoute>
                        {showBookModal && (
                            <Modal onClose={() => setShowBookModal(false)}>
                                <BookTrip site={site} setShowBookModal={setShowBookModal} />
                            </Modal>
                        )}
                    </div>
                    <span>Address: {site?.address}</span>
                    <span>City: {site?.city}</span>
                    <span>State: {site?.state}</span>
                    <span>Country: {site?.country}</span>
                    <span>Description: {site?.description}</span>
                </div>
                    {(site?.userId === sessionUser?.id) &&
                    <div id="edit-delete-site">
                        <button  onClick={() => setShowSiteModal(true)}>Edit</button>
                        {showSiteModal && (
                            <Modal onClose={() => setShowSiteModal(false)}>
                                <EditSite site={site} setShowSiteModal={setShowSiteModal}/>
                            </Modal>
                        )}
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
                        <div className="rating">Rating: {rating} / 5</div>
                        <div className="review-comments">{review}</div>
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
