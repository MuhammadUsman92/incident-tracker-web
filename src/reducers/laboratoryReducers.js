import {
    LABORATORY_CREATION_REQUEST,
    LABORATORY_CREATION_SUCCESS,
    LABORATORY_CREATION_FAIL,
} from '../constants/laboratoryConstants';

export const laboratoryCreationReducer = (state = {}, action) => {
    switch (action.type) {
        case LABORATORY_CREATION_REQUEST:
            return { loading: true };
        case LABORATORY_CREATION_SUCCESS:
            return { loading: false, response: action.payload };
        case LABORATORY_CREATION_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};