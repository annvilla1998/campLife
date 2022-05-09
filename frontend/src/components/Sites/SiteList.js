import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllSites } from "../../store/sites"
import { Images } from "./Images";


export const SiteList = ({ site }) => {
//     const sites = useSelector(state => state.siteState.sites)
//     const sitesArr = Object.values(sites[site.id])
console.log(site.images)

    return (
        <NavLink className="site-list-link" exact to={`/sites/${site.id}`}>
            <li className='site-list'>
                <div className='site-list-detail-container'>
                    <i className="fa-solid fa-angle-right"></i>
                        <span id='images'>
                            {site.images.map(image => (
                                    <div key={image}>
                                        <Images image={image} />
                                    </div> 
                            ))} 
                        </span>
                    <i className="fa-solid fa-angle-left"></i> 
                    <div id='site-list-text'>
                        <span>Site: {site.name}</span>
                        <span>Address: {site.address}</span>
                        <span>City: {site.city}</span>
                        <span>State: {site.state}</span>
                        <span>Country: {site.country}</span>
                        <span>${site.price}/night</span>
                    </div>
                </div>
            </li>
        </NavLink>
    )
}