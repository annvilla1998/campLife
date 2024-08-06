import { NavLink } from "react-router-dom"
import { SiteContainer } from "./SiteContainer";


export const SiteList = ({ site }) => {

    return (
        <li className='site-list'>
            <SiteContainer site={site}>
                <NavLink className="site-list-link" exact to={`/sites/${site.id}`}>
                    <span className="site-name">{site.name}</span>
                </NavLink>
                <span>Address: {site.address}</span>
                <span>City: {site.city}</span>
                <span>State: {site.state}</span>
                <span>Country: {site.country}</span>
                <span className="price">${site.price}/night</span>
            </SiteContainer>
        </li>
    )
}