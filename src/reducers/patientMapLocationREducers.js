import {GET_PATIENT_MAP_lOCATION_FAIL,
    GET_PATIENT_MAP_lOCATION_SUCCESS, 
    GET_PATIENT_MAP_lOCATION_REQUEST} from '../constants/patientMapLocationConstants';


    export const patientMapLocationReducers = (state = {}, action) => {
        switch (action.type) {
          case GET_PATIENT_MAP_lOCATION_REQUEST:
            return { loading: true };
          case GET_PATIENT_MAP_lOCATION_SUCCESS:
            return { loading: false, response: action.payload };
          case GET_PATIENT_MAP_lOCATION_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      };