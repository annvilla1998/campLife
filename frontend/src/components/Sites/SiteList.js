import { NavLink } from "react-router-dom"
import { useState } from "react"


export const SiteList = ({ site }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [site.image1, site.image2, site.image3, site.image4];


    const swipeRight = () => {
        if(currentImage !== images.length - 1){
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
                        <span id='images'>
                            <NavLink className="site-list-link" exact to={`/sites/${site.id}`}>
                                <img alt="site" src={images[currentImage]} />
                            </NavLink>
                            {currentImage !== 0 && images.length > 1 &&
                                <i className="fa-solid fa-angle-left" onClick={swipeLeft}></i>
                            }
                            {currentImage !== images.length - 1 && images.length > 1 &&
                                <i className="fa-solid fa-angle-right" onClick={swipeRight}></i>
                            }
                        </span>
                    <NavLink className="site-list-link" exact to={`/sites/${site.id}`}>
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