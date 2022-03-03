import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../../store/session";
import { Redirect } from "react-router-dom";
import './LoginForm.css'


export const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if(sessionUser) return (
        <Redirect to='/' />
    )

    const onSubmit = async (e) => {
        e.preventDefault()

        setErrors([]);

        const user = {
            credential,
            password
        }
        return dispatch(login(user))
        .catch(async res => {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors);
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <ul>
                {errors.map(errors => {
                    //may cause an error
                    <li key={errors}>{errors}</li>
                })}
            </ul>
            <label>
                Username or Email
                <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required />
            </label>
            <label>
                Password
                <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required />
            </label>
            <button type="submit">Log In</button>
        </form>
    )
}