import Header from "../../components/Header/Header";
import "./LandingPage.scss";
import { Link } from "react-router-dom";

import redPin from "../../assets/images/red-pin.png";
import journal from "../../assets/images/journal.png";
import rocket from "../../assets/images/rocket.png";
import world from "../../assets/images/world.png";
import heroVideo from "../../assets/video/hero-video.mp4";

function LandingPage() {
  return (
    <section className="landingPage">
      <Header />
      <div className="landingPage__container">
        <main className="landingPage__main">
          <video className="landingPage__video" autoPlay muted>
            <source src={heroVideo} type="video/mp4"></source>
            Your browser does not support video tags
          </video>
        </main>
        <section className="features">
          <div className="features__container">
            <div className="features__heading">
              <img src={redPin} className="features__icon"></img>
              <h3>Your Personal Travel Map</h3>
            </div>
            <p className="features__description">
              Simplify your travel memories with our sleek and easy-to-use
              pinning feature. Mark the places you've been and watch your map
              transform into a visual travelogue. It's your digital passport to
              a world of exploration.
            </p>
          </div>
          <div className="features__container features__container--right">
            <div className="features__heading--right">
              <img src={journal} className="features__icon"></img>
              <h3>Private Travel Journal</h3>
            </div>
            <p className="features__description">
              Elevate your storytelling as you encapsulate each pin with
              personal notes, photos, and reflections. It's more than a map;
              it's your intimate travel diary that evolves with every journey.
            </p>
          </div>
          <div className="features__container">
            <div className="features__heading">
              <img src={rocket} className="features__icon"></img>
              <h3>Future Ready</h3>
            </div>
            <p className="features__description">
              While we currently focus on the joy of personal mapping, stay
              tuned for exciting updates! We've got plans to introduce features
              that will let you share your adventures with a global community
              and explore pins from fellow travellers in upcoming sprints.
            </p>
          </div>
          <div className="features__container features__container--right">
            <div className="features__heading--right">
              <img src={world} className="features__icon"></img>
              <h3>Start Pinning Today</h3>
            </div>
            <p className="features__description">
              Dive in to the simplicity of PinPoint. Signup, login, and begin
              crafting your travel narrative. As we evolve, so will your travel
              map - a snapshot of your journey through life.
            </p>
          </div>
        </section>
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
