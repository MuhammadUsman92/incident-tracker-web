import Axios from "axios";
import {
  CRIMINAL_CREATION_REQUEST,
  CRIMINAL_CREATION_SUCCESS,
  CRIMINAL_CREATION_FAIL,
  CRIMINAL_DETAILS_REQUEST,
  CRIMINAL_DETAILS_SUCCESS,
  CRIMINAL_DETAILS_FAIL,
} from "../constants/criminalConstants";
import { SERVER_IP } from "./userActions";

export const createCriminal = (navigate,criminal) => async (dispatch, getState) => {
  dispatch({ type: CRIMINAL_CREATION_REQUEST, payload: criminal });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(`http://${SERVER_IP}/criminal-service/criminals/`,criminal,{
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    );
    dispatch({ type: CRIMINAL_CREATION_SUCCESS, payload: data.message });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate('/login-register');
    }
    dispatch({
      type: CRIMINAL_CREATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getCriminalDetails = (navigate,criminalId) => async (dispatch, getState) => {
  dispatch({ type: CRIMINAL_DETAILS_REQUEST, payload: criminalId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(
      `http://${SERVER_IP}/criminal-service/criminals/${criminalId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: CRIMINAL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/login-register");
    }
    dispatch({
      type: CRIMINAL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

