

export const SiteList = ({ site }) => {


    return (
        <li className='site-list'>
            <span>{site.name}</span>
            <span>{site.address}</span>
            <span>{site.city}</span>
            <span>{site.state}</span>
            <span>{site.country}</span>
            <span>{site.price}</span>
        </li>
    )
}