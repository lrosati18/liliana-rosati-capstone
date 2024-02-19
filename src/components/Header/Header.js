import "./Header.scss";
import { Link } from "react-router-dom";
import profileIcon from "../../assets/icons/profile-icon.svg";
import logo from "../../assets/logo/logo-v3.svg";

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/">
          <img src={logo} alt="logo" className="header__logo"></img>
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
