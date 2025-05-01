import {actionTypes} from "../../../Actions/Private/UnitForm/UnitForm.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,
    UnitID: 0,
    UnitName: '',
    UnitHasEditPermission: false,
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function UnitForm(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.RESET_UNIT_FORM :
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

        case actionTypes.HANDLE_UNIT_ID :
            return {
                ...state,
                UnitID: action.payload,
            };

        case actionTypes.HANDLE_UNIT_NAME :
            return {
                ...state,
                UnitName: action.payload,
            };
    

        case actionTypes.HANDLE_UNIT_HAS_EDIT_PERMISSION :
            return {
                ...state,
                UnitHasEditPermission: action.payload,
            };

        default :
            return state;
    }
}
