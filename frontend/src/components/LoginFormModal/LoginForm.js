import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

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

  const demoSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setCredential('Demo-lition')
    setPassword('password')
    dispatch(sessionActions.login({ credential, password }))
  }

  return (
    <div>
      <h2 id="login-h2">Login In</h2>
      <div id="log-in-form">

          <form onSubmit={handleSubmit}>
            <div id="log-in-inputs">
              <ul id="errors">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
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
              <button type="submit">Log In</button>
            </div>
          </form>
          <form onSubmit={demoSubmit} >
              <button className='demo-button'>Demo</button>
          </form>
      </div>

    </div>
  );
}

export default LoginForm;