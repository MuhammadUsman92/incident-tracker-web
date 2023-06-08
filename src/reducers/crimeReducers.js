import {
  CRIME_CREATION_REQUEST,
  CRIME_CREATION_SUCCESS,
  CRIME_CREATION_FAIL,
  GET_CRIME_REQUEST,
  GET_CRIME_SUCCESS,
  GET_CRIME_FAIL,
} from "../constants/crimeConstants";

export const crimeCreationReducer = (state = {}, action) => {
  switch (action.type) {
    case CRIME_CREATION_REQUEST:
      return { loading: true };
    case CRIME_CREATION_SUCCESS:
      return { loading: false, response: action.payload };
    case CRIME_CREATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const crimeGetReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CRIME_REQUEST:
      return { loading: true };
    case GET_CRIME_SUCCESS:
      return { loading: false, response: action.payload }
    case GET_CRIME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
