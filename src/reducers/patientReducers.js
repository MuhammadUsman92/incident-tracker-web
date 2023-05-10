import {
  PATIENT_CREATION_REQUEST,
  PATIENT_CREATION_SUCCESS,
  PATIENT_CREATION_FAIL,
  GET_PATIENT_DISEASES_REQUEST,
  GET_PATIENT_DISEASES_SUCCESS,
  GET_PATIENT_DISEASES_FAIL,
  } from '../constants/patientConstants';

export const patientCreationReducer = (state = {}, action) => {
    switch (action.type) {
      case PATIENT_CREATION_REQUEST:
        return { loading: true };
      case PATIENT_CREATION_SUCCESS:
        return { loading: false, response: action.payload };
      case PATIENT_CREATION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};
  
export const patientDiseasesGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PATIENT_DISEASES_REQUEST:
      return { loading: true };
    case GET_PATIENT_DISEASES_SUCCESS:
      return { loading: false, response: action.payload };
    case GET_PATIENT_DISEASES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};