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
  const [editMarkerId, setEditMarkerId] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  //get markers data from backend and convert to GeoJSON
  const fetchMarkers = async (editId) => {
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

      if (editId) {
        const selectedMarker = convertedResponse.features.find(
          (marker) => marker.properties.id === editId
        );

        // Handle the selected marker as needed
        console.log("Selected Marker for Edit:", selectedMarker);

        // Update selectedMarker state
        setSelectedMarker(selectedMarker);
      }
    } catch (error) {
      console.error(
        "Could not get marker coordinates: ",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    if (markerCount > 0) {
      fetchMarkers(editMarkerId);
    }
  }, [markerCount, editMarkerId, selectedMarker]);

  const handleMarkerCount = () => {
    setMarkerCount((prevCount) => prevCount + 1);
  };

  const handleOpenModal = () => {
    setEditMarkerId(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (id) => {
    setEditMarkerId(id);
    setIsModalOpen(true);

    // Call fetchMarkers with editMarkerId
    fetchMarkers(id);
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
          editMarkerId={editMarkerId}
          selectedMarker={selectedMarker}
          fetchMarkers={fetchMarkers}
        />
      )}
      <PlacesList features={features} onEditMarker={handleEditClick} />
    </section>
  );
}

export default Profile;
