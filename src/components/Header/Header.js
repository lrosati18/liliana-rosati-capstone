import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../../assets/icons/profile-icon.svg";
import logo from "../../assets/logo/Heading.png";
import { useState } from "react";

function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function from the parent component
    alert("Logged out successfully");
    navigate("/"); // Navigate to the homepage
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo"></img>
        </Link>
        <div className="header__wrapper">
          <Link to="/register" className="header__link">
            Register
          </Link>
          <Link to="/login" className="header__link">
            Login
          </Link>
          <Link to="/explore" className="header__link">
            Explore
          </Link>
          <Link to="/activity" className="header__link">
            Activity
          </Link>
        </div>
        <div
          className="dropdown"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          <Link to="/profile">
            <img
              src={profileIcon}
              alt="profile icon"
              className="header__profile"
            ></img>
          </Link>
          {isLoggedIn && isDropdownVisible && (
            <div className="dropdown__content">
              <button className="dropdown__button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
