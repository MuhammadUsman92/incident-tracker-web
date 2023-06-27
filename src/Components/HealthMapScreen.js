import React, { useState, useEffect } from "react";
import { GoogleMap, Circle, Marker, InfoWindow } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const HealthMapScreen = () => {
  const [circlePosition, setCirclePosition] = useState({
    lat: 51.505,
    lng: -0.09,
  });
  const [circleRadius, setCircleRadius] = useState(150);
  const [displayedRadius, setDisplayedRadius] = useState(10);
  const [circle, setCircle] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [address, setAddress] = useState("");

  const data = [
    {
      name: "Usman Khokhar",
      email: "raza@gmail.com",
      bloodGroup: "A-",
      age: 20,
      height: 5.5,
      weight: 80.0,
      gender: "MALE",
      location: {
        street: "148 D Block",
        city: "Lahore",
        postal_code: "45900",
        latitude: 35.80008,
        longitude: 74.9999,
        country: "Pakistan",
      },
      diseaseSet: [
        {
          id: 3,
          name: "COVID-19",
          stage: "Severe",
          patientDto: null,
          prescriptionDtoSet: [],
        },
        {
          id: 2,
          name: "Malaria",
          stage: "Moderate",
          patientDto: null,
          prescriptionDtoSet: [],
        },
        {
          id: 4,
          name: "Common Cold",
          stage: "Mild",
          patientDto: null,
          prescriptionDtoSet: [],
        },
      ],
      doctorSet: [],
      hospitalSet: [],
      cnic: "11111-1111111-1",
    },
    {
      name: "عثمان",
      email: "admin@gmail.com",
      bloodGroup: "B-",
      age: 20,
      height: 6.0,
      weight: 80.0,
      gender: "MALE",
      location: {
        street: "Street Name",
        city: "City Name",
        postal_code: "Postal Code",
        latitude: 35.80008,
        longitude: 74.9999,
        country: null,
      },
      diseaseSet: [
        {
          id: 1,
          name: "Common Cold",
          stage: "Mild",
          patientDto: null,
          prescriptionDtoSet: [],
        },
      ],
      doctorSet: [],
      hospitalSet: [],
      cnic: "33333-3333333-1",
    },
    {
      name: "عثمان",
      email: "admin@gmail.com",
      bloodGroup: "B-",
      age: 20,
      height: 6.0,
      weight: 80.0,
      gender: "MALE",
      location: {
        street: "Street Name",
        city: "City Name",
        postal_code: "Postal Code",
        latitude: 35.80008,
        longitude: 74.9999,
        country: null,
      },
      diseaseSet: [
        {
          id: 1,
          name: "Common Cold",
          stage: "Mild",
          patientDto: null,
          prescriptionDtoSet: [],
        },
      ],
      doctorSet: [],
      hospitalSet: [],
      cnic: "33333-3333333-1",
    },
  ];
  


  const diseases = data.map(patient => patient.diseaseSet).flat();
  
  // Calculate disease counts
  const diseaseCounts = diseases.reduce((counts, disease) => {
    const { name } = disease;
    counts[name] = (counts[name] || 0) + 1;
    return counts;
  }, {});

  // Convert disease counts to an array of objects
  const chartData = Object.keys(diseaseCounts).map(name => ({
    name,
    count: diseaseCounts[name],
  }));

// Convert disease counts to an array of objects for PieChart
const pieChartData = Object.keys(diseaseCounts).map(name => ({
  name,
  value: diseaseCounts[name],
}));

// Define colors for PieChart
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#0088FE', '#00C49F'];

// Generate random data for LineChart
const generateRandomData = () => {
  const data = [];
  for (let i = 1; i <= 12; i++) {
    data.push({ month: `Month ${i}`, count: Math.floor(Math.random() * 100) });
  }
  return data;
};

const lineChartData = generateRandomData();



  const mapContainerStyle = {
    height: "90vh", 
    width: "100%",
  };

  const searchInputStyle = {
    width: "60%",
    textAlign:'center',
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
  <>
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
                  style: searchInputStyle, // Apply the searchInputStyle
                })}
                style={{
                  width:'60%',
                  borderRadius: '7px'
                }}
              />
              <div
                className="autocomplete-dropdown-container search-suggestions"
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
    <h2>Disease Statistics</h2>
    <div className="charts-section">
      <div style={{marginTop:'8px'}}>
        <BarChart width={500} height={400} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
      <div>
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
      {/* <div>
        <h3>Line Chart</h3>
        <LineChart width={400} height={400} data={lineChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </div> */}
    </div>
  </>
    
  );
};

export default HealthMapScreen;
