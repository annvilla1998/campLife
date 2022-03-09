import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, Link } from "react-router-dom";
import { getSiteDetails, deleteSite } from "../../store/sites";
import './SiteDetails.css'
import { EditSite } from "./EditSiteForm";

export const SiteDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const site = useSelector(state => state.siteState.sites)
    const imageObj = useSelector(state => state.siteState.images)
    const imageArr = Object.values(imageObj)
    const [showButtons, setShowButtons] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        dispatch(getSiteDetails(id))
        setShowButtons(false)
    },[dispatch, id])
    
    let content = null;
    // if(sessionUser.id === site.userId) {
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
    if (showEditForm) {
        content = (
          <EditSite 
            site={site} 
            hideForm={() => setShowEditForm(false)} 
          />
        );
      }

    return (
        <div className="site-detail-container">
            {content}
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
            {!showEditForm &&
                <button  onClick={() => setShowEditForm(true)}>Edit</button>
            }
                <button onClick={() => dispatch(deleteSite(site.id))}>Delete</button>
                {/* {content} */}
                {/* {site.userId === sessionUser.id && (
                    <div>
                    </div>
                )} */}
            </div>
        </div>
    )
}