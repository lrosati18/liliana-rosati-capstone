import "./Form.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const BASE_URL = "https://api.mapbox.com/geocoding/v5";
const ENDPOINT = "mapbox.places";
const ACCESS_TOKEN =
  "?access_token=pk.eyJ1IjoibHJvc2F0aSIsImEiOiJjbHJwbnk5OGcwM2V5Mmxxcjl2bnFhYTV4In0.KLG2EA8LFGMjf4qYc8CFJQ";

function Form({ setMarkerCount }) {
  const [place, setPlace] = useState("");
  const [coords, setCoords] = useState([]);
  //function to call server request to geocode place and create lat and lng markers for place and add marker to page
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formInput = e.target.destination.value;
    const response = await axios.get(
      `${BASE_URL}/${ENDPOINT}/${formInput}.json${ACCESS_TOKEN}`
    );
    setPlace(response.data.features[0].place_name);
    setCoords(response.data.features[0].center);
  };

  const addMarker = async () => {
    const markerData = {
      userId: 111,
      latitude: coords[1],
      longitude: coords[0],
      name: place,
    };
    try {
      const response = await axios.post(`${SERVER_URL}/markers`, markerData);
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
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Your Trip</h2>
        <label className="form__label">
          Destination:
          <input
            className="form__input"
            type="text"
            name="destination"
            placeholder="Destination"
          ></input>
        </label>
        <button className="form__button" type="submit">
          Pin it!
        </button>
      </form>
      {/* <p className="place__info">Place: {place}</p>
      <p className="place__info">Longitude: {coords[0]}</p>
      <p className="place__info">Latitude: {coords[1]}</p> */}
    </>
  );
}

export default Form;
