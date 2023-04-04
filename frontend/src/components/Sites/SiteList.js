import { NavLink } from "react-router-dom"
import { useState } from "react"


export const SiteList = ({ site }) => {
    const [currentImage, setCurrentImage] = useState(0)


    const swipeRight = () => {
        if(currentImage !== site.images.length - 1){
            setCurrentImage(currentImage + 1)
        }
    }

    const swipeLeft = () => {
        if(currentImage !== 0){
            setCurrentImage(currentImage - 1)
        }
    }

    return (
        <li className='site-list'>
                <div className='site-list-detail-container'>
                    <NavLink className="site-list-link" exact to={`/sites/${site.id}`}>
                        <span id='images'>
                            <img alt="site" src={site.images[currentImage]} />
                            {currentImage !== 0 && site.images.length > 1 &&
                                <i className="fa-solid fa-angle-left" onClick={swipeLeft}></i>
                            }
                            {currentImage !== site.images.length - 1 && site.images.length > 1 &&
                                <i className="fa-solid fa-angle-right" onClick={swipeRight}></i>
                            }
                        </span>
                    <div id='site-list-text'>
                        <span className="site-name">{site.name}</span>
                        <span>Address: {site.address}</span>
                        <span>City: {site.city}</span>
                        <span>State: {site.state}</span>
                        <span>Country: {site.country}</span>
                        <span className="price">${site.price}/night</span>
                    </div>
                </NavLink>
                </div>
            </li>
    )
}