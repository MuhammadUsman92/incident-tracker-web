import Axios from "axios";
import {
  CRIME_CREATION_REQUEST,
  CRIME_CREATION_SUCCESS,
  CRIME_CREATION_FAIL,
} from "../constants/crimeConstants";
import { SERVER_IP } from "./userActions";
import { useNavigate } from 'react-router-dom';

export const createCrime = (navigate,crime) => async (dispatch,getState) => {
  dispatch({ type: CRIME_CREATION_REQUEST, payload: crime });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(`http://${SERVER_IP}/criminal-service/crimes/`, crime,{
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: CRIME_CREATION_SUCCESS, payload: data.message });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate('/login-register');
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
