import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer__nav">
        <Link to="/" className="footer__link">
          Home
        </Link>
        <Link to="/login" className="footer__link">
          Login
        </Link>
        <Link to="/register" className="footer__link">
          Signup
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
