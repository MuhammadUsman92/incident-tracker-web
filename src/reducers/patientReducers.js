import {
    PATIENT_CREATION_REQUEST,
    PATIENT_CREATION_SUCCESS,
    PATIENT_CREATION_FAIL,
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