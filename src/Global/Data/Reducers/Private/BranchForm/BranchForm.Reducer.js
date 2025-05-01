import {actionTypes} from "../../../Actions/Private/BranchForm/BranchForm.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,
    BranchID: 0,
    BranchCode: '',
    BranchName: '',
    BranchAddress: '',
    BranchEmailAddress: '',
    BranchContactNumber: '',
    BranchHasEditPermission: false,
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function BranchForm(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.RESET_BRANCH_FORM :
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

        case actionTypes.HANDLE_BRANCH_ID :
            return {
                ...state,
                BranchID: action.payload,
            };

        case actionTypes.HANDLE_BRANCH_CODE :
            return {
                ...state,
                BranchCode: action.payload,
            };

        case actionTypes.HANDLE_BRANCH_NAME :
            return {
                ...state,
                BranchName: action.payload,
            };

        case actionTypes.HANDLE_BRANCH_ADDRESS :
            return {
                ...state,
                BranchAddress: action.payload,
            };

        case actionTypes.HANDLE_BRANCH_EMAIL_ADDRESS :
            return {
                ...state,
                BranchEmailAddress: action.payload,
            };

        case actionTypes.HANDLE_BRANCH_CONTACT_NUMBER :
            return {
                ...state,
                BranchContactNumber: action.payload,
            };

        case actionTypes.HANDLE_BRANCH_HAS_EDIT_PERMISSION :
            return {
                ...state,
                BranchHasEditPermission: action.payload,
            };

        default :
            return state;
    }
}
