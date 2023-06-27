import React, { useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import SideNavigation from "./Components/SideNavigation";
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
import CreateReportForm from "./Components/CreateReportForm";
import CriminalStatusForm from "./Components/CriminalStatusFrom";
import FileViewer from "./Components/FileViewer";
import { useDispatch } from 'react-redux';
import { signout } from './actions/userActions';
import Error404 from "./Components/Error404";
import { useNavigate } from 'react-router-dom';
import HealthMapScreen from "./Components/HealthMapScreen";


const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((pathname) => pathname !== "");
  function convertToTitleCase(str) {
    const words = str.split('-');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const convertedStr = capitalizedWords.join(' ');
    return convertedStr;
  }
  const notLinks = ['patient-details','disease-details','create-prescription','add-report','criminal-status','criminal-details','crime-details','report-file','fir-file'];
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
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login-register";
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Perform logout actions
    // For example, clear authentication token, user data, etc.
    // Then redirect to the login page
    console.log("click");
    dispatch(signout(navigate));
  };
  return (
    <>
      {!isLoginPage && <SideNavigation selectedLink={location.pathname} />}
      <div className="main-container m-3">
      {!isLoginPage && <div className="top-bar">
      <Breadcrumb />
      <a className="logout-link" onClick={handleLogout}>Logout</a>
      </div>
      }
        <Routes>
          <Route element={<PrivateRoutes role="RESCUE_USER" />}>
            <Route element={<PatientProfile />} path="/patient-details/:patientId" />
            <Route element={<DiseaseDetails />} path="/patient-details/:patientId/disease-details/:diseaseId" />
            <Route element={<FileViewer />} path="/patient-details/:patientId/disease-details/:diseaseId/report-file/:name" />
          </Route>
          <Route element={<PrivateRoutes role="HOSPITAL_ADMIN" />}>
            <Route element={<CreateDiseaseForm />} path="/patient-details/:patientId/create-disease" />
            <Route element={<AddPatientScreen />} path="/patient-details/:patientId/disease-details/:diseaseId/create-prescription" />
            <Route element={<CreateReportForm />} path="/patient-details/:patientId/disease-details/:diseaseId/add-report/:prescriptionId" />
            <Route element={<CreatePatientForm />} path="/create-patient" />
            <Route element={<CreateDoctorForm />} path="/create-doctor" />
          </Route>
          <Route element={<PrivateRoutes role="RESCUE_ADMIN" />}>  
            <Route element={<CreateHospitalForm />} path="/create-hospital" />
            <Route element={<CreateLaboratoryFrom />} path="/create-laboratory" />
            <Route element={<HealthMapScreen />} path="/health-statistics" />
          </Route>
          <Route element={<PrivateRoutes role="POLICE_USER" />}>
            <Route element={<CriminalDetails />} path="/criminal-details/:criminalId" />
            <Route element={<CrimeDetails />} path="/criminal-details/:criminalId/crime-details/:id" />
            <Route element={<FileViewer />} path="/criminal-details/:criminalId/crime-details/:id/fir-file/:name"  />
          </Route>
          <Route element={<PrivateRoutes role="POLICE_ADMIN" />}>
            <Route element={<CreateCriminalForm />} path="/create-criminal" />
            <Route element={<AddFirScreen />} path="/create-crime" />
            <Route element={<CriminalStatusForm />} path="/criminal-details/:criminalId/criminal-status" />
          </Route>
          <Route element={<PrivateRoutes role="ADMIN_USER" />}>  
            <Route element={<UsersListScreen />} path="/all-users" />
          </Route>
          <Route element={<PrivateRoutes role="ADMIN_USER" />}>  
            <Route element={<HomeScreen />} path="/" exact />
          </Route>

          <Route element={<Error404 />} path="*" />

          
          <Route element={<LoginRegisterScreen />} path="/login-register" />
          

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
