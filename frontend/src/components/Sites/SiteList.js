import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllSites } from "../../store/sites"

export const SiteList = ({ site }) => {
    const imageObj = useSelector(state => state.siteState.images)
    const imagesArr = Object.values(imageObj)


    return (
        <NavLink className="site-list-link" exact to={`/sites/${site.id}`}>
            <li className='site-list'>
                <div className='site-list-detail-container'>
                    <span id='images'>
                        {imagesArr.map(({ siteId, url }) => (
                            siteId === site.id ? (
                                <img key={url} src={url}/>
                            )
                        : null))}
                    </span>
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