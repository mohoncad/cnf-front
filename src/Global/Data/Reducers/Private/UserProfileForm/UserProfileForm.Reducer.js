import {actionTypes} from "../../../Actions/Private/UserProfileForm/UserProfileForm.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,

    UserRoleList: [],
    BranchList: [],

    IsSelfProfile: false,
    UserID: 0,
    Code: '',
    UserRoleID: 0,
    SelectedBranchList: [],
    CompanyID: 0,
    IsSupportUser: false,
    IsActive: false,
    IsMasterUser: false,
    FullName: '',
    Email: '',
    Password: '',
    ContactNumber: '',
    Address: '',
    ProfilePhotoUrl: '',
    ProfilePhotoFile: '',

    MasterFlagEditPermission: false,
    HasEditPermission: false,
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function UserProfileForm(state = InitialState, action) {

    switch (action.type) {
        case actionTypes.FORM_OPEN : return {
            ...state,
            FormOpen: action.payload,
        };

        case actionTypes.FORM_MODE : return {
            ...state,
            FormMode: action.payload,
        };

        case actionTypes.DATA_GRID_SHOULD_RELOAD : return {
            ...state,
            DataGridShouldReload: action.payload,
        };

        case actionTypes.HANDLE_USER_ROLE_LIST :
            return {
                ...state,
                UserRoleList: action.payload
            };

        case actionTypes.HANDLE_BRANCH_LIST :
            return {
                ...state,
                BranchList: action.payload
            };

        case actionTypes.HANDLE_IS_SELF_PROFILE :
            return {
                ...state,
                IsSelfProfile: action.payload
            };

        case actionTypes.HANDLE_USER_ID :
            return {
                ...state,
                UserID: action.payload
            };

        case actionTypes.HANDLE_USER_ROLE_ID :
            return {
                ...state,
                UserRoleID: action.payload
            };

        case actionTypes.HANDLE_SELECTED_BRANCH_LIST :
            return {
                ...state,
                SelectedBranchList: action.payload
            };

        case actionTypes.HANDLE_COMPANY_ID :
            return {
                ...state,
                CompanyID: action.payload
            };

        case actionTypes.HANDLE_IS_SUPPORT_USER :
            return {
                ...state,
                IsSupportUser: action.payload
            };

        case actionTypes.HANDLE_IS_ACTIVE :
            return {
                ...state,
                IsActive: action.payload
            };

        case actionTypes.HANDLE_IS_MASTER_USER :
            return {
                ...state,
                IsMasterUser: action.payload
            };

        case actionTypes.HANDLE_FULL_NAME :
            return {
                ...state,
                FullName: action.payload
            };

        case actionTypes.HANDLE_EMAIL :
            return {
                ...state,
                Email: action.payload
            };

        case actionTypes.HANDLE_PASSWORD :
            return {
                ...state,
                Password: action.payload
            };

        case actionTypes.HANDLE_CONTACT_NUMBER :
            return {
                ...state,
                ContactNumber: action.payload
            };

        case actionTypes.HANDLE_ADDRESS :
            return {
                ...state,
                Address: action.payload
            };

        case actionTypes.HANDLE_PROFILE_PHOTO_URL :
            return {
                ...state,
                ProfilePhotoUrl: action.payload
            };

        case actionTypes.HANDLE_PROFILE_PHOTO_FILE :
            return {
                ...state,
                ProfilePhotoFile: action.payload
            };

        case actionTypes.HANDLE_MASTER_FLAG_EDIT_PERMISSION :
            return {
                ...state,
                MasterFlagEditPermission: action.payload
            };

        case actionTypes.HANDLE_HAS_EDIT_PERMISSION :
            return {
                ...state,
                HasEditPermission: action.payload
            };

        case actionTypes.RESET_FORM :
            return InitialState;

        default :
            return state;
    }
}
