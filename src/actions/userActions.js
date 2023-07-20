import Axios from 'axios';
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
} from '../constants/userConstants';

export const SERVER_IP = "35.223.125.47:8080";

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(`http://${SERVER_IP}/authentication-service/api/v1/auth/register`, {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    // localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error
    });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(`http://${SERVER_IP}/authentication-service/api/v1/auth/login`, { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error)
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:error
    });
  }
};
export const signout = (navigate) => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_SIGNOUT });
  navigate('/login-register');
};
export const getAllUsers = (navigate) => async (dispatch,getState) => {
  dispatch({ type: GET_ALL_USER_REQUEST});
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`http://${SERVER_IP}/authentication-service/user/`,{
  headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(signout(navigate)); 
    }    
    dispatch({
      type: GET_ALL_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
