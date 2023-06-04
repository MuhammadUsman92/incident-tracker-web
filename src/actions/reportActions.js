// reportActions.js

import Axios from "axios";
import {
  REPORT_CREATION_REQUEST,
  REPORT_CREATION_SUCCESS,
  REPORT_CREATION_FAIL,
} from "../constants/reportConstants";

export const createReport = (report) => async (dispatch) => {
  dispatch({ type: REPORT_CREATION_REQUEST, payload: report });

  try {
    const { data } = await Axios.post("http://localhost:8084/reports", report);
    dispatch({ type: REPORT_CREATION_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: REPORT_CREATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
