import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editSite } from "../../store/sites";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Form.css';


export const EditSite = ({site, hideForm}) => {
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState(site.address);
    const [city, setCity] = useState(site.city)
    const [state, setState] = useState(site.state)
    const [country, setCountry] = useState(site.country)
    const [name, setName] = useState(site.name)
    const [price, setPrice] = useState(site.price)
    const [description, setDescription] = useState(site.description)
    const [url, setUrl] = useState(site.url)

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        const newSite = {
            ...site,
            userId: sessionUser.id,
            address,
            city,
            state,
            country,
            name,
            price,
            description,
            url
        }
        const updatedSite = await dispatch(editSite(newSite))
        .catch(async (res) => {
            const data = await res.json()
            if(data && data.errors) setErrors(data.errors) 
        })
        if(updatedSite){
            hideForm()
            setErrors([])
        }

    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
        setErrors([])
      };

   

    return (
        <section className='create-site-form'>
            <ul id="errors">
                {errors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form className="create-site" onSubmit={handleSubmit}>
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
                    required
                    onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <label id="newsite">Image URL
                    <input 
                    id="new-site-input"
                    src="URL"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    multiple
                    />
                </label>
                <div id="create-site-buttons">
                    <button type='submit'>Edit Site</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </div>                
           </form>
        </section>
    )

}