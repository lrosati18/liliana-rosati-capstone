import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      console.log(data);
      console.log(data);

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
    <>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button>Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </>
  );
};

export default LoginForm;
