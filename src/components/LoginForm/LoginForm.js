import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginForm.scss";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setErrorMessage("You must provide a username and a password");
      return;
    }

    try {
      const { data } = await axios.post(`${SERVER_URL}/login`, {
        username: formData.username,
        password: formData.password,
      });

      sessionStorage.setItem("authToken", data);
      setIsLoggedIn(true);
      navigate("/profile");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 403) {
          // Handle specific status codes
          setErrorMessage(error.response.data);
        } else {
          // Handle other status codes
          setErrorMessage("An error occurred during registration");
        }
      } else if (error.request) {
        // Handle network errors
        setErrorMessage("Network error occurred. Please try again later.");
      }
    }
  };

  return (
    <section className="login">
      <div className="form__wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__heading">Login</h2>
          <div className="form__group">
            <label htmlFor="username" className="form__label2">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => handleChange(e)}
              className="form__input"
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label2">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => handleChange(e)}
              className="form__input"
            />
          </div>
          <button className="form__button">Login</button>
          {errorMessage && <p className="form__error">{errorMessage}</p>}
          <p className="form__redirect">
            Don't have an account?
            <Link to="/register" className="form__link">
              Join today
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
