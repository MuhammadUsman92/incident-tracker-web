import Axios from "axios";
import {
  CRIMINAL_CREATION_REQUEST,
  CRIMINAL_CREATION_SUCCESS,
  CRIMINAL_CREATION_FAIL,
} from "../constants/criminalConstants";

export const createCriminal = (criminal) => async (dispatch, getState) => {
  dispatch({ type: CRIMINAL_CREATION_REQUEST, payload: criminal });
  try {
    const { data } = await Axios.post(
      "http://localhost:8084/criminals/",
      criminal
    );
    dispatch({ type: CRIMINAL_CREATION_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: CRIMINAL_CREATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
