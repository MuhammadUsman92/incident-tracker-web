import React, { useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import SideNavigation from "./Components/SideNavigation";
import DashboardScreen from "./Screens/DashboardScreen";
import AddPatientScreen from "./Screens/AddPatientScreen";
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
import PrivateRoutes from "./utils/PrivateRoutes";
import CrimeForm from "./Components/CrimeForm";
import CreateReportForm from "./Components/CreateReportForm";
import Map from "./Components/MapScreen";
import CriminalStatusForm from "./Components/CriminalStatusFrom";
import MapScreen from "./Components/MapScreen";


const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((pathname) => pathname !== "");
  function convertToTitleCase(str) {
    const words = str.split('-');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const convertedStr = capitalizedWords.join(' ');
    return convertedStr;
  }
  const notLinks = ['patient-details','disease-details','create-prescription','add-report','criminal-status','criminal-details','crime-details'];
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((pathname, index) => {
          const routePath = `/${pathnames.slice(0, index + 1).join("/")}`;
          let check = notLinks.includes(pathname);
          let linkText = check ? convertToTitleCase(pathname):pathname;
          return (
            <li className="breadcrumb-item" key={index}>
              {check ? (
                <span>{linkText}</span>
              ):(
                <Link to={routePath} >{linkText}</Link>
              )
              }
            </li>
          );
        })}
      </ol>
    </nav>
  );
};




const MainRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login-register";

  return (
    <>
      {!isLoginPage && <SideNavigation selectedLink={location.pathname} />}
      <div className="main-container m-3">
      {!isLoginPage && <Breadcrumb />}
        <Routes>
          <Route element={<PatientProfile />} path="/patient-details/:patientId" />
          <Route element={<DiseaseDetails />} path="/patient-details/:patientId/disease-details/:diseaseId" />
          <Route element={<CreateDiseaseForm />} path="/patient-details/:patientId/create-disease" />
          <Route element={<AddPatientScreen />} path="/patient-details/:patientId/disease-details/:diseaseId/create-prescription" />
          <Route element={<CreateReportForm />} path="/patient-details/:patientId/disease-details/:diseaseId/add-report/:prescriptionId" />
          <Route element={<CreatePatientForm />} path="/create-patient" />
          <Route element={<CreateDoctorForm />} path="/create-doctor" />
          <Route element={<CreateHospitalForm />} path="/create-hospital" />
          <Route element={<CreateLaboratoryFrom />} path="/create-laboratory" />
          <Route element={<CreateCriminalForm />} path="/create-criminal" />
          <Route element={<AddFirScreen />} path="/create-crime" />
          <Route element={<CriminalDetails />} path="/criminal-details/:criminalId" />
          <Route element={<CriminalStatusForm />} path="/criminal-details/:criminalId/criminal-status" />
          <Route element={<CrimeDetails />} path="/criminal-details/:criminalId/crime-details/:id" />
          <Route element={<UsersListScreen />} path="/all-users" />
          <Route element={<LoginRegisterScreen />} path="/login-register" />
          {/* <Route element={<HomeScreen />} path="/" exact /> */}
          <Route element={<MapScreen />} path="/" exact />

        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="main-div">
        <MainRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
