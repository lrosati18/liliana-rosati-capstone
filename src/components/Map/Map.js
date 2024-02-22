import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./Map.scss";
import "mapbox-gl/dist/mapbox-gl.css";
// import convertToGeoJson from "../../utils/convertToGeoJson";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Map({ markerCount, markers, fetchMarkers }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-10.9);
  const [lat, setLat] = useState(25.35);
  const [zoom, setZoom] = useState(1.75);
  // const [markers, setMarkers] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/lrosati/clsnz7v1o04cy01nl7ycl3fn8",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      fetchMarkers();
    });
  }, [map]);

  //get markers data from backend and convert to GeoJSON
  // const fetchMarkers = async () => {
  //   try {
  //     const authToken = sessionStorage.getItem("authToken");

  //     if (!authToken) {
  //       console.error("User not authenticated");
  //       return;
  //     }

  //     const response = await axios.get(`${SERVER_URL}/markers`, {
  //       headers: { Authorization: `Bearer ${authToken}` },
  //     });

  //     // console.log("server response: ", response.data);

  //     // console.log("got the markers");
  //     const convertedResponse = convertToGeoJson(response.data);
  //     // console.log("converted the markers");
  //     // console.log("converted response: ", convertedResponse);
  //     setMarkers(convertedResponse);
  //   } catch (error) {
  //     console.error(
  //       "Could not get marker coordinates: ",
  //       error.response || error.message
  //     );
  //   }
  // };

  useEffect(() => {
    if (markers.length === 0 || !map.current) return;

    const sourceId = "api";

    // Remove existing source and layer if they exist
    if (map.current.getSource(sourceId)) {
      map.current.removeLayer("points");
      map.current.removeSource(sourceId);
    }

    //Add GeoJSON source for markers
    map.current.addSource("api", {
      type: "geojson",
      data: markers,
    });

    console.log("added source");

    //Add layer for markers
    map.current.addLayer({
      id: "points",
      type: "symbol",
      source: "api",
      layout: {
        "icon-image": "circle",
        "icon-allow-overlap": true,
        "icon-size": 1.5,
      },
    });

    // Add click event listener for markers to show popups
    map.current.on("click", "points", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      if (popup) {
        popup.remove();
      }

      const newPopup = new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map.current);
      console.log("element clicked");
      console.log("popup created");
      console.log("content: ", description);
      setPopup(newPopup);
    });

    console.log("Markers added to the map");
  }, [markerCount, markers]);

  // useEffect(() => {
  //   if (markerCount > 0) {
  //     fetchMarkers();
  //   }
  // }, [markerCount]);

  return (
    <div className="map">
      <div ref={mapContainer} className="map__container" />
    </div>
  );
}

export default Map;
