import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createSite } from "../../store/sites";

export const CreateSite = ({hideForm}) => {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch;
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")


    // useEffect(() => {
    //     dispatc
    // })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newSite = {
            address,
            city,
            state,
            country,
            name,
            price,
            description
        }
        let createdSite;
        try {
            createdSite = await dispatch(createdSite(newSite))
        }catch (res){
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors)
        }
        if(createdSite){
            setErrors([])
            history.push(`/sites/${createdSite.id}`)
            hideForm()
        }

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
                <label>Image
                    <input 
                    type="image"
                    
                    multiple
                    />
                </label>
                <button type='submit'>Host New Site</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )

}