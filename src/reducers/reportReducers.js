import {
  REPORT_CREATION_REQUEST,
  REPORT_CREATION_SUCCESS,
  REPORT_CREATION_FAIL,
} from "../constants/reportConstants";

export const reportCreationReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_CREATION_REQUEST:
      return { loading: true };
    case REPORT_CREATION_SUCCESS:
      return { loading: false, response: action.payload };
    case REPORT_CREATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
