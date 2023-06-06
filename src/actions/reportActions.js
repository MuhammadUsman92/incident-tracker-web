import Axios from "axios";
import {
  REPORT_CREATION_REQUEST,
  REPORT_CREATION_SUCCESS,
  REPORT_CREATION_FAIL,
} from "../constants/reportConstants";
import { SERVER_IP } from "./userActions";

export const createReport = (navigate,prescriptionId,laboratoryId,report) => async (dispatch,getState) => {
  dispatch({ type: REPORT_CREATION_REQUEST, payload: report });
  
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(`http://${SERVER_IP}/health-service/report/prescriptionId/${prescriptionId}/laboratoryId/${laboratoryId}`, report,{
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: REPORT_CREATION_SUCCESS, payload: data.message });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate('/login-register');
    }
    dispatch({
      type: REPORT_CREATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
