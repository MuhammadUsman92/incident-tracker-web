import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DashboardScreen from "./Screens/DashboardScreen";
// import LoadingBox from "./Components/LoadingBox";
import AddPatientScreen from "./Screens/AddPatientScreen";
// import HealthAdminPanal from "./Screens/HealthAdminPanal";
// import LoginRegisterScreen from "./Screens/LoginRegisterScreen";
import SideNavigation from "./Components/SideNavigation";
import UsersListScreen from "./Screens/UsersListScreen";
import PatientProfile from "./Components/PatientProfile";
import DiseaseDetails from "./Components/DiseaseDetails";
import CriminalDetails from "./Components/CriminalDetails";
import CrimeDetails from "./Components/CrimeDetails";
import CreateCriminalForm from "./Components/CreateCriminalForm";
import CreatePatientForm from "./Components/CreatePatientForm";
import CreateDiseaseForm from "./Components/CreateDiseaseForm";
import CreateDoctorForm from "./Components/CreateDoctorForm";
import CreateHospitalForm from "./Components/CreateHospitalForm";
import CreateLaboratoryFrom from "./Components/CreateLaboratoryForm";
import AddFirScreen from "./Screens/AddFirScreen";


const App = () => {
  return (
    <>
      <div className="main-div">
        <SideNavigation />
        <div className="main-container m-3">

        {/* <PatientProfile/> */}
        {/* <DiseaseDetails/> */}
        {/* <CriminalDetails/> */}
        {/* <CrimeDetails/> */}

          {/* <PatientProfile/> */}
          {/* <DiseaseDetails/> */}
          {/* <AddFirScreen /> */}
          <UsersListScreen />

        </div>
        {/* <DashboardScreen /> */}
        {/* <AddPatientScreen DiseaseId='5'/> */}
      </div>
    </>
  );
};

export default App;
