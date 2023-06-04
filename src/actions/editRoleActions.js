import Axios from "axios";
import {
  EDIT_ROLE_REQUEST,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_FAIL,
} from "../constants/editRolesConstants";

export const editUserRole =
  (userId, newRoles) => async (dispatch, getState) => {
    dispatch({ type: EDIT_ROLE_REQUEST, payload: { userId, newRoles } });
    try {
      const { data } = await Axios.put(
        `http://localhost:8084/users/${userId}/roles`,
        { roles: newRoles }
      );
      dispatch({ type: EDIT_ROLE_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: EDIT_ROLE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
