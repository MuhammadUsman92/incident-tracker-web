import Axios from "axios";
import {
  EDIT_ROLE_REQUEST,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_FAIL,
} from "../constants/editRolesConstants";
import { SERVER_IP } from "./userActions";
import {getAllUsers} from './userActions'

export const editUserRole =
  (navigate,userId, roles) => async (dispatch, getState) => {
    dispatch({ type: EDIT_ROLE_REQUEST, payload: { userId, roles } });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.put(`http://${SERVER_IP}/authentication-service/user/userId/${userId}`,roles,{
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    });
      dispatch({ type: EDIT_ROLE_SUCCESS, payload: data.message });
      dispatch(getAllUsers(navigate));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login-register');
      }
      dispatch({
        type: EDIT_ROLE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
