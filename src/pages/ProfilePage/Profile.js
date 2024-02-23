import Map from "../../components/Map/Map";
import Form from "../../components/Form/Form";
import UserInfo from "../../components/UserInfo/UserInfo";
import { useState, useEffect } from "react";
import convertToGeoJson from "../../utils/convertToGeoJson";
import PlacesList from "../../components/PlacesList/PlacesList";
import axios from "axios";

import "./Profile.scss";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Profile() {
  const [markerCount, setMarkerCount] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [features, setFeatures] = useState([]);

  //get markers data from backend and convert to GeoJSON
  const fetchMarkers = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");

      if (!authToken) {
        console.error("User not authenticated");
        return;
      }

      const response = await axios.get(`${SERVER_URL}/markers`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const convertedResponse = convertToGeoJson(response.data);
      setMarkers(convertedResponse);
      setFeatures(convertedResponse.features);
    } catch (error) {
      console.error(
        "Could not get marker coordinates: ",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    if (markerCount > 0) {
      fetchMarkers();
    }
  }, [markerCount]);

  const handleMarkerCount = () => {
    setMarkerCount((prevCount) => prevCount + 1);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <UserInfo />
      <Map
        markerCount={markerCount}
        fetchMarkers={fetchMarkers}
        markers={markers}
      />
      <button className="button" onClick={handleOpenModal}>
        Add New Pin
      </button>
      {isModalOpen && (
        <Form
          closeModal={handleCloseModal}
          setMarkerCount={handleMarkerCount}
        />
      )}
      <PlacesList features={features} />
    </section>
  );
}

export default Profile;
