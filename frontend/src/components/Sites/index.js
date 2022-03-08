import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Route } from "react-router-dom";
import { getAllSites } from "../../store/sites";
import { CreateSite } from "./CreateSiteForm";
import { SiteList } from "./SiteList";
import './Sites.css' 

export const Sites = () => {
    const dispatch = useDispatch();
    const sitesObj = useSelector(state => state.siteState)
    const sitesArr = Object.values(sitesObj)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(getAllSites())
    },[dispatch])


    return (
       <div className='sites'>
        <h2>Sites</h2>
        <div onClick={() => {setShowForm(true)}}>Host New Site</div>
        {showForm ? (
             <CreateSite hideForm={() => setShowForm(false)}/>
        ) : (
            <Route path='/site/:siteId'>

            </Route>
        )}
        <ul className="site-list">
            {sitesArr.map(site => (
                <SiteList key={site.id} site={site}/>
            ))}
        </ul>
       </div>  
    )
}