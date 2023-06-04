import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
// import { useNavigate,useLocation  } from 'react-router-dom';


function SideNavigation() {
//   const navigate = useNavigate(); // Use the useNavigate hook
//   const location = useLocation();
  const [isOnPatientDetails, setIsOnPatientDetails] = useState(false);

//   useEffect(() => {
//     // Check if the user is on the '/patient-details' page
//     setIsOnPatientDetails(location.pathname === '/patient-details');
//   }, [location]);
    const handleNavigation = (selected) => {
    //   if (isOnPatientDetails && selected === '/') {
    //     // If the user is on the '/patient-details' page and selects '/'
    //     // navigate back to the homepage
    //     navigate('/');
    //   } else {
    //     // Navigate to other routes as usual
    //     navigate(selected);
    //   }
      };

  // Use media query to check screen size
  const isMobile = useMediaQuery({ maxWidth: 800 });
  
  const renderHeader = () => {
    if (!isMobile) {
      return (
        <div className="header">
          <h5>Incident Tracker</h5>
        </div>
      );
    }
    return null;
  };
  return (
    <SideNav
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      onSelect={handleNavigation}
      defaultExpanded={isMobile ? undefined : true}
    >
      {renderHeader()}
      {isMobile && <SideNav.Toggle />}
      <SideNav.Nav  defaultSelected="/">
        <NavItem eventKey="/">
          <NavIcon>
          <img src={require('../images/get_patient.png')} alt="get_patient" style={{padding:'2px',width: '3em', filter: 'grayscale(100%) brightness(1000%)' }} />
          </NavIcon>
          <NavText>Get Patient Record</NavText>
        </NavItem>
        {/* <NavItem eventKey="/charts">
          <NavIcon>
            <i
              className="fa fa-fw fa-line-chart"
              style={{ fontSize: '1.75em' }}
            />
          </NavIcon>
          <NavText>Charts</NavText>
          <NavItem eventKey="/charts/linechart">
            <NavText>Line Chart</NavText>
          </NavItem>
          <NavItem eventKey="/charts/barchart">
            <NavText>Bar Chart</NavText>
          </NavItem>
        </NavItem> */}
        <NavItem eventKey="/create-patient">
          <NavIcon>
          <img src={require('../images/create_patient.png')} alt="create_patent" style={{padding:'2px', width: '3em', filter: 'grayscale(100%) brightness(1000%)' }} />
          </NavIcon>
          <NavText>Create Patient</NavText>
        </NavItem>
        <NavItem eventKey="/create-doctor">
          <NavIcon>
          <img src={require('../images/create_doctor.png')} alt="create_patent" style={{padding:'2px', width: '3em', filter: 'grayscale(100%) brightness(1000%)' }} />
          </NavIcon>
          <NavText>Create Doctor</NavText>
        </NavItem>
        <NavItem eventKey="/create-hospital">
          <NavIcon>
          <img src={require('../images/create_hospital.png')} alt="create_hospital" style={{padding:'2px', width: '3em', filter: 'grayscale(100%) brightness(1000%)' }} />
          </NavIcon>
          <NavText>Create Hospital</NavText>
        </NavItem>
        <NavItem eventKey="/create-laboratory">
          <NavIcon>
          <img src={require('../images/create_laboratory.png')} alt="create_laboratory" style={{padding:'2px', width: '3em', filter: 'grayscale(100%) brightness(1000%)' }} />
          </NavIcon>
          <NavText>Create Laboratory</NavText>
        </NavItem>
        <NavItem eventKey="/create-crime">
          <NavIcon>
          <img src={require('../images/create_crime.png')} alt="create_crime" style={{padding:'2px', width: '3em', filter: 'grayscale(100%) brightness(1000%)' }} />
          </NavIcon>
          <NavText>Create Crime</NavText>
        </NavItem>
        <NavItem eventKey="/create-criminal">
          <NavIcon>
          <img src={require('../images/create_criminal.png')} alt="create_criminal" style={{padding:'2px', width: '3em', filter: 'grayscale(100%) brightness(1000%)' }} />
          </NavIcon>
          <NavText>Create Criminal</NavText>
        </NavItem>
        <NavItem eventKey="/create-fir">
          <NavIcon>
          <img src={require('../images/create_fir.png')} alt="create_fir" style={{padding:'2px', width: '3em', filter: 'grayscale(100%) brightness(1000%)' }} />
          </NavIcon>
          <NavText>Create Fir</NavText>
        </NavItem>
        <NavItem eventKey="/all-users">
          <NavIcon>
          <img src={require('../images/get_all_users.png')} alt="get_all_users" style={{padding:'2px', width: '3em', filter: 'grayscale(100%) brightness(1000%)' }} />
          </NavIcon>
          <NavText>All Users</NavText>
        </NavItem>
        
        
      </SideNav.Nav>
    </SideNav>
  );
}

export default SideNavigation;
