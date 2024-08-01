import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createSite } from "../../store/sites";
import { useSelector } from "react-redux";
import './Form.css';


export const CreateSite = ({ setShowSiteModal }) => {
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const newSiteObj = useSelector(state => state.siteState.newSite)

    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])


    const uploadImages = async (e) => {
        const file = e.target.files[0]
        setImages([...images, URL.createObjectURL(file)])
    }

    const updateImage = (e) => {
        const file = e.target.files[0]
        setImages([...images, URL.createObjectURL(file)])
        e.target.value = null;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSite = {
            userId: sessionUser.id,
            address,
            city,
            state,
            country,
            name,
            price,
            description,
            image1: images[0],
            image2: images[1],
            image3: images[2],
            image4: images[3]
        }


        let createdSite;
        createdSite = dispatch(createSite(newSite))
            .catch(async res => {
                const data = await res.json();

                if (data && data.errors) setErrors(data.errors)
            })
        if (createdSite) {
            setErrors([])
        }
    }

    if (newSiteObj) {
        history.push(`/sites/${newSiteObj.id}`)
    }

    const deleteImage = async (e, i) => {
        e.preventDefault()

        let newImages = images.filter((image, index) => {
            return i !== index
        })

        setImages(newImages)
    }

    return (
        <section className='create-site-form'>
            <h2>Host a Campsite</h2>
            <ul id="errors">
                {errors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="create-site">
                <div className="form-info">

                    <label id="newsite">Name
                        <input
                            id="new-site-input"
                            type='text'
                            value={name}
                            required
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                    <label id="newsite"> Address
                        <input
                            id="new-site-input"
                            type="text"
                            value={address}
                            required
                            onChange={e => setAddress(e.target.value)}
                        />
                    </label>
                    <label id="newsite">City
                        <input
                            id="new-site-input"
                            type="text"
                            value={city}
                            required
                            onChange={e => setCity(e.target.value)}
                        />
                    </label>
                    <label id="newsite">State
                        <input
                            id="new-site-input"
                            type="text"
                            value={state}
                            required
                            onChange={e => setState(e.target.value)}
                        />
                    </label>
                    <label id="newsite">Country
                        <input
                            id="new-site-input"
                            type="text"
                            value={country}
                            required
                            onChange={e => setCountry(e.target.value)}
                        />
                    </label>
                    <label id="newsite">Price
                        <input
                            id="new-site-input"
                            type="number"
                            value={price}
                            required
                            onChange={e => setPrice(e.target.value)}
                        />
                    </label>
                    <label id="newsite">Description
                        <textarea
                            id="new-site-input"
                            rows="5"
                            cols="33"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div className="upload-images">
                    {!images.length && (
                        <label id="newsite">Upload Image
                            <input
                                type='file'
                                required
                                name="images"
                                multiple
                                alt='site-image'
                                accept='image/*'
                                id='add-photo'
                                onChange={uploadImages}>
                            </input>
                        </label>
                    )}
                    {images.length ? (
                        <>
                            <div className='photo-preview-container'>
                                {images.map((ele, i) => {
                                    return (
                                        <div key={i}>
                                            <i onClick={(e) => deleteImage(e, i)} className="fa-solid fa-xmark"></i>
                                            <img alt="site" src={ele}></img>
                                        </div>

                                    )
                                })}
                            </div>
                            <div className="image-upload-error-container">
                                {images.length >= 4 && <p>4 images is the max. Please remove one before adding another.</p>}
                                <label id="newsite upload-image" className={images.length >= 4 ? "max-images" : ""}>Upload Images
                                    <input
                                        type='file'
                                        name="images"
                                        multiple
                                        alt='site-image'
                                        accept='image/*'
                                        id='add-more-photos'
                                        onChange={updateImage}>
                                    </input>
                                </label>
                            </div>
                        </>
                    ) : null}
                </div>
                <div id="create-site-buttons">
                    <button type='submit'>Host New Site</button>
                    <button type="button" onClick={() => setShowSiteModal(false)}>Cancel</button>
                </div>
            </form>
        </section>
    )

}