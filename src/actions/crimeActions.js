// actions/crimeActions.js

import Axios from "axios";
import {
  CRIME_CREATION_REQUEST,
  CRIME_CREATION_SUCCESS,
  CRIME_CREATION_FAIL,
} from "../constants/crimeConstants";

export const createCrime = (crime) => async (dispatch) => {
  dispatch({ type: CRIME_CREATION_REQUEST, payload: crime });
  try {
    const { data } = await Axios.post("http://localhost:8084/crimes/", crime);
    dispatch({ type: CRIME_CREATION_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CRIME_CREATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
