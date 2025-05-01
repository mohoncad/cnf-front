import {Store} from "../../../Store";

/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'USER/FORM/';

/**
 * A constructor to return the action with namespace, Must use as defined
 * @private Not Exported
 * @param ACTION {string}
 * @returns {string}
 * @constructor
 */
function USE(ACTION) {
    return NAMESPACE + ACTION;
}

//Action types
export const actionTypes = {
    FORM_OPEN: USE('FORM_OPEN'),
    FORM_MODE: USE('FORM_MODE'),
    RESET_FORM: USE('RESET_FORM'),

    DATA_GRID_SHOULD_RELOAD: USE('DATA_GRID_SHOULD_RELOAD'),

    HANDLE_USER_ROLE_LIST: USE('HANDLE_USER_ROLE_LIST'),
    HANDLE_BRANCH_LIST: USE('HANDLE_BRANCH_LIST'),
    HANDLE_USER_ID: USE('HANDLE_USER_ID'),
    HANDLE_IS_SELF_PROFILE: USE('HANDLE_IS_SELF_PROFILE'),
    HANDLE_USER_CODE: USE('HANDLE_USER_CODE'),
    HANDLE_USER_ROLE_ID: USE('HANDLE_USER_ROLE_ID'),
    HANDLE_SELECTED_BRANCH_LIST: USE('HANDLE_SELECTED_BRANCH_LIST'),
    HANDLE_COMPANY_ID: USE('HANDLE_COMPANY_ID'),
    HANDLE_IS_SUPPORT_USER: USE('HANDLE_IS_SUPPORT_USER'),
    HANDLE_IS_ACTIVE: USE('HANDLE_IS_ACTIVE'),
    HANDLE_IS_MASTER_USER: USE('HANDLE_IS_MASTER_USER'),
    HANDLE_FULL_NAME: USE('HANDLE_FULL_NAME'),
    HANDLE_EMAIL: USE('HANDLE_EMAIL'),
    HANDLE_PASSWORD: USE('HANDLE_PASSWORD'),
    HANDLE_CONTACT_NUMBER: USE('HANDLE_CONTACT_NUMBER'),
    HANDLE_ADDRESS: USE('HANDLE_ADDRESS'),
    HANDLE_PROFILE_PHOTO_URL: USE('HANDLE_PROFILE_PHOTO_URL'),
    HANDLE_PROFILE_PHOTO_FILE: USE('HANDLE_PROFILE_PHOTO_FILE'),
    HANDLE_MASTER_FLAG_EDIT_PERMISSION: USE('HANDLE_MASTER_FLAG_EDIT_PERMISSION'),
    HANDLE_HAS_EDIT_PERMISSION: USE('HANDLE_HAS_EDIT_PERMISSION'),
};

/**
 * Handling the form open status
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleFormOpen(value) {
    return {
        type: actionTypes.FORM_OPEN,
        payload: value,
    }
}

/**
 * Handling the form mode one of [ADD, EDIT, VIEW]
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleFormMode(value) {
    return {
        type: actionTypes.FORM_MODE,
        payload: value,
    }
}

/**
 * Handling the grid reload notifier, when true the grid is notified to re render
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleDataGridShouldReload(value) {
    return {
        type: actionTypes.DATA_GRID_SHOULD_RELOAD,
        payload: value,
    }
}

/**
 * Clears the form or returns the initial state
 * @returns {{type: string}}
 * @constructor
 */
export function ResetForm() {
    return {
        type: actionTypes.RESET_FORM,
    }
}

/**
 * Handling User Role List
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleUserRoleList(value) {
    return {
        type: actionTypes.HANDLE_USER_ROLE_LIST,
        payload: value
    }
}

/**
 * Handling the Branch List Data
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBranchList(value) {
    return {
        type: actionTypes.HANDLE_BRANCH_LIST,
        payload: value
    }
}

/**
 * Handling the Is Self Profile Flag, Whether the user is a session user or not
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleIsSelfProfile(value) {
    return {
        type: actionTypes.HANDLE_IS_SELF_PROFILE,
        payload: value
    }
}

/**
 * Handling the User Id
 * @param value {number}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleUserID(value) {
    return {
        type: actionTypes.HANDLE_USER_ID,
        payload: value
    }
}

/**
 * Handling the User Code (Unique)
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleUserCode(value) {
    return {
        type: actionTypes.HANDLE_USER_CODE,
        payload: value
    }
}

/**
 * Handling the User Role ID
 * @param value {number}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleUserRoleID(value) {
    return {
        type: actionTypes.HANDLE_USER_ROLE_ID,
        payload: value
    }
}

/**
 * Handling the Selected Branch List Array
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleSelectedBranchList(value) {
    return {
        type: actionTypes.HANDLE_SELECTED_BRANCH_LIST,
        payload: value
    }
}

/**
 * Handling the Company ID
 * @param value {number}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleCompanyID(value) {
    return {
        type: actionTypes.HANDLE_COMPANY_ID,
        payload: value
    }
}

/**
 * Handling Is Support User, Is a admin user
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleIsSupportUser(value) {
    return {
        type: actionTypes.HANDLE_IS_SUPPORT_USER,
        payload: value
    }
}

/**
 * Handling Is Active Flag, Active or banned status
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleIsActive(value) {
    return {
        type: actionTypes.HANDLE_IS_ACTIVE,
        payload: value
    }
}

/**
 * Handling Is Master User FLag
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleIsMasterUser(value) {
    //make the selected user role to the zero
    if(value === true) {
        Store.dispatch(HandleUserRoleID(0));
    }

    return {
        type: actionTypes.HANDLE_IS_MASTER_USER,
        payload: value
    }
}

/**
 * Handling the Full Name
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleFullName(value) {
    return {
        type: actionTypes.HANDLE_FULL_NAME,
        payload: value
    }
}

/**
 * Handling the Email address
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleEmail(value) {
    return {
        type: actionTypes.HANDLE_EMAIL,
        payload: value
    }
}

/**
 * Handling the Password
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandlePassword(value) {
    return {
        type: actionTypes.HANDLE_PASSWORD,
        payload: value
    }
}

/**
 * Handling the Contaxct Number
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleContactNumber(value) {
    return {
        type: actionTypes.HANDLE_CONTACT_NUMBER,
        payload: value
    }
}

/**
 * Handling the Address
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleAddress(value) {
    return {
        type: actionTypes.HANDLE_ADDRESS,
        payload: value
    }
}

/**
 * Handling the Profile Photo Url
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleProfilePhotoUrl(value) {
    return {
        type: actionTypes.HANDLE_PROFILE_PHOTO_URL,
        payload: value
    }
}

/**
 * Handling the profile photo file object
 * @param value {Object}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleProfilePhotoFile(value) {
    return {
        type: actionTypes.HANDLE_PROFILE_PHOTO_FILE,
        payload: value
    }
}

/**
 * Handling the Master Flag Edit Permission Flag
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleMasterFlagEditPermission(value) {
    return {
        type: actionTypes.HANDLE_MASTER_FLAG_EDIT_PERMISSION,
        payload: value
    }
}

/**
 * Handling the Has Edit Permission Flag
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleHasEditPermission(value) {
    return {
        type: actionTypes.HANDLE_HAS_EDIT_PERMISSION,
        payload: value
    }
}
