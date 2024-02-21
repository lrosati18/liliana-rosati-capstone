import Map from "../../components/Map/Map";
import Form from "../../components/Form/Form";
import { useState } from "react";

function Profile() {
  const [markerCount, setMarkerCount] = useState(0);

  const handleMarkerCount = () => {
    setMarkerCount((prevCount) => prevCount + 1);
  };

  return (
    <section>
      <Map markerCount={markerCount} />
      <Form setMarkerCount={handleMarkerCount} />
    </section>
  );
}

export default Profile;
