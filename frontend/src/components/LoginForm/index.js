import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css';
import { NavLink } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    // setCredential('Demo-lition')
    // setPassword('password')
    dispatch(sessionActions.login({ credential:'Demo-lition', password: 'password' }))
  }
  
  
  return (
      <div className="sign-up-page">
          <div id="outer-signup">

          <form id="sign-up-form" onSubmit={handleSubmit}>
            <div id="log-in-container">
              <h2>Login</h2>
              <ul id="errors">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <div id="log-in-inputs">
                <label className="login-labels">
                  Username or Email
                  <input
                    id="login-input"
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                </label>
                <label className="login-labels">
                  Password
                  <input
                    id="login-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <div className="login-demo">
                  <button type="submit">Log In</button>
                  <button onClick={demoLogin} className='demo-button'>Demo</button>
                </div>
                <div className="signup-link-from-login">
                  <NavLink to="/signup">Don't have an account yet?</NavLink>
                </div>
              </div>
            </div>
          </form>
      </div>

    </div>
  )
}

export default LoginForm;
