import React, { useState } from 'react';

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with password:', password);
  };

  return (
    <>
      <div className="overlay">
        <form onSubmit={handleFormSubmit}>
          <div className="con">
            <header className="head-form">
              <h2>Log In</h2>
              <p>login here using your username and password</p>
            </header>
            <br />
            <div className="field-set">
              <span className="input-item">
                <i className="fa fa-user-circle"></i>
              </span>
              <input
                className="form-input"
                id="txt-input"
                type="text"
                placeholder="@UserName"
                required
              />
              <br />
              <span className="input-item">
                <i className="fa fa-key"></i>
              </span>
              <input
                className="form-input"
                type={passwordShown ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                name="password"
                required
              />
              <span onClick={togglePasswordVisibility}>
              <i className="fa fa-eye" aria-hidden="true"  type="button" id="eye"></i>
              </span>
              <br></br>
              <button className="log-in mt-2" type="submit" id='button'>
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
