import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createSite } from "../../store/sites";
import { useSelector } from "react-redux";
import './Form.css';


export const CreateSite = ({hideForm}) => {
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
    const [url, setUrl] = useState('')
    const [images, setImages] = useState([])


    const uploadImages = async(e) => {
        const file = e.target.files[0]
        setImages([...images,file])
        console.log(file)
    }

    const handleSubmit = async (e) => {
        let data = new FormData();
        images.forEach(image => {
            data.append("file[]", image)
        })
        console.log(data)
        dispatch(createSite(data));
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
     
    //     const newSite = {
    //         userId: sessionUser.id,
    //         address,
    //         city,
    //         state,
    //         country,
    //         name,
    //         price,
    //         description,
    //         url
    //     }
        
    //     let createdSite;
    //     createdSite = dispatch(createSite(newSite))
    //     .catch(async res => {
    //         const data = await res.json();
    //         console.log(data.errors)
    //         if(data && data.errors) setErrors(data.errors)
    //     })
    //     if(createdSite){
    //         setErrors([])
    //     }
    // }
    
    // if(newSiteObj){
    //     history.push(`/sites/${newSiteObj.id}`)
    // }

    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors([]);
        hideForm();
      };

    return (
        <section className='create-site-form'>
            <ul id="errors">
                {errors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="create-site">
                {/* <label id="newsite">Name
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
                    required
                    onChange={e => setDescription(e.target.value)}
                    />
                </label> */}
                <label id="newsite">Upload Images
                <input
                    type='file'
                    required
                    name="images"
                    accept='image/*'
                    id='add-photo-1'
                    onChange={uploadImages}> 
                </input>
                </label>
                <div id="create-site-buttons">
                    <button type='submit'>Host New Site</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>
        </section>
    )

}