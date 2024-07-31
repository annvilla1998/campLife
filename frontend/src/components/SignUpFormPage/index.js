import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session'
import './SignupForm.css';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export const SignUpFormPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors,setErrors] = useState([])

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

            <form id="sign-up-form" onSubmit={onSubmit}>
                <div id="log-in-container" >
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
                    <div className="sign-up-button-container">
                        <button className="sign-up-button" type='submit'>Sign Up</button>
                        <NavLink to="/login">Already have an account?</NavLink>
                    </div>  
                </div>
                <footer>
                <div id="technologies-used">
                    <p>Javascript</p>
                    <p>React</p>
                    <p>Redux</p>
                    <p>PostgreSQL</p>
                    <p>CSS</p>
                    <p>HTML</p>
                    <p>Node.js/Express.js</p>
                </div>
                <a href="https://www.linkedin.com/in/anabel-villalobos-5772ab196/">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
                <a id="github" href='https://github.com/annvilla1998/campLife'>
                  <i className="fa-brands fa-github"></i>
                </a>
            </footer>
            </form>
            </div>
        </div>
    )
}