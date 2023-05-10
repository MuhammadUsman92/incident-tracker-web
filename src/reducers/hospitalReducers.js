import {
    HOSPITAL_CREATION_REQUEST,
    HOSPITAL_CREATION_SUCCESS,
    HOSPITAL_CREATION_FAIL,
} from '../constants/hospitalConstants';

export const hospitalCreationReducer = (state = {}, action) => {
    switch (action.type) {
        case HOSPITAL_CREATION_REQUEST:
            return { loading: true };
        case HOSPITAL_CREATION_SUCCESS:
            return { loading: false, response: action.payload };
        case HOSPITAL_CREATION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};