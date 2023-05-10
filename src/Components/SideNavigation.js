import React from 'react';
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import { Helmet } from 'react-helmet';


import '@trendmicro/react-sidenav/dist/react-sidenav.css';

function SideNagvigation() {
  return (
<SideNav
style={{ display: 'flex', flexDirection: 'column', height: '' }}
    onSelect={(selected) => {
        // Add your code here
    }}
>
<Helmet>
        <script
          src="https://kit.fontawesome.com/d75bbd7b24.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
    <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
                <NavIcon>
                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="charts">
                <NavIcon>
                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Charts
                </NavText>
                <NavItem eventKey="charts/linechart">
                    <NavText>
                        Line Chart
                    </NavText>
                </NavItem>
                <NavItem eventKey="charts/barchart">
                    <NavText>
                        Bar Chart
                    </NavText>
                </NavItem>
            </NavItem>
            <NavItem eventKey="create-patient">
                <NavIcon>
                <i className="fa-solid fa-hospital-user" style={{ fontSize: '1.75em' }} ></i>
                </NavIcon>
                <NavText>
                    Create Patient
                </NavText>
            </NavItem>
            <NavItem eventKey="create-doctor">
                <NavIcon>
                <i className="fa-solid fa-user-doctor" style={{ fontSize: '1.75em' }} ></i>
                </NavIcon>
                <NavText>
                    Create Doctor
                </NavText>
            </NavItem>
            <NavItem eventKey="create-hospital">
                <NavIcon>
                <i className="fa-regular fa-hospital" style={{ fontSize: '1.75em' }} ></i>
                </NavIcon>
                <NavText>
                    Create Hospital
                </NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
      );
}

export default SideNagvigation;
