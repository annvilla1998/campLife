import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import './SignupForm.css';
import { useHistory } from 'react-router-dom';

export const SignUpFormPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors,setErrors] = useState([])

    // if (sessionUser) return <Redirect to="/" />;

    const onSubmit = (e) => {
        e.preventDefault();
        
        setErrors([]);
        if(password === confirmPassword) {
            
            dispatch(sessionActions.signUpUser({
                email,
                username,
                password
            }))
            .catch(async res => {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors)
            })
            return history.push('/')
        }else{ 
            return setErrors(['Passwords must match'])
        }
    }
    
    return (
        <form>
            <ul>
                {errors.map((errors,idx) => (
                    <li key={idx}>{errors}</li>
                ))}
            </ul>
            <label>
                Username
                <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required />
            </label>
            <label>
                Email
                <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required/>
            </label>
            <label>
                Password
                <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required />
            </label>
            <label>
                Confirm Password
                <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required/>
            </label>
            <div onClick={onSubmit}>Sign Up</div>
        </form>
    )
}