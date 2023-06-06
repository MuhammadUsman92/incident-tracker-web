import Axios from 'axios';
import {
  PATIENT_CREATION_REQUEST,
  PATIENT_CREATION_SUCCESS,
  PATIENT_CREATION_FAIL,
  GET_PATIENT_DISEASES_REQUEST,
  GET_PATIENT_DISEASES_SUCCESS,
  GET_PATIENT_DISEASES_FAIL,
  CREATE_PATIENT_DISEASES_REQUEST,
  CREATE_PATIENT_DISEASES_SUCCESS,
  CREATE_PATIENT_DISEASES_FAIL,
  CREATE_PATIENT_PRESCRIPTION_REQUEST,
  CREATE_PATIENT_PRESCRIPTION_SUCCESS,
  CREATE_PATIENT_PRESCRIPTION_FAIL,
  DISEASE_FETCH_REQUEST,
  DISEASE_FETCH_SUCCESS,
  DISEASE_FETCH_FAIL,
  } from '../constants/patientConstants';
  import { SERVER_IP } from "./userActions";

export const patientCreate = (navigate,patient) => async (dispatch, getState) => {
    dispatch({ type: PATIENT_CREATION_REQUEST, payload: patient });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.post(`http://${SERVER_IP}/health-service/patient/`, patient, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: PATIENT_CREATION_SUCCESS, payload: data.message });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login-register');
      }
      dispatch({
        type: PATIENT_CREATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
};

export const patientDiseasesGet = (navigate,patientCNIC) => async (dispatch, getState) => {
  dispatch({ type: GET_PATIENT_DISEASES_REQUEST, payload: patientCNIC });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`http://${SERVER_IP}/health-service/patient/${patientCNIC}` ,{
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: GET_PATIENT_DISEASES_SUCCESS, payload: data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate('/login-register');
    }
    dispatch({
      type: GET_PATIENT_DISEASES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const patientDiseaseCreate = (navigate,patientCNIC,disease) => async (dispatch, getState) => {
  dispatch({ type: CREATE_PATIENT_DISEASES_REQUEST, payload: disease });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(`http://${SERVER_IP}/health-service/disease/patientId/${patientCNIC}`, disease, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: CREATE_PATIENT_DISEASES_SUCCESS, payload: data.message });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate('/login-register');
    }
    dispatch({
      type: CREATE_PATIENT_DISEASES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const patientPrescriptionCreate = (navigate,diseaseId, doctorId, prescription) => async (dispatch, getState) => {
  dispatch({ type: CREATE_PATIENT_PRESCRIPTION_REQUEST, payload: prescription });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(`http://${SERVER_IP}/health-service/prescription/diseaseId/${diseaseId}/doctorId/${doctorId}`, prescription, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: CREATE_PATIENT_PRESCRIPTION_SUCCESS, payload: data.message });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate('/login-register');
    }
    dispatch({
      type: CREATE_PATIENT_PRESCRIPTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchDiseaseById = (navigate,diseaseId) => async (dispatch,getState) => {
  dispatch({ type: DISEASE_FETCH_REQUEST, payload: diseaseId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`http://${SERVER_IP}/health-service/disease/${diseaseId}`,{
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: DISEASE_FETCH_SUCCESS, payload: data });
    console.log(data)
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate('/login-register');
    }
    dispatch({
      type: DISEASE_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
