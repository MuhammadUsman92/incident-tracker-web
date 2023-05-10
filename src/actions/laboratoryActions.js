import Axios from 'axios';
import {
    LABORATORY_CREATION_REQUEST,
    LABORATORY_CREATION_SUCCESS,
    LABORATORY_CREATION_FAIL,
} from '../constants/laboratoryConstants';

export const laboratoryCreate = (laboratory) => async (dispatch, getState) => {
    dispatch({ type: LABORATORY_CREATION_REQUEST, payload: laboratory });
    try {
        // const {
        //   userSignin: { userInfo },
        // } = getState();
        // const { data } = await Axios.post('localhost:8084/laboratory/', laboratory, {
        const { data } = await Axios.post('http://localhost:8084/laboratory/', laboratory, {
            // headers: {
            //   Authorization: `Bearer ${userInfo.token}`,
            // },
        });
        dispatch({ type: LABORATORY_CREATION_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: LABORATORY_CREATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};