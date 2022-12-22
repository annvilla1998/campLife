import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllSites } from "../../store/sites";
import { SiteList } from '../Sites/SiteList'
import './Sites.css' 

export const Sites = () => {
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(getAllSites())
    },[dispatch])
    
    const sitesObj = useSelector(state => state.siteState.sites)
    const sitesArr = Object.values(sitesObj)


    return (
       <div className='sites'>
        <ul className="site-list-container">
            {sitesArr.map(site => (
                <SiteList key={site.id} site={site}/>
            ))}
        </ul>
       </div>  
    )
}