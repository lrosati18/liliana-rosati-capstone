import Map from "../../components/Map/Map";
import Form from "../../components/Form/Form";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Profile() {
  const [markerCount, setMarkerCount] = useState(0);

  const handleMarkerCount = () => {
    setMarkerCount((prevCount) => prevCount + 1);
  };

  return (
    <section>
      <Header />
      <Map markerCount={markerCount} />
      <Form setMarkerCount={handleMarkerCount} />
      <Footer />
    </section>
  );
}

export default Profile;
