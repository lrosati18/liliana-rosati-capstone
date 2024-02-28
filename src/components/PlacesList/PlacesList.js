import "./PlacesList.scss";
import redPin from "../../assets/images/pin-red.png";
import bluePin from "../../assets/images/pin-blue.png";
import checkmark from "../../assets/icons/checkmark.png";
import bucketList from "../../assets/icons/bucket-blue.png";
import editIcon from "../../assets/icons/edit.png";
import deleteIcon from "../../assets/icons/delete.png";

function PlacesList({ features, handleDelete, onEditMarker }) {
  const visitedMarkers = features
    .filter((feature) => feature.properties.visited === "visited")
    .reverse();
  const notVisitedMarkers = features
    .filter((feature) => feature.properties.visited === "notVisited")
    .reverse();

  return (
    <section className="places">
      <div className="places__section">
        <div className="places__heading">
          <img src={checkmark} className="places__icon" alt="checkmark"></img>
          <h2 className="places__title">Visited Places</h2>
        </div>
        <ul className="places__ul">
          {Array.isArray(visitedMarkers) &&
            visitedMarkers.map((feature) => (
              <li key={feature.properties.id} className="places__li">
                <img
                  className="places__image"
                  src={redPin}
                  alt="map marker"
                ></img>
                <p className="places__text">{feature.properties.title}</p>
                <div
                  onClick={() => {
                    onEditMarker(feature.properties.id);
                  }}
                >
                  <img
                    src={editIcon}
                    alt="edit icon"
                    className="places__edit"
                  ></img>
                </div>
                <div
                  className="places__wrapper"
                  onClick={() => {
                    handleDelete(feature.properties.id);
                  }}
                >
                  <img src={deleteIcon} className="places__delete"></img>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="places__section">
        <div className="places__heading">
          <img src={bucketList} className="places__icon" alt="bucket"></img>
          <h2 className="places__title">Bucket List Places</h2>
        </div>
        <ul className="places__ul">
          {Array.isArray(notVisitedMarkers) &&
            notVisitedMarkers.map((feature) => (
              <li key={feature.id} className="places__li">
                <img
                  className="places__image"
                  src={bluePin}
                  alt="map marker"
                ></img>
                <p className="places__text">{feature.properties.title}</p>
                <div
                  onClick={() => {
                    onEditMarker(feature.properties.id);
                  }}
                >
                  <img
                    src={editIcon}
                    alt="edit icon"
                    className="places__edit"
                  ></img>
                </div>
                <div
                  className="places__wrapper"
                  onClick={() => {
                    handleDelete(feature.properties.id);
                  }}
                >
                  <img src={deleteIcon} className="places__delete"></img>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export default PlacesList;
