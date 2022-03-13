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
            url
        }
        
        let createdSite;
        createdSite = dispatch(createSite(newSite))

        setErrors([])
        
    }
    
    if(newSiteObj){
        history.push(`/sites/${newSiteObj.id}`)
    }



    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrors([]);
        hideForm();
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
                <button type='submit'>Host New Site</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )

}