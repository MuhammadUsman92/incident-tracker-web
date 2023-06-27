import Axios from 'axios';
import {
    DOCTOR_CREATION_REQUEST,
    DOCTOR_CREATION_SUCCESS,
    DOCTOR_CREATION_FAIL,
} from '../constants/doctorConstants';
import { SERVER_IP,signout } from "./userActions";


export const doctorCreate = (navigate,doctor) => async (dispatch, getState) => {
    dispatch({ type: DOCTOR_CREATION_REQUEST, payload: doctor });
    try {
        const {
          userSignin: { userInfo },
        } = getState();
        const { data } = await Axios.post(`http://${SERVER_IP}/health-service/doctor/`, doctor, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: DOCTOR_CREATION_SUCCESS, payload: data.message });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            dispatch(signout(navigate));
        }
        dispatch({
            type: DOCTOR_CREATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};