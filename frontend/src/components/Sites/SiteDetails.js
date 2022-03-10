import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, Link, useHistory } from "react-router-dom";
import { getSiteDetails, deleteSite } from "../../store/sites";
import './SiteDetails.css'
import { EditSite } from "./EditSiteForm";

export const SiteDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const site = useSelector(state => state.siteState.site)
    const imageObj = useSelector(state => state.siteState.images)
    const imageArr = Object.values(imageObj)
    const [showButtons, setShowButtons] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false);
    // console.log(site)
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
                </div>
                    <div id="edit-delete-site">
                    {!showEditForm &&
                        <button  onClick={() => setShowEditForm(true)}>Edit</button>
                    }
                        <button onClick={handleDeleteSubmit}>Delete</button>
                        {/* {content} */}
                        {/* {site.userId === sessionUser.id && (
                            <div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
            {content}
        </div>
    )
}