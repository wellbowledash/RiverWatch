import React, { useEffect, useState } from "react";
import "./Map.css";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import LiveData from "./LiveData";
import OverallData from "./OverallData";

const mapContainerStyle = {
  width: "100%",
  height: "50vh",
};
const center = {
  lat: 26.85, // default latitude
  lng: 80.949997, // default longitude
};

export default function Map(props) {
  const [markerData, setMarkerdata] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const [mapRef, setMapRef] = useState();

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const res = await fetch(`/api/sensors/getallsensors`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setMarkers(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMarkers();
  }, []);
  const getMarkerIcon = (category) => {
    switch (category) {
      case 'A':
        return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      case 'B':
        return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      case 'C':
        return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
      case 'D':
        return 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'; // Default to red for unknown categories
      case 'E':
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'; // Default to red for unknown categories
    }
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.GOOGLE_MAP_API_KEY,
  });
  // const [center,changeCenter]=useState(centerDefault);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  function coordinatesHandler(event) {
    // event.preventDefault();
    const coordinates = {
      latitude: event.latLng.lat().toFixed(2),
      longitude: event.latLng.lng().toFixed(2),
    };

    // changeCenter(coordinates);

    // console.log("latitide = ", event.latLng.lat().toFixed(2));
    // console.log("longitude = ", event.latLng.lng().toFixed(2));
    props.changeCoordi(coordinates);
  }
  const handleMarkerClick = (id, data, category, lat, lng) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, category });
    setIsOpen(true);
    setMarkerdata(data);
  };
  const onMapLoad = (map) => {
    setMapRef(map);
  };

  return (
    <div className="myDiv">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={props.center}
        onClick={coordinatesHandler}
        onLoad={onMapLoad}
      >
        {markers.map((marker, index) => (
          <MarkerF
            key={index}
            position={{
              lat: parseFloat(marker.latitude),
              lng: parseFloat(marker.longitude),
            }}
            icon={{
              url: getMarkerIcon(marker.sensorData.Category),
              scaledSize: new window.google.maps.Size(40, 40),
              strokeWeight: 2, // Increase the thickness of the marker outline
              strokeOpacity: 1, // Adjust the opacity of the marker outline
              fillOpacity: 1, // Adjust the opacity of the marker fill
            }}
            onClick={() => {
              handleMarkerClick(
                index,
                marker,
                marker.sensorData.Category,
                parseFloat(marker.latitude),
                parseFloat(marker.longitude)
              );
            }}
          >
            {isOpen && infoWindowData?.id === index && (
              <InfoWindowF
                onCloseClick={() => {
                  setIsOpen(false);
                }}
              >
                <h3>Category: {infoWindowData.category}</h3>
              </InfoWindowF>
            )}
          </MarkerF>
        ))}
      </GoogleMap>
      <>{markerData && <LiveData sensor={markerData} />}
        {markers && <OverallData sensors = {markers} />}
      </>
    </div>
  );
}
