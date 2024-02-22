import "./PlacesList.scss";
import redPin from "../../assets/images/red-pin.png";

function PlacesList({ markers }) {
  // console.log("Markers in PlacesList:", markers);
  // console.log(markers.features);
  const features = markers.features;

  return (
    <section className="places">
      <ul className="places__ul">
        {Array.isArray(features) &&
          features.map((feature) => (
            <li key={feature.id} className="places__li">
              <img
                className="places__image"
                src={redPin}
                alt="map marker"
              ></img>
              {feature.properties.title}
            </li>
          ))}
      </ul>
    </section>
  );
}

export default PlacesList;
