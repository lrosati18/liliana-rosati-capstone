import "./Form.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const BASE_URL = "https://api.mapbox.com/geocoding/v5";
const ENDPOINT = "mapbox.places";
const ACCESS_TOKEN =
  "?access_token=pk.eyJ1IjoibHJvc2F0aSIsImEiOiJjbHJwbnk5OGcwM2V5Mmxxcjl2bnFhYTV4In0.KLG2EA8LFGMjf4qYc8CFJQ";

function Form({ setMarkerCount, closeModal }) {
  const [place, setPlace] = useState("");
  const [coords, setCoords] = useState([]);
  const [popupText, setPopupText] = useState("");
  const [markerType, setMarkerType] = useState("visited");
  const [formData, setFormData] = useState({
    destination: "",
    details: "",
  });

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setPopupText(e.target.value);
    setFormData({ ...formData, details: e.target.value });
  };

  //function to call server request to geocode place and create lat and lng markers for place and add marker to page
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formInput = e.target.destination.value;
    const response = await axios.get(
      `${BASE_URL}/${ENDPOINT}/${formInput}.json${ACCESS_TOKEN}`
    );
    setPlace(response.data.features[0].place_name);
    setCoords(response.data.features[0].center);
    setFormData({ destination: "", details: "" });
  };

  const addMarker = async () => {
    const markerData = {
      latitude: coords[1],
      longitude: coords[0],
      name: place,
      visited: markerType,
      description: popupText,
    };
    try {
      const authToken = sessionStorage.getItem("authToken");

      if (!authToken) {
        console.error("User not authenticated");
        return;
      }

      const response = await axios.post(`${SERVER_URL}/markers`, markerData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setMarkerCount();
      console.log(setMarkerCount());
    } catch (error) {
      console.error("Could not save place: ", error);
    }
  };

  useEffect(() => {
    if (place && coords.length > 0) {
      addMarker();
    }
  }, [place, coords]);
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
