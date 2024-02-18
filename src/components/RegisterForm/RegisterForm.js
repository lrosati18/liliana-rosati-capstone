import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const RegisterForm = ({ setIsRegistered }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  // When any input changes, update the correct field in state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.confirmPassword
    ) {
      setErrorMessage("Please fill in all the form fields");
      return;
    }

    try {
      await axios.post(`${SERVER_URL}/register`, {
        username: formData.username,
        password: formData.password,
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        confirmPassword: formData.confirmPassword,
      });

      setIsRegistered(true);
      navigate("/profile");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 403) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("An error occurred during registration");
        }
      } else if (error.request) {
        setErrorMessage("Network error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            name="username"
            id="userName"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="passwordRegister">Password</label>
          <input
            type="password"
            name="password"
            id="passwordRegister"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="passwordRegister">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPasswordRegister"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="emailRegister">Email</label>
          <input
            type="email"
            name="email"
            id="emailRegister"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button>Signup</button>
        {errorMessage && <p>{errorMessage}</p>}
        {/* {successMessage && <p>{successMessage}</p>} */}
      </form>
    </>
  );
};

export default RegisterForm;
