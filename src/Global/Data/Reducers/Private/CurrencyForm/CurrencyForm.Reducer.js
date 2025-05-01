import {actionTypes} from "../../../Actions/Private/CurrencyForm/CurrencyForm.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,
    CurrencyID: 0,
    CurrencyName: '',
    CurrencyRate: 0,
    CurrencyHasEditPermission: false,
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function CurrencyForm(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.RESET_CURRENCY_FORM :
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

        case actionTypes.HANDLE_CURRENCY_ID :
            return {
                ...state,
                CurrencyID: action.payload,
            };

        case actionTypes.HANDLE_CURRENCY_NAME :
            return {
                ...state,
                CurrencyName: action.payload,
            };
        
        case actionTypes.HANDLE_CURRENCY_RATE :
            return {
                ...state,
                CurrencyRate: action.payload,
            };

        case actionTypes.HANDLE_CURRENCY_HAS_EDIT_PERMISSION :
            return {
                ...state,
                CurrencyHasEditPermission: action.payload,
            };

        default :
            return state;
    }
}
