import Axios from 'axios';
import {
    HOSPITAL_CREATION_REQUEST,
    HOSPITAL_CREATION_SUCCESS,
    HOSPITAL_CREATION_FAIL,
} from '../constants/hospitalConstants';

export const hospitalCreate = (hospital) => async (dispatch, getState) => {
    dispatch({ type: HOSPITAL_CREATION_REQUEST, payload: hospital });
    try {
        // const {
        //   userSignin: { userInfo },
        // } = getState();
        // const { data } = await Axios.post('localhost:8084/hospital/', hospital, {
        const { data } = await Axios.post('http://localhost:8084/hospital/', hospital, {
            // headers: {
            //   Authorization: `Bearer ${userInfo.token}`,
            // },
        });
        dispatch({ type: HOSPITAL_CREATION_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: HOSPITAL_CREATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};