import "./Form.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import convertToGeoJSON from "../../utils/convertToGeoJson";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const BASE_URL = "https://api.mapbox.com/geocoding/v5";
const ENDPOINT = "mapbox.places";
const ACCESS_TOKEN =
  "?access_token=pk.eyJ1IjoibHJvc2F0aSIsImEiOiJjbHJwbnk5OGcwM2V5Mmxxcjl2bnFhYTV4In0.KLG2EA8LFGMjf4qYc8CFJQ";

function Form({ setMarkerCount, closeModal, editMarkerId, selectedMarker }) {
  const [place, setPlace] = useState("");
  const [coords, setCoords] = useState([]);
  const [popupText, setPopupText] = useState("");
  const [markerType, setMarkerType] = useState("visited");
  const [formData, setFormData] = useState({
    destination: "",
    details: "",
  });

  // Function to fetch data for the marker in edit mode
  // const fetchEditMarkerData = async () => {
  //   try {
  //     console.log(
  //       "Calling fetchEditMarkerData with editMarkerId:",
  //       editMarkerId
  //     );
  //     const response = await axios.get(
  //       `${SERVER_URL}/markers/edit/${editMarkerId}`
  //     );

  //     const convertedData = convertToGeoJSON([response.data]);

  //     setFormData({
  //       destination: convertedData.features[0].properties.title,
  //       details: convertedData.features[0].properties.description,
  //     });
  //     setMarkerType(convertedData.features[0].properties.visited);
  //     console.log("Edit Marker GeoJSON Data:", convertedData);
  //   } catch (error) {
  //     console.error("Could not fetch marker data for edit: ", error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("editMarkerId:", editMarkerId);
  //   if (editMarkerId) {
  //     // Fetch data for the marker in edit mode
  //     fetchEditMarkerData();
  //   }
  // }, [editMarkerId]);

  // useEffect(() => {
  //   console.log("editMarkerId:", editMarkerId);
  //   if (editMarkerId && selectedMarker) {
  //     // Set the form data based on the selected marker
  //     setFormData({
  //       destination: selectedMarker.properties.title,
  //       details: selectedMarker.properties.description,
  //     });
  //     setMarkerType(selectedMarker.properties.visited);
  //   }
  // }, [editMarkerId, selectedMarker]);

  // const handleDescriptionChange = (e) => {
  //   e.preventDefault();
  //   setPopupText(e.target.value);
  //   setFormData({ ...formData, details: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (editMarkerId) {
  //       // PUT request for updating existing marker
  //       const response = await axios.put(
  //         `${SERVER_URL}/markers/edit/${editMarkerId}`,
  //         formData
  //       );
  //       console.log("Marker updated");
  //     } else {
  //       // POST request for adding a new marker
  //       const formInput = e.target.destination.value;
  //       const response = await axios.get(
  //         `${BASE_URL}/${ENDPOINT}/${formInput}.json${ACCESS_TOKEN}`
  //       );

  //       if (response.data.features && response.data.features.length > 0) {
  //         setPlace(response.data.features[0].place_name);
  //         setCoords(response.data.features[0].center);
  //       } else {
  //         console.error("Invalid response structure for adding a new marker.");
  //         return;
  //       }

  //       setFormData({ destination: "", details: "" });
  //     }
  //   } catch (err) {
  //     console.error("Error: ", err);
  //   }
  // };

  //function to call server request to geocode place and create lat and lng markers for place and add marker to page
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formInput = e.target.destination.value;
  //   const response = await axios.get(
  //     `${BASE_URL}/${ENDPOINT}/${formInput}.json${ACCESS_TOKEN}`
  //   );
  //   setPlace(response.data.features[0].place_name);
  //   setCoords(response.data.features[0].center);
  //   setFormData({ destination: "", details: "" });
  // };

  // const addMarker = async () => {
  //   const markerData = {
  //     latitude: coords[1],
  //     longitude: coords[0],
  //     name: place,
  //     visited: markerType,
  //     description: popupText,
  //   };
  //   try {
  //     const authToken = sessionStorage.getItem("authToken");

  //     if (!authToken) {
  //       console.error("User not authenticated");
  //       return;
  //     }

  //     const response = await axios.post(`${SERVER_URL}/markers`, markerData, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });

  //     setMarkerCount();
  //   } catch (error) {
  //     console.error("Could not save place: ", error);
  //   }
  // };

  // useEffect(() => {
  //   if (place && coords.length > 0) {
  //     addMarker();
  //   }
  // }, [place, coords]);

  useEffect(() => {
    console.log("editMarkerId:", editMarkerId);
    if (editMarkerId && selectedMarker) {
      // Set the form data based on the selected marker
      setFormData({
        destination: selectedMarker.properties.title,
        details: selectedMarker.properties.description,
      });
      setMarkerType(selectedMarker.properties.visited);
    }
  }, [editMarkerId, selectedMarker]);

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setPopupText(e.target.value);
    setFormData({ ...formData, details: e.target.value });
  };

  // Function to geocode the destination
  const geocodeDestination = async (formInput) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/${ENDPOINT}/${formInput}.json${ACCESS_TOKEN}`
      );

      if (response.data.features && response.data.features.length > 0) {
        setPlace(response.data.features[0].place_name);
        setCoords(response.data.features[0].center);
      } else {
        console.error("Invalid response structure for geocoding.");
        return false;
      }
    } catch (error) {
      console.error("Error during geocoding: ", error);
      return false;
    }
  };

  // Define the addMarker function
  const addMarker = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");

      if (!authToken) {
        console.error("User not authenticated");
        return;
      }

      const markerData = {
        latitude: coords[1],
        longitude: coords[0],
        name: place,
        visited: markerType,
        description: popupText,
      };

      const response = await axios.post(`${SERVER_URL}/markers`, markerData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setMarkerCount();
    } catch (error) {
      console.error("Could not save place: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let markerData;

      if (editMarkerId) {
        const authToken = sessionStorage.getItem("authToken");

        if (!authToken) {
          console.error("User not authenticated");
          return;
        }
        // PUT request for updating an existing marker
        markerData = {
          latitude: coords[1],
          longitude: coords[0],
          name: place,
          visited: markerType,
          description: popupText,
        };

        const response = await axios.put(
          `${SERVER_URL}/markers/edit/${editMarkerId}`,
          markerData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Marker updated");
      } else {
        // POST request for adding a new marker
        const formInput = e.target.destination.value;

        // Call the geocoding function
        const geocodeSuccess = await geocodeDestination(formInput);

        if (!geocodeSuccess) {
          // Stop execution if geocoding fails
          return;
        }

        // The markerData is now properly defined
        markerData = {
          latitude: coords[1],
          longitude: coords[0],
          name: place,
          visited: markerType,
          description: popupText,
        };

        // Call the addMarker function
        await addMarker();
        console.log("Marker added");
      }

      setMarkerCount();
    } catch (err) {
      console.error("Error: ", err);
    }
  };
  return (
    <section className="modal">
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      <form className="form2" onSubmit={handleSubmit}>
        <h2 className="form__title">Your Trip</h2>
        <div className="form__group">
          <label className="form__label">Destination:</label>
          <input
            className="form__input"
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={(e) =>
              setFormData({ ...formData, destination: e.target.value })
            }
          ></input>
        </div>
        <div className="form__group">
          <label className="form__label">Details:</label>
          <textarea
            className="form__input form__input--textarea"
            type="textarea"
            name="description"
            placeholder="Where did you stay? What did you do? Favourite restaurants? What did you buy? Tell us everythinggggg!"
            value={formData.details}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="form__group">
          <label className="form__label">Select One:</label>
          <select
            className="form__input"
            name="type"
            value={markerType}
            onChange={(e) => setMarkerType(e.target.value)}
          >
            <option className="form__option" value="visited">
              Visited
            </option>
            <option className="form__option" value="notVisited">
              Not Visited
            </option>
          </select>
        </div>
        <button className="form__button" type="submit">
          Pin it!
        </button>
      </form>
    </section>
  );
}

export default Form;
