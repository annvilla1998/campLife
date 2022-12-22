import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css';
import { NavLink, useHistory } from 'react-router-dom';

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // if(localStorage.getItem('location')){
    //   let href = localStorage.getItem('location');
    //   console.log(href)
    // }
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
      dispatch(sessionActions.login({ credential:'Demo-lition', password: 'password' }))
      history.push('/')
      
      // if(localStorage.getItem('location')){
      //   let href = localStorage.getItem('location');
      //   console.log(href)
      //   history.push(`${href}`)
      // }
  
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

export default LoginForm;
