import Axios from 'axios';
import {
    DOCTOR_CREATION_REQUEST,
    DOCTOR_CREATION_SUCCESS,
    DOCTOR_CREATION_FAIL,
} from '../constants/doctorConstants';

export const doctorCreate = (doctor) => async (dispatch, getState) => {
    dispatch({ type: DOCTOR_CREATION_REQUEST, payload: doctor });
    try {
        // const {
        //   userSignin: { userInfo },
        // } = getState();
        // const { data } = await Axios.post('localhost:8084/doctor/', doctor, {
        const { data } = await Axios.post('http://localhost:8084/doctor/', doctor, {
            // headers: {
            //   Authorization: `Bearer ${userInfo.token}`,
            // },
        });
        dispatch({ type: DOCTOR_CREATION_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: DOCTOR_CREATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};