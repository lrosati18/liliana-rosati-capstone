export default function convertToGeoJSON(inputData) {
  const outputData = {
    features: inputData.map((marker) => ({
      type: "Feature",
      properties: {
        title: marker.name,
        description: marker.description,
        visited: marker.visited,
      },
      geometry: {
        coordinates: [marker.longitude, marker.latitude],
        type: "Point",
      },
    })),
    type: "FeatureCollection",
  };

  return outputData;
}
