import { NavLink } from "react-router-dom"


export const SiteList = ({ site }) => {


    return (
        <NavLink exact to='/sites/:id'>
            <li className='site-list'>
                <span>Site: {site.name}</span>
                <span>Address: {site.address}</span>
                <span>City: {site.city}</span>
                <span>State:{site.state}</span>
                <span>Country: {site.country}</span>
                <span>${site.price}/night</span>
            </li>
        </NavLink>
    )
}