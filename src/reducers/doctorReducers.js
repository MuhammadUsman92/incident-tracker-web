import {
    DOCTOR_CREATION_REQUEST,
    DOCTOR_CREATION_SUCCESS,
    DOCTOR_CREATION_FAIL,
} from '../constants/doctorConstants';

export const doctorCreationReducer = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_CREATION_REQUEST:
            return { loading: true };
        case DOCTOR_CREATION_SUCCESS:
            return { loading: false, response: action.payload };
        case DOCTOR_CREATION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};