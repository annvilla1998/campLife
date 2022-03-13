import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Route } from "react-router-dom";
import { getAllSites } from "../../store/sites";
import { CreateSite } from "./CreateSiteForm";
import { SiteList } from "./SiteList";
import './Sites.css' 

export const Sites = () => {
    const dispatch = useDispatch();
    const sitesObj = useSelector(state => state.siteState.sites)
    const sessionUser = useSelector(state => state.session.user);
    const sitesArr = Object.values(sitesObj)
    const [showForm, setShowForm] = useState(false)

   
    useEffect(() => {
        dispatch(getAllSites())
    },[dispatch])
    return (
       <div className='sites'>
        <h2>Adventure Awaits!</h2>
        {sessionUser &&
        <div onClick={() => {setShowForm(true)}}>Host New Site</div>
        }
        {!sessionUser &&
            <NavLink to="/signup">
                <div >Host New Site</div>
            </NavLink>
        }
        {showForm ? (
             <CreateSite hideForm={() => setShowForm(false)}/>
        ) : (
            <Route path='/site/:siteId'>

            </Route>
        )}
        <ul className="site-list-container">
            {sitesArr.map(site => (
                <SiteList key={site.id} site={site}/>
            ))}
        </ul>
       </div>  
    )
}