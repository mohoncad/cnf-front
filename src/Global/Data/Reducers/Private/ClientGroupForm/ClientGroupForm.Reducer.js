import {actionTypes} from "../../../Actions/Private/ClientGroupForm/ClientGroupForm.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,
    ClientID: 0,
    ClientName: '',
    ClientHasEditPermission: false,
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function ClientGroupForm(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.RESET_CLIENT_FORM :
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

        case actionTypes.HANDLE_CLIENT_ID :
            return {
                ...state,
                BankID: action.payload,
            };

        case actionTypes.HANDLE_CLIENT_NAME :
            return {
                ...state,
                BankName: action.payload,
            };

        case actionTypes.HANDLE_BANK_HAS_EDIT_PERMISSION :
            return {
                ...state,
                BankHasEditPermission: action.payload,
            };

        default :
            return state;
    }
}
