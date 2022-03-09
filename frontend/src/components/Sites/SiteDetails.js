import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSiteDetails } from "../../store/sites";
import './SiteDetails.css'

export const SiteDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const site = useSelector(state => state.siteState.sites)
    const imageObj = useSelector(state => state.siteState.images)
    const imageArr = Object.values(imageObj)
    const [showButtons, setShowButtons] = useState(false)
    console.log(imageArr)
    useEffect(() => {
        dispatch(getSiteDetails(id))
        setShowButtons(false)
    },[dispatch, id])
    
    // let content = null;
    // console.log(sessionUser.id === site.userId)
    
    // if(sessionUser && sessionUser.id === site.userId) {
    //     setShowButtons(true)
    // }
    // if(showButtons) {
    //     content = (
    //         <div>
    //             <button>Edit</button>
    //             <button>Delete</button>
    //         </div>
    //     )
    // }
    
    return (
        <div className="site-detail-container">
            <div id="site-details">
            <span id='image-detail-page'>
                {imageArr.map(({ siteId, url }) => (
                    siteId === site.id ? (
                        <img key={url} src={url}/>
                    )
                : null))}
            </span>
            <div id="site-detail-text">
                <span>Site: {site.name}</span>
                <span>Address: {site.address}</span>
                <span>City: {site.city}</span>
                <span>State: {site.state}</span>
                <span>Country: {site.country}</span>
                <span>${site.price}/night</span>
            </div>
         {/* {content} */}
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}