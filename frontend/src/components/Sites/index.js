import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllSites } from "../../store/sites";

export const Sites = () => {
    const dispatch = useDispatch();
    const sitesObj = useSelector(state => state.siteState)
    const sites = Object.values(sitesObj)
    console.log(sites)
    // const [showForm, setShowForm] = useState(false)
    useEffect(() => {
        dispatch(getAllSites())
    },[dispatch])


    return (
       <nav>
           <ul>
                {/* {sites.map((site) => (
                <li key={site}>{site.name}</li>
                ))} */}
           </ul>
       </nav>   
    )
}