import "./Header.scss";
import { Link } from "react-router-dom";
import profileIcon from "../../assets/icons/profile-icon.svg";
import logo from "../../assets/logo/Heading.png";

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo"></img>
        </Link>
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
        <Link to="/register">
          <img
            src={profileIcon}
            alt="profile icon"
            className="header__profile"
          ></img>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
