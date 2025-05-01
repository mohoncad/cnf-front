import {actionTypes} from "../../../Actions/Private/NetworkError/NetworkError.Action";

const InitialState = {
    NetworkError: false,
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function NETWORK_ERROR(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.HANDLE_SET_NETWORK_ERROR : return {
            NetworkError: action.payload,
        }

        default :
            return state;
    }
}
