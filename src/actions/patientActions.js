import Axios from 'axios';
import {
  PATIENT_CREATION_REQUEST,
  PATIENT_CREATION_SUCCESS,
  PATIENT_CREATION_FAIL,
  GET_PATIENT_DISEASES_REQUEST,
  GET_PATIENT_DISEASES_SUCCESS,
  GET_PATIENT_DISEASES_FAIL,
  } from '../constants/patientConstants';

export const patientCreate = (patient) => async (dispatch, getState) => {
    dispatch({ type: PATIENT_CREATION_REQUEST, payload: patient });
    try {
      // const {
      //   userSignin: { userInfo },
      // } = getState();
      // const { data } = await Axios.post('localhost:8084/patient/', patient, {
      const { data } = await Axios.post('http://localhost:8084/patient/', patient, {
        // headers: {
        //   Authorization: `Bearer ${userInfo.token}`,
        // },
      });
      dispatch({ type: PATIENT_CREATION_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: PATIENT_CREATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
};

export const patientDiseasesGet = (patientCNIC) => async (dispatch, getState) => {
  dispatch({ type: GET_PATIENT_DISEASES_REQUEST, payload: patientCNIC });
  try {
    // const {
    //   userSignin: { userInfo },
    // } = getState();
    const { data } = await Axios.get(`http://localhost:8084/disease/patientId/${patientCNIC}` ,{
      // headers: {
      //   Authorization: `Bearer ${userInfo.token}`,
      // },
    });
    dispatch({ type: GET_PATIENT_DISEASES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PATIENT_DISEASES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};