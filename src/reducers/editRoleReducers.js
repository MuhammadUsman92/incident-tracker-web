import {
  EDIT_ROLE_REQUEST,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_FAIL,
} from "../constants/editRolesConstants";

export const roleEditReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_ROLE_REQUEST:
      return { loading: true };
    case EDIT_ROLE_SUCCESS:
      return { loading: false, response: action.payload };
    case EDIT_ROLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
