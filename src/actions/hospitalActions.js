import Axios from 'axios';
import {
    HOSPITAL_CREATION_REQUEST,
    HOSPITAL_CREATION_SUCCESS,
    HOSPITAL_CREATION_FAIL,
} from '../constants/hospitalConstants';
import { SERVER_IP,signout } from "./userActions";


export const hospitalCreate = (navigate,hospital) => async (dispatch, getState) => {
    dispatch({ type: HOSPITAL_CREATION_REQUEST, payload: hospital });
    try {
        const {
          userSignin: { userInfo },
        } = getState();
        const { data } = await Axios.post(`http://${SERVER_IP}/health-service/hospital/`, hospital, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: HOSPITAL_CREATION_SUCCESS, payload: data.message });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            dispatch(signout(navigate)); 
        }
        dispatch({
            type: HOSPITAL_CREATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};