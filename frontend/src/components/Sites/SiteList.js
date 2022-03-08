

export const SiteList = ({ site }) => {


    return (
        <li className='site-list'>
            <span>Site: {site.name}</span>
            <span>Address: {site.address}</span>
            <span>City: {site.city}</span>
            <span>State:{site.state}</span>
            <span>Country: {site.country}</span>
            <span>${site.price}/night</span>
        </li>
    )
}