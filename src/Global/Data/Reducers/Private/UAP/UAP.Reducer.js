import {actionTypes} from "../../../Actions/Private/UAP/UAP.Action";

const InitialState = {
    Loading: false,
    Loaded: false,
    UAP_MODULES: [],
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function UAP_MODULE_LIST(state = InitialState, action) {
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

        case actionTypes.HANDLE_UAP_MODULES :
            return {
                ...state,
                UAP_MODULES: action.payload,
            };

        default :
            return state;
    }
}
