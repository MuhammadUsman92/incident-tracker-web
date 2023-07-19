import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useMediaQuery } from "react-responsive";
import logo from "../Assets/logo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SideNavigation({ selectedLink }) {
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleNavigation = (selected) => {
    navigate(`${selected}`);
  };

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
      selected={selectedLink}
    >
      {renderHeader()}
      {isMobile && <SideNav.Toggle />}
      <SideNav.Nav>
        <NavItem eventKey="/" active={selectedLink === "/"} >
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
          {userInfo && userInfo.data && userInfo.data.includes("ADMIN_USER") ? (
            <NavText>Get Record</NavText>
          ) : userInfo && userInfo.data.includes("RESCUE_USER") ? (
            <NavText>Get Patient Record</NavText>
          ) : (
            <NavText>Get Criminal Record</NavText>
          )}
        </NavItem>
        {userInfo && userInfo.data &&userInfo.data.includes("HOSPITAL_ADMIN") && (
          <NavItem eventKey="/create-patient" active={selectedLink === "/create-patient"}>
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
          </NavItem>
        )}
        {userInfo && userInfo.data && userInfo.data.includes("HOSPITAL_ADMIN") && (
          <NavItem eventKey="/create-doctor" active={selectedLink === "/create-doctor"}>
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
          </NavItem>
        )}
        {userInfo && userInfo.data && userInfo.data.includes("RESCUE_ADMIN") && (
          <NavItem eventKey="/create-hospital" active={selectedLink === "/create-hospital"}>
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
          </NavItem>
        )}
        {userInfo && userInfo.data && userInfo.data.includes("RESCUE_ADMIN") && (
          <NavItem eventKey="/create-laboratory" active={selectedLink === "/create-laboratory"}>
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
          </NavItem>
        )}
        {userInfo && userInfo.data && userInfo.data.includes("RESCUE_ADMIN") && (
          <NavItem eventKey="/health-statistics" active={selectedLink === "/health-statistics"}>
            <NavIcon>
              <img
                src={require("../images/health_chart.png")}
                alt="health-statistics"
                style={{
                  padding: "2px",
                  width: "3em",
                  filter: "grayscale(100%) brightness(1000%)",
                }}
              />
            </NavIcon>
            <NavText>Health Statistics</NavText>
          </NavItem>
        )}
        {userInfo && userInfo.data && userInfo.data.includes("POLICE_ADMIN") && (
          <NavItem eventKey="/create-crime" active={selectedLink === "/create-crime"}>
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
          </NavItem>
        )}
        {userInfo && userInfo.data &&userInfo.data.includes("POLICE_ADMIN") && (
          <NavItem eventKey="/create-criminal" active={selectedLink === "/create-criminal"}>
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
          </NavItem>
        )}
        {userInfo && userInfo.data && userInfo.data.includes("POLICE_ADMIN") && (
          <NavItem eventKey="/crime-statistics" active={selectedLink === "/crime-statistics"}>
            <NavIcon>
              <img
                src={require("../images/crime_chart.png")}
                alt="health-statistics"
                style={{
                  padding: "2px",
                  width: "3em",
                  filter: "grayscale(100%) brightness(1000%)",
                }}
              />
            </NavIcon>
            <NavText>Crime Statistics</NavText>
          </NavItem>
        )}
        {userInfo && userInfo.data && userInfo.data.includes("POLICE_ADMIN") && (
          <NavItem eventKey="/crime-prediction" active={selectedLink === "/crime-prediction"}>
            <NavIcon>
              <img
                src={require("../images/predictive-chart.png")}
                alt="health-prediction"
                style={{
                  padding: "2px",
                  width: "3em",
                  filter: "grayscale(100%) brightness(1000%)",
                }}
              />
            </NavIcon>
            <NavText>Crime Prediction</NavText>
          </NavItem>
        )}
        {userInfo && userInfo.data && userInfo.data.includes("ADMIN_USER") && (
          <NavItem eventKey="/all-users" active={selectedLink === "/all-users"}>
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
          </NavItem>
        )}
      </SideNav.Nav>
    </SideNav>
  );
}

export default SideNavigation;
