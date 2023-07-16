import {GET_CRIMINAL_MAP_lOCATION_FAIL,
    GET_CRIMINAL_MAP_lOCATION_REQUEST, 
    GET_CRIMINAL_MAP_lOCATION_SUCCESS} from '../constants/criminalMapLocationConstants';


    export const criminalMapLocationReducers = (state = {}, action) => {
        switch (action.type) {
          case GET_CRIMINAL_MAP_lOCATION_REQUEST:
            return { loading: true };
          case GET_CRIMINAL_MAP_lOCATION_SUCCESS:
            return { loading: false, response: action.payload };
          case GET_CRIMINAL_MAP_lOCATION_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      };