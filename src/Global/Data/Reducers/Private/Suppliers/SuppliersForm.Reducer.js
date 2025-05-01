import {actionTypes} from "../../../Actions/Private/Suppliers/SuppliersForm.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,

    SuppliersRoleList: [],
    BranchList: [],

    IsSelfProfile: false,
    SuppliersID: 0,
    Code: '',
    Name: '',
    Phone: '',
    Email: '',
    Address: '',
    Status: true,
    MasterFlagEditPermission: false,
    HasEditPermission: false,
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function SuppliersForm(state = InitialState, action) {

    switch (action.type) {
        case actionTypes.FORM_OPEN : return {
            ...state,
            FormOpen: action.payload,
        };
        case actionTypes.HANDLE_EDIT_PERMISSION : return {
            ...state,
            HasEditPermission: action.payload,
        };
        
        case actionTypes.FORM_MODE : return {
            ...state,
            FormMode: action.payload,
        };

        case actionTypes.HANDLE_SUPPLIER_ID : return {
            ...state,
            SuppliersID: action.payload,
        };

        case actionTypes.DATA_GRID_SHOULD_RELOAD : return {
            ...state,
            DataGridShouldReload: action.payload,
        };

        case actionTypes.HANDLE_BRANCH_LIST :
            return {
                ...state,
                BranchList: action.payload
            };
        
        case actionTypes.HANDLE_CODE :
            return {
                ...state,
                Code: action.payload
            };

        case actionTypes.HANDLE_NAME :
            return {
                ...state,
                Name: action.payload
            };
        
        case actionTypes.HANDLE_PHONE :
            return {
                ...state,
                Phone: action.payload
            };
            case actionTypes.HANDLE_EMAIL :
            return {
                ...state,
                Email: action.payload
            };

        case actionTypes.HANDLE_ADDRESS :
            return {
                ...state,
                Address: action.payload
            };
            case actionTypes.HANDLE_STATUS :
                return {
                    ...state,
                    Status: action.payload
                };                

        case actionTypes.RESET_FORM :
            return InitialState;

        default :
            return state;
    }
}
