import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [theme, setTheme] = useState("default");

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username === "sravani" && password === "sravani@2304") {
      navigate("/dashboard", { state: { theme } });
    } else {
      toast.error("Login failed. Please check your username and password.");
    }
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  useEffect(() => {
    return () => {
      document.body.className = ""; 
    };
  }, []);

  return (
    <>
      <div className={`Login ${theme}`}>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
        />
        <div className="theme-options">
        <button onClick={() => changeTheme("default")} className={`${theme} theme-button`}>Default</button>
          <button onClick={() => changeTheme("theme1")}>Theme 1</button>
          <button onClick={() => changeTheme("theme2")}>Theme 2</button>
        </div>
        <div className="overlay">
          <form className="form" onSubmit={handleFormSubmit}>
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <span className="input-item">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  className="form-input"
                  type={passwordShown ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  required
                />
                <span onClick={togglePasswordVisibility}>
                  <i
                    className="fa fa-eye"
                    aria-hidden="true"
                    type="button"
                    id="eye"
                  ></i>
                </span>
                <br></br>
                <button className="log-in mt-2" type="submit" id="button">
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="themes">
          <span></span>
        </div>
      </div>
    </>
  );
};

export default Login;
