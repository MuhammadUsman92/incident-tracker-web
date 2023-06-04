import React, { useState, useEffect } from "react";
import { GoogleMap, Circle, Marker, InfoWindow } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const Map = () => {
  const [circlePosition, setCirclePosition] = useState({
    lat: 51.505,
    lng: -0.09,
  });
  const [circleRadius, setCircleRadius] = useState(150);
  const [displayedRadius, setDisplayedRadius] = useState(10);
  const [circle, setCircle] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [address, setAddress] = useState("");

  const mapContainerStyle = {
    height: "100vh", // Adjusted the height to 100%
    width: "100%",
  };

  const searchInputStyle = {
    width: "300px", // Increase the width of the search bar as desired
  };

  const searchOptionsStyle = {
    backgroundColor: "white", // Set the desired background color for the options list
    width: "300px", // Set the width equal to the search bar width
    cursor: "pointer", // Change the mouse pointer when hovering over an option
  };

  const onLoad = (map) => {
    setCircle(null);
    const newCircle = new window.google.maps.Circle({
      map: map,
      center: circlePosition,
      radius: circleRadius,
      draggable: false,
      editable: true,
    });
    setCircle(newCircle);

    newCircle.addListener("drag", handleCircleDrag);
    newCircle.addListener("radius_changed", handleCircleRadiusChange);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCirclePosition(userPosition);
          map.setCenter(userPosition);
          newCircle.setCenter(userPosition);
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    }
  };

  useEffect(() => {
    if (circle) {
      circle.setCenter(circlePosition);
    }
  }, [circlePosition]);

  useEffect(() => {
    if (circle) {
      circle.setRadius(circleRadius);
      setDisplayedRadius(circleRadius);
    }
  }, [circleRadius]);

  const handleCircleDrag = () => {
    if (circle) {
      const newPosition = circle.getCenter();
      setCirclePosition({ lat: newPosition.lat(), lng: newPosition.lng() });
    }
  };

  const handleCircleRadiusChange = () => {
    if (circle) {
      const newRadius = circle.getRadius();
      setDisplayedRadius(newRadius);
    }
  };

  const addMarkers = (locations) => {
    const newMarkers = locations.map((location) => {
      return (
        <Marker
          key={location.title}
          position={location}
          title={location.title}
          onMouseOver={(e) => {
            e.target.openInfoWindow();
          }}
          onMouseOut={(e) => {
            e.target.closeInfoWindow();
          }}
        >
          <InfoWindow>
            <div>
              <h3>{location.title}</h3>
              <p>{location.description}</p>
            </div>
          </InfoWindow>
        </Marker>
      );
    });

    setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
  };

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setCirclePosition(latLng);
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: 10,
          marginLeft: "40%",
          zIndex: 1,
          width: "60%",
        }}
      >
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Location...",
                  className: "search-input",
                  style: searchInputStyle, // Apply the searchInputStyle
                })}
              />
              <div
                className="autocomplete-dropdown-container"
                style={searchOptionsStyle} // Apply the updated searchOptionsStyle
              >
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  return (
                    <div {...getSuggestionItemProps(suggestion, { className })}>
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={circlePosition}
        zoom={15}
        onLoad={onLoad}
      >
        {circle && <Circle center={circlePosition} radius={displayedRadius} />}
        {markers}
      </GoogleMap>
    </div>
  );
};

export default Map;
