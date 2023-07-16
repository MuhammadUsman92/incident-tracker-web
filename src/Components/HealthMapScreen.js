import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Circle} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import {patientMapLocationGet} from '../actions/patientMapLocationActions'
import { useNavigate  } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell} from 'recharts';
import { Col, Row } from "react-bootstrap";
import MessageBox from "./MessageBox";


const HealthMapScreen = () => {
  const [circlePosition, setCirclePosition] = useState({
    lat: 31.4517252,
    lng: 74.2936701,
  });
  const [circleRadius, setCircleRadius] = useState(500);
  const [displayedRadius, setDisplayedRadius] = useState(500);
  const [circle, setCircle] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [address, setAddress] = useState("");
  const [map, setMap] = useState(null);
  const getPatientMapLocation = useSelector((state) => state.getPatientMapLocation);
  const { loading, response, error } = getPatientMapLocation;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPatientBtnHandler = () => {
      const formData = {
        lat:circle.center.lat(),
        long:circle.center.lng(),
        radius:circle.radius,
      };
      dispatch(patientMapLocationGet(navigate,formData));
      if(!loading && response){
        console.log(response);
        addMarkers(response.data);
      }
  };
  const data = response?.data;
  const diseases = data?.map(patient => patient.diseaseSet).flat();
  const diseaseCounts = diseases?.reduce((counts, disease) => {
    const { name } = disease;
    counts[name] = (counts[name] || 0) + 1;
    return counts;
  }, {});
  const chartData = diseaseCounts?Object.keys(diseaseCounts).map(name => ({
    name,
    count: diseaseCounts[name],
  })):null;
  const pieChartData = diseaseCounts?Object.keys(diseaseCounts).map(name => ({
    name,
    value: diseaseCounts[name],
  })):null;

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#0088FE', '#00C49F'];
  const mapContainerStyle = {
    height: "85vh", 
    width: "100%",
  };
  const searchInputStyle = {
    width: "60%",
    textAlign:'center',
  };
  const onLoad = (map) => {
    setMap(map)
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
  };
  const mapContainerRef = useRef(null);
  useEffect(() => {
    const mapInstance = new window.google.maps.Map(mapContainerRef.current, {
      center: circlePosition,
      zoom: 15,
    });
    setMap(mapInstance);
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
  useEffect(() => {
    if (!loading && response) {
      console.log(response);
      addMarkers(response.data);
    }
  }, [loading, response, circle]);

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
      setCircleRadius(newRadius);
    }
  };
  const addMarkers = (locations) => {
    // Clear existing markers
    markers.forEach((marker) => {
      marker.setMap(null);
    });
  
    const markerDictionary = {};
    locations.forEach((i) => {
      const { name, diseaseSet, location } = i;
      const latLng = `${location.latitude},${location.longitude}`;
      if (markerDictionary[latLng]) {
        markerDictionary[latLng].data.push({ name, diseaseSet });
      } else {
        const newMarker = {
          position: { lat: location.latitude, lng: location.longitude },
          data: [{ name, diseaseSet }],
        };
        markerDictionary[latLng] = newMarker;
      }
    });
    const newMarkers = Object.values(markerDictionary);
  
    // Set the new markers
    const createdMarkers = newMarkers.map((m) => {
      const marker = new window.google.maps.Marker({
        position: m.position,
        map: map,
        title: m.data.name,
      });
      const infoWindowContent = `
      <div style="max-height: 200px; overflow-y: auto; min-width: 200px;">
        ${m.data
          .map(
            (i) => `
          <h3>${i.name}</h3>
          ${i.diseaseSet
            .map((t) => `
            <p>${t.name}</p>
          `)
            .join("")}
        `
          )
          .join("")}
      </div>`;
      const infoWindow = new window.google.maps.InfoWindow({
        content: infoWindowContent,
      });
  
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
  
      infoWindow.addListener("closeclick", () => {
        infoWindow.close();
      });
  
      return marker;
    });
  
    // Update the markers state
    setMarkers(createdMarkers);
  };
  
  
  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log(latLng);
      setCirclePosition(latLng);
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };
  return (
  <>
  {loading && <LoadingBox/>}
  {error && <MessageBox variant="danger">{error}</MessageBox>}
    <div className="main-container">
      <div
        style={{
          position: "absolute",
          top: '70px',
          zIndex: 1,
          alignContent:'center',
          width: "80%",
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
            <div style={{
              textAlign:'center',
              borderRadius: '5px'
            }}
             >
              <input
                {...getInputProps({
                  placeholder: "Search Location...",
                  className: "search-input",
                  style: searchInputStyle, 
                })}
                style={{
                  width:'60%',
                  borderRadius: '7px'
                }}
              />
              <div
                className="autocomplete-dropdown-container search-suggestions"
              >
                {loading && <LoadingBox></LoadingBox>}
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
      <div
       style={{
        position: "absolute",
        top: '70px',
        zIndex: 1,
        right:'80px',
        alignContent:'center',
      }}
      >
      </div>
      <GoogleMap
        ref={mapContainerRef}
        mapContainerStyle={mapContainerStyle}
        center={circlePosition}
        zoom={15}
        onLoad={onLoad}
      >
        {circle && <Circle center={circlePosition} radius={displayedRadius} />}
    
      </GoogleMap>
    </div>
    <Row className="mt-3">
      <Col>
        <h2>Disease Statistics</h2>
      </Col>
      <Col className="text-center">
        <button className="btn btn-primary" disabled={loading} onClick={getPatientBtnHandler}>Get health Statistics</button>
      </Col>
    </Row>
    {response && response.data.length > 0 && <div className="charts-section">
      <div style={{marginTop:'8px'}}>
      <BarChart width={500} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={COLORS}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
      </div>
      <div style={{marginTop:'8px'}}>
        <PieChart width={500} height={400}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>}
  </>
    
  );
};

export default HealthMapScreen;
