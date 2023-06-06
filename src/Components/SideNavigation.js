import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import logo from "../Assets/logo.png";
import { useSelector } from "react-redux";
import { useNavigate,useLocation  } from 'react-router-dom';

function SideNavigation() {
    const navigate = useNavigate(); // Use the useNavigate hook
    const location = useLocation();
  const [isOnPatientDetails, setIsOnPatientDetails] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo }= userSignin;
    useEffect(() => {
      // Check if the user is on the '/patient-details' page
      setIsOnPatientDetails(location.pathname === '/patient-details');
    }, [location]);
  const handleNavigation = (selected) => {
      if (isOnPatientDetails && selected === '/') {
        // If the user is on the '/patient-details' page and selects '/'
        // navigate back to the homepage
        navigate('/');
      } else {
        // Navigate to other routes as usual
    navigate(selected);
     
      }
  };

  // Use media query to check screen size
  const isMobile = useMediaQuery({ maxWidth: 800 });

  const renderHeader = () => {
    if (!isMobile) {
      return (
        <div className="header" style={{ backgroundColor: "#fff" }}>
          <h5>Incident Tracker</h5>
          <img
            src={logo}
            alt="Logo"
            style={{ marginLeft: "10px", height: "30px" }}
          />
        </div>
      );
    }
    return null;
  };
  return (
    <SideNav
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f13a59",
      }}
      onSelect={handleNavigation}
      defaultExpanded={isMobile ? undefined : true}
    >
      {renderHeader()}
      {isMobile && <SideNav.Toggle />}
      <SideNav.Nav defaultSelected="/">
        <NavItem eventKey="/">
          <NavIcon>
            <img
              src={require("../images/create_patient.png")}
              alt="get_patient"
              style={{
                padding: "2px",
                width: "3em",
                filter: "grayscale(100%) brightness(1000%)",
              }}
            />
          </NavIcon>
          {userInfo.data && userInfo.data.includes("ADMIN_USER")?<NavText>Get Record</NavText>:userInfo.data.includes("RESCUE_USER")?
          <NavText>Get Patient Record</NavText>: <NavText>Get Criminal Record</NavText>}
          
        </NavItem>
        {userInfo.data && userInfo.data.includes("HOSPITAL_ADMIN") &&
        <NavItem eventKey="/create-patient">
          <NavIcon>
            <img
              src={require("../images/get_patient.png")}
              alt="create_patent"
              style={{
                padding: "2px",
                width: "3em",
                filter: "grayscale(100%) brightness(1000%)",
              }}
            />
          </NavIcon>
          <NavText>Create Patient</NavText>
        </NavItem>}
        {userInfo.data && userInfo.data.includes("HOSPITAL_ADMIN") &&
        <NavItem eventKey="/create-doctor">
          <NavIcon>
            <img
              src={require("../images/create_doctor.png")}
              alt="create_patent"
              style={{
                padding: "2px",
                width: "3em",
                filter: "grayscale(100%) brightness(1000%)",
              }}
            />
          </NavIcon>
          <NavText>Create Doctor</NavText>
        </NavItem>}
        {userInfo.data && userInfo.data.includes("RESCUE_ADMIN") &&
        <NavItem eventKey="/create-hospital">
          <NavIcon>
            <img
              src={require("../images/create_hospital.png")}
              alt="create_hospital"
              style={{
                padding: "2px",
                width: "3em",
                filter: "grayscale(100%) brightness(1000%)",
              }}
            />
          </NavIcon>
          <NavText>Create Hospital</NavText>
        </NavItem>}
        {userInfo.data && userInfo.data.includes("RESCUE_ADMIN") &&
        <NavItem eventKey="/create-laboratory">
          <NavIcon>
            <img
              src={require("../images/create_laboratory.png")}
              alt="create_laboratory"
              style={{
                padding: "2px",
                width: "3em",
                filter: "grayscale(100%) brightness(1000%)",
              }}
            />
          </NavIcon>
          <NavText>Create Laboratory</NavText>
        </NavItem>}
        {userInfo.data && userInfo.data.includes("POLICE_ADMIN") &&
        <NavItem eventKey="/create-crime" >
          <NavIcon>
            <img
              src={require("../images/create_crime.png")}
              alt="create_crime"
              style={{
                padding: "2px",
                width: "3em",
                filter: "grayscale(100%) brightness(1000%)",
              }}
            />
          </NavIcon>
          <NavText>Create Crime</NavText>
        </NavItem>}
        {userInfo.data && userInfo.data.includes("POLICE_ADMIN") &&
        <NavItem eventKey="/create-criminal" >
          <NavIcon>
            <img
              src={require("../images/create_criminal.png")}
              alt="create_criminal"
              style={{
                padding: "2px",
                width: "3em",
                filter: "grayscale(100%) brightness(1000%)",
              }}
            />
          </NavIcon>
          <NavText>Create Criminal</NavText>
        </NavItem>}
        {userInfo.data && userInfo.data.includes("ADMIN_USER") &&
        <NavItem eventKey="/all-users" >
          <NavIcon>
            <img
              src={require("../images/get_all_users.png")}
              alt="get_all_users"
              style={{
                padding: "2px",
                width: "3em",
                filter: "grayscale(100%) brightness(1000%)",
              }}
            />
          </NavIcon>
          <NavText>All Users</NavText>
        </NavItem>}
      </SideNav.Nav>
    </SideNav>
  );
}

export default SideNavigation;
