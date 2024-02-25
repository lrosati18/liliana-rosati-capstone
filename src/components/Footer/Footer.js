import "./Footer.scss";
import { Link } from "react-router-dom";
import pinpointLogo from "../../assets/logo/pin-logo.png";
import linkedin from "../../assets/icons/linkedin-white.png";
import github from "../../assets/icons/github-white.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__section">
        <img className="footer__logo" src={pinpointLogo} alt="logo"></img>
      </div>
      <div className="footer__section">
        <nav className="footer__nav">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <Link to="/login" className="footer__link">
            Login
          </Link>
          <Link to="/register" className="footer__link">
            Register
          </Link>
        </nav>
      </div>
      <div className="footer__section">
        <h4>Let's Connect! </h4>
        <nav className="social">
          <Link
            to="https://www.linkedin.com/in/lilianarosati/"
            className="social__link"
          >
            <img
              src={linkedin}
              className="social__icon"
              alt="linkedin logo"
            ></img>
          </Link>
          <Link to="https://github.com/lrosati18" className="social__link">
            <img src={github} className="social__icon" alt="github logo"></img>
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
