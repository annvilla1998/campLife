import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session'
import './SignupForm.css';
import { useHistory } from 'react-router-dom';
import collage from '../../assets/collage.png'

export const SignUpFormPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors,setErrors] = useState([])

    // if (sessionUser) return <Redirect to="/" />;

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if(password === confirmPassword) {
            

            let newUser = await dispatch(sessionActions.signUpUser({
                email,
                username,
                password
            }))
            .catch(async res => {
                const data = await res.json();
                console.log(data.errors)
                if(data && data.errors) setErrors(data.errors)
            })

            if(newUser){
                setErrors([]);
                history.push('/')
            }else{
                return errors
            }
        }else{ 
            return setErrors(['Passwords must match'])
        }
        }
    
    
    return (
        <div className="sign-up-page">
            <div id="outer-signup">
            <img alt="collage" src={collage} ></img>

            <form id="sign-up-form" onSubmit={onSubmit}>
                <h2>Sign Up</h2>
                <ul id="errors">
                    {errors.map((errors,idx) => (
                        <li key={idx}>{errors}</li>
                    ))}
                </ul>
                <div id="log-in-inputs">
                <label className="sign-up-label">
                    Username 
                    <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required />
                </label>
                <label className="sign-up-label">
                    Email
                    <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required/>
                </label>
                <label className="sign-up-label">
                    Password
                    <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
                </label>
                <label className="sign-up-label">
                    Confirm Password
                    <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required/>
                </label>
                </div>  
                <button className="sign-up-button" type='submit'>Sign Up</button>
            </form>
            </div>
        </div>
    )
}