import {actionTypes} from "../../../Actions/Private/Auth/Auth.Action";

const InitialState = {
    Authenticated: true,
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function AUTH(state = InitialState, action) {
    switch (action.type) {

        case actionTypes.HANDLE_SET_AUTH : return {
            Authenticated: action.payload,
        }

        default :
            return state;
    }
}
