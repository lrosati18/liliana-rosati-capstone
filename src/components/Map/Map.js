import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./Map.scss";
import convertToGeoJson from "../../utils/convertToGeoJson";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(2);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("style.load", () => {
      fetchMarkers();
    });
  }, [map]);

  //get markers data from backend and convert to GeoJSON
  const fetchMarkers = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/markers`);
      console.log("got the markers");
      const convertedResponse = convertToGeoJson(response.data);
      console.log("converted the markers");
      console.log("converted response: ", convertedResponse);
      setMarkers(convertedResponse);

      //Add GeoJSON source for markers
      map.current.addSource("markers", {
        type: "geojson",
        data: convertedResponse,
      });

      console.log("added source");

      //Add layer for markers
      map.current.addLayer({
        id: "markers",
        type: "symbol",
        source: "markers",
        layout: {
          "icon-image": "marker", // This should be the name of a Mapbox icon
          "icon-allow-overlap": true,
        },
      });
      console.log("Markers added to the map");
    } catch (error) {
      console.error("Could not get marker coordinates: ", error);
    }
  };

  return (
    <div className="map">
      <div ref={mapContainer} className="map__container" />
    </div>
  );
}

export default Map;
