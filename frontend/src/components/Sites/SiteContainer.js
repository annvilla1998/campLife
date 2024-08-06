import { NavLink } from "react-router-dom"
import { useState } from "react"


export const SiteContainer = ({ children, site }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [site?.image1, site?.image2, site?.image3, site?.image4].filter(image => image);

    const swipeRight = () => {
        if (currentImage !== images.length - 1) {
            setCurrentImage(currentImage + 1)
        }
    }

    const swipeLeft = () => {
        if (currentImage !== 0) {
            setCurrentImage(currentImage - 1)
        }
    }

    return (
        <div className='site-list-detail-container'>
            <span id='images'>
                <NavLink className="site-list-link" exact to={`/sites/${site.id}`}>
                    <img alt="site" className="site-image" src={images[currentImage]} />
                </NavLink>
                {currentImage !== 0 && images.length > 1 &&
                    <i className="fa-solid fa-angle-left" onClick={swipeLeft}></i>
                }
                {currentImage !== images.length - 1 && images.length > 1 &&
                    <i className="fa-solid fa-angle-right" onClick={swipeRight}></i>
                }
            </span>
                <div className='site-list-text'>
                    {children}
                </div>
        </div>
    )
}