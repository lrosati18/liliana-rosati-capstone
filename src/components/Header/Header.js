import "./Header.scss";
import profileIcon from "../../assets/icons/profile-icon.svg";
import logo from "../../assets/logo/logo-v3.svg";

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <img src={logo} alt="logo" className="header__logo"></img>
        <img
          src={profileIcon}
          alt="profile icon"
          className="header__profile"
        ></img>
      </nav>
    </header>
  );
}

export default Header;
