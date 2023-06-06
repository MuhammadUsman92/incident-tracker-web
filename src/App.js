import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DashboardScreen from "./Screens/DashboardScreen";
import AddPatientScreen from "./Screens/AddPatientScreen";
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
import HomeScreen from "./Screens/HomeScreen";
import LoginRegisterScreen from "./Screens/LoginRegisterScreen";
import { BrowserRouter, Routes, Route,useLocation } from 'react-router-dom';
import PrivateRoutes from "./utils/PrivateRoutes";
import GetPatientForm from "./Components/GetPatientForm";
import CrimeForm from "./Components/CrimeForm";
import CreateReportForm from "./Components/CreateReportForm";
import Map from "./Components/Map"
import CriminalStatusForm from "./Components/CriminalStatusFrom";
const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login-register";
  return (
    <>
      <div className="main-div">
        {!isLoginPage && <SideNavigation />}
        <div className="main-container m-3">
          <Routes>
            <Route element={<HomeScreen />} path="/" exact/>
            <Route element={<PatientProfile />} path="/patient-details/:id" />
            <Route element={<DiseaseDetails />} path="/disease-details/:id" />
            <Route element={<CreateDiseaseForm />} path="/create-disease/:id" />
            <Route element={<AddPatientScreen />} path="/create-prescription/:id" />
            <Route element={<CreateReportForm />} path="/add-report/:id" />
            <Route element={<CreatePatientForm />} path="/create-patient"/>
            <Route element={<CreateDoctorForm />} path="/create-doctor"/>
            <Route element={<CreateHospitalForm />} path="/create-hospital"/>
            <Route element={<CreateLaboratoryFrom />} path="/create-laboratory"/>
            <Route element={<CreateCriminalForm />} path="/create-criminal"/>
            <Route element={<AddFirScreen />} path="/create-crime"/>
            <Route element={<CriminalStatusForm />} path="/criminal-status"/>
            
            <Route element={<UsersListScreen />} path="/all-users"/>
            <Route element={<LoginRegisterScreen />} path="/login-register"/>
            
          </Routes>
        </div>
      </div>
        
    </>
  );
};

export default App;
