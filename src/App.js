import React from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import DashboardScreen from "./Screens/DashboardScreen";
// import LoadingBox from "./Components/LoadingBox";
import AddPatientScreen from "./Screens/AddPatientScreen";
// import HealthAdminPanal from "./Screens/HealthAdminPanal";
// import LoginRegisterScreen from "./Screens/LoginRegisterScreen";
import SideNavigation from './Components/SideNavigation';
import UsersListScreen from './Screens/UsersListScreen'
import PatientProfile from "./Components/PatientProfile";
import DiseaseDetails from "./Components/DiseaseDetails";
import CriminalDetails from "./Components/CriminalDetails";
import CrimeDetails from "./Components/CrimeDetails";

const App = () => {
  return (
    <>
    <div className="main-div">
        <SideNavigation />
        <div className="main-container m-3">
        {/* <PatientProfile/> */}
        {/* <DiseaseDetails/> */}
        {/* <CriminalDetails/> */}
        <CrimeDetails/>
        </div>
        {/* <DashboardScreen /> */}
        {/* <AddPatientScreen DiseaseId='5'/> */}
    </div>
    </>
  );
};

export default App;
