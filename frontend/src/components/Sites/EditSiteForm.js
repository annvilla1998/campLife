import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editSite } from "../../store/sites";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


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
            <ul>
                {errors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label>Name
                    <input
                    type='text'
                    value={name}
                    required
                    onChange={e => setName(e.target.value)} 
                    />
                </label>
                <label> Address
                    <input
                    type="text"
                    value={address}
                    required
                    onChange={e => setAddress(e.target.value)}
                    />
                </label>
                <label>City
                    <input
                    type="text"
                    value={city}
                    required
                    onChange={e => setCity(e.target.value)}
                    />
                </label>
                <label>State
                    <input
                    type="text"
                    value={state}
                    required
                    onChange={e => setState(e.target.value)}
                    />
                </label>
                <label>Country
                    <input
                    type="text"
                    value={country}
                    required
                    onChange={e => setCountry(e.target.value)}
                    />
                </label>
                <label>Price
                    <input
                    type="number"
                    value={price}
                    required
                    onChange={e => setPrice(e.target.value)}
                    />
                </label>
                <label>Description
                    <textarea
                    rows="5" 
                    cols="33"
                    value={description}
                    required
                    onChange={e => setDescription(e.target.value)}
                    />
                </label>
                <label>Image URL
                    <input 
                    src="URL"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    multiple
                    />
                </label>
                <button type='submit'>Edit Site</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )

}