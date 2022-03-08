import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllSites } from "../../store/sites";
import { SiteList } from "./SiteList";
import './Sites.css' 

export const Sites = () => {
    const dispatch = useDispatch();
    const sitesObj = useSelector(state => state.siteState)
    const sitesArr = Object.values(sitesObj)
    // const imageObj
    console.log(sitesArr)
    // const [showForm, setShowForm] = useState(false)
    useEffect(() => {
        dispatch(getAllSites())
    },[dispatch])


    return (
       <div className='sites'>
        <h2>Sites</h2>
        <ul className="site-list">
            {sitesArr.map(site => (
                <SiteList key={site.id} site={site}/>
            ))}
        </ul>
        
       </div>  
    )
}