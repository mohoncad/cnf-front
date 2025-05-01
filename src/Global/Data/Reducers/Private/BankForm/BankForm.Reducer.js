import {actionTypes} from "../../../Actions/Private/BankForm/BankForm.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,
    BankID: 0,
    BankCode: '',
    BankName: '',
    BranchName: '',
    AccountType: '',
    AccountName: '',
    AccountNumber: '',
    BankHasEditPermission: false,
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function BankForm(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.RESET_BANK_FORM :
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

        case actionTypes.HANDLE_BANK_ID :
            return {
                ...state,
                BankID: action.payload,
            };

        case actionTypes.HANDLE_BANK_CODE :
            return {
                ...state,
                BankCode: action.payload,
            };

        case actionTypes.HANDLE_BANK_NAME :
            return {
                ...state,
                BankName: action.payload,
            };

        case actionTypes.HANDLE_BANK_BANK_NAME :
            return {
                ...state,
                BranchName: action.payload,
            };

        case actionTypes.HANDLE_BANK_ACCOUNT_TYPE :
            return {
                ...state,
                AccountType: action.payload,
            };

        case actionTypes.HANDLE_BANK_ACCOUNT_NAME :
            return {
                ...state,
                AccountName: action.payload,
            };

        case actionTypes.HANDLE_BANK_ACCOUNT_NUMBER :
            return {
                ...state,
                AccountNumber: action.payload,
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
