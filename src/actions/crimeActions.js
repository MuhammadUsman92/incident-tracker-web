import Axios from "axios";
import {
  CRIME_CREATION_REQUEST,
  CRIME_CREATION_SUCCESS,
  CRIME_CREATION_FAIL,
  GET_CRIME_REQUEST,
  GET_CRIME_SUCCESS,
  GET_CRIME_FAIL,
} from "../constants/crimeConstants";
import { SERVER_IP,signout } from "./userActions";

export const createCrime = (navigate,crime) => async (dispatch,getState) => {
  dispatch({ type: CRIME_CREATION_REQUEST, payload: crime });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(`http://${SERVER_IP}/criminal-service/crime/`, crime,{
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    
    console.log(data)
    dispatch({ type: CRIME_CREATION_SUCCESS, payload: data.message });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(signout(navigate));
    }
    dispatch({
      type: CRIME_CREATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCrimeById = (navigate,crimeId) => async (dispatch, getState) => {
  dispatch({ type: GET_CRIME_REQUEST, payload: crimeId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(
      `http://${SERVER_IP}/criminal-service/crime/${crimeId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: GET_CRIME_SUCCESS, payload: data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(signout(navigate));
    }
    dispatch({
      type: GET_CRIME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
