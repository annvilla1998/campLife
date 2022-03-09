import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSiteDetails } from "../../store/sites";
import './SiteDetails.css'

export const SiteDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const site = useSelector(state => state.siteState.sites)
    // const [showEdit, setShowEdit] = useState(false)
    useEffect(() => {
        dispatch(getSiteDetails(id))
        // setShowEdit(false)
    },[dispatch, id])
    
    return (
        <div className="site-detail">
            <span>Site: {site.name}</span>
            <span>Address: {site.address}</span>
            <span>City: {site.city}</span>
            <span>State: {site.state}</span>
            <span>Country: {site.country}</span>
            <span>${site.price}/night</span>
        </div>
    )
}