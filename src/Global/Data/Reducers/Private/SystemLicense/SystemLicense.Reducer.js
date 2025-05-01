import {actionTypes} from "../../../Actions/Private/SystemLicense/SystemLicense.Action";

const InitialState = {
    Loading: false,
    Loaded: false,
    LICENSE_INFO: {},
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function SYSTEM_LICENSE(state = InitialState, action) {
    switch (action.type) {

        case actionTypes.HANDLE_LOADING :
            return {
                ...state,
                Loading: action.payload,
            };

        case actionTypes.HANDLE_LOADED :
            return {
                ...state,
                Loaded: action.payload,
            };

        case actionTypes.HANDLE_SYSTEM_LICENSE :
            return {
                ...state,
                LICENSE_INFO: action.payload,
            };

        default :
            return state;
    }
}
