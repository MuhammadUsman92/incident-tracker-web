import {
    CRIMINAL_CREATION_REQUEST,
    CRIMINAL_CREATION_SUCCESS,
    CRIMINAL_CREATION_FAIL,
    CRIMINAL_DETAILS_REQUEST,
    CRIMINAL_DETAILS_SUCCESS,
    CRIMINAL_DETAILS_FAIL,
    CREATE_CRIMINAL_STATUS_REQUEST,
    CREATE_CRIMINAL_STATUS_SUCCESS,
    CREATE_CRIMINAL_STATUS_FAIL,
} from '../constants/criminalConstants';

export const criminalCreationReducer = (state = {}, action) => {
    switch (action.type) {
        case CRIMINAL_CREATION_REQUEST:
            return { loading: true };
        case CRIMINAL_CREATION_SUCCESS:
            return { loading: false, response: action.payload };
        case CRIMINAL_CREATION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

  
  export const criminalDetailsReducer = (state = {},action) => {
    switch (action.type) {
      case CRIMINAL_DETAILS_REQUEST:
        return { loading: true, };
      case CRIMINAL_DETAILS_SUCCESS:
        return { loading: false, response: action.payload };
      case CRIMINAL_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const createCriminalStatusReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_CRIMINAL_STATUS_REQUEST:
        return { loading: true, };
      case CREATE_CRIMINAL_STATUS_SUCCESS:
        return { loading: false, response:  action.payload };
      case CREATE_CRIMINAL_STATUS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };