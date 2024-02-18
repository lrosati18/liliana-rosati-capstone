import "./LandingPage.scss";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <section className="landingPage">
      {/* <img  alt="pinpoint logo"></img> */}
      <div className="landingPage__container">
        <Link to="/register" className="landingPage__link">
          Register
        </Link>
        <Link to="/login" className="landingPage__link">
          Login
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;
