import Axios from 'axios';
import {
    LABORATORY_CREATION_REQUEST,
    LABORATORY_CREATION_SUCCESS,
    LABORATORY_CREATION_FAIL,
} from '../constants/laboratoryConstants';
import { SERVER_IP } from "./userActions";


export const laboratoryCreate = (navigate,laboratory) => async (dispatch, getState) => {
    dispatch({ type: LABORATORY_CREATION_REQUEST, payload: laboratory });
    try {
        const {
          userSignin: { userInfo },
        } = getState();
        const { data } = await Axios.post(`http://${SERVER_IP}/health-service/laboratory/`, laboratory, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: LABORATORY_CREATION_SUCCESS, payload: data.message });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            navigate('/login-register');
          }
        dispatch({
            type: LABORATORY_CREATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};