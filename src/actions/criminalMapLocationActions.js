import Axios from 'axios';
import {GET_CRIMINAL_MAP_lOCATION_FAIL,
    GET_CRIMINAL_MAP_lOCATION_REQUEST, 
    GET_CRIMINAL_MAP_lOCATION_SUCCESS} from '../constants/criminalMapLocationConstants';
import { SERVER_IP,signout } from "./userActions";


export const criminalMapLocationGet = (navigate,formdata) => async (dispatch, getState) => {
    dispatch({ type: GET_CRIMINAL_MAP_lOCATION_REQUEST, payload: formdata });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.get(`http://${SERVER_IP}/criminal-service/location/latitude/${formdata.lat}/longitude/${formdata.long}/radius/${formdata.radius}` ,{
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: GET_CRIMINAL_MAP_lOCATION_SUCCESS, payload: data });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(signout(navigate)); 
      }
      dispatch({
        type: GET_CRIMINAL_MAP_lOCATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };