import {actionTypes} from "../../../Actions/Private/PortForm/PortForm.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,
    PortID: 0,
    PortName: '',
    PortCode: "",
    PortHasEditPermission: false,
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function PortForm(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.RESET_PORT_FORM :
            return InitialState;

        case actionTypes.FORM_OPEN :
            return {
                ...state,
                FormOpen: action.payload,
            };

        case actionTypes.FORM_MODE :
            return {
                ...state,
                FormMode: action.payload,
            };

        case actionTypes.DATA_GRID_SHOULD_RELOAD :
            return {
                ...state,
                DataGridShouldReload: action.payload,
            };

        case actionTypes.HANDLE_PORT_ID :
            return {
                ...state,
                PortID: action.payload,
            };

        case actionTypes.HANDLE_PORT_NAME :
            return {
                ...state,
                PortName: action.payload,
            };
        case actionTypes.HANDLE_PORT_CODE :
            return {
                ...state,
                PortName: action.payload,
            };
        

        case actionTypes.HANDLE_PORT_HAS_EDIT_PERMISSION :
            return {
                ...state,
                PortHasEditPermission: action.payload,
            };

        default :
            return state;
    }
}
