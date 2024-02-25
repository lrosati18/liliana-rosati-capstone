import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterForm.scss";

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
      navigate("/login");
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
    <section className="register">
      <form className="form form2" onSubmit={handleSubmit}>
        <h2 className="form__heading">Register</h2>
        <div className="form__group">
          <label htmlFor="userName" className="form__label2">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="userName"
            onChange={(e) => handleChange(e)}
            className="form__input"
          />
        </div>
        <div className="form__group">
          <label htmlFor="passwordRegister" className="form__label2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="passwordRegister"
            className="form__input"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="passwordRegister" className="form__label2">
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPasswordRegister"
            onChange={(e) => handleChange(e)}
            className="form__input"
          />
        </div>
        <div className="form__group">
          <label htmlFor="firstName" className="form__label2">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => handleChange(e)}
            className="form__input"
          />
        </div>
        <div className="form__group">
          <label htmlFor="lastName" className="form__label2">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => handleChange(e)}
            className="form__input"
          />
        </div>
        <div className="form__group">
          <label htmlFor="emailRegister" className="form__label2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="emailRegister"
            onChange={(e) => handleChange(e)}
            className="form__input"
          />
        </div>
        <button className="form__button">Signup</button>
        {errorMessage && <p className="form__error">{errorMessage}</p>}
        <p className="form__redirect">
          Already a member?{" "}
          <Link to="/login" className="form__link">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterForm;
