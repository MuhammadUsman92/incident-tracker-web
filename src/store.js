import { createStore, compose, applyMiddleware, combineReducers } from "redux";

import thunk from "redux-thunk";
import {
  userSigninReducer,
  userRegisterReducer,
  getAllUsersReducer,
} from "./reducers/userReducers";
import {
  patientCreationReducer,
  patientDiseasesGetReducer,
  patientDiseaseCreateReducer,
  patientPrescriptionCreateReducer,
  diseaseFetchReducer
} from "./reducers/patientReducers";
import { hospitalCreationReducer } from "./reducers/hospitalReducers";
import { laboratoryCreationReducer } from "./reducers/laboratoryReducers";
import { doctorCreationReducer } from "./reducers/doctorReducers";

import { criminalCreationReducer,criminalDetailsReducer,
  createCriminalStatusReducer } from "./reducers/criminalReducers";
import { crimeCreationReducer,crimeGetReducer } from "./reducers/crimeReducers";
import { reportCreationReducer } from "./reducers/reportReducers";
import { roleEditReducer } from "./reducers/editRoleReducers";


const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  createPatient: patientCreationReducer,
  createHospital: hospitalCreationReducer,
  createLaboratory: laboratoryCreationReducer,
  createDoctor: doctorCreationReducer,
  getPatientDiseases: patientDiseasesGetReducer,
  createPatientDisease: patientDiseaseCreateReducer,
  createPatientPrescription: patientPrescriptionCreateReducer,
  getUsersAll: getAllUsersReducer,
  createCriminal: criminalCreationReducer,
  createCrime: crimeCreationReducer,
  createReport: reportCreationReducer,
  editRole: roleEditReducer,
  getCriminalDetails:criminalDetailsReducer,
  diseaseDetails:diseaseFetchReducer,
  crimeDetails:crimeGetReducer,
  criminalStatusCreate:createCriminalStatusReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);


export default store;
