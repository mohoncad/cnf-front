/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'BRANCH/FORM/';

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
    DATA_GRID_SHOULD_RELOAD: USE('DATA_GRID_SHOULD_RELOAD'),
    RESET_BRANCH_FORM: USE('RESET_BRANCH_FORM'),

    HANDLE_BRANCH_ID: USE('HANDLE_BRANCH_ID'),
    HANDLE_BRANCH_CODE: USE('HANDLE_BRANCH_CODE'),
    HANDLE_BRANCH_NAME: USE('HANDLE_BRANCH_NAME'),
    HANDLE_BRANCH_ADDRESS: USE('HANDLE_BRANCH_ADDRESS'),
    HANDLE_BRANCH_EMAIL_ADDRESS: USE('HANDLE_BRANCH_EMAIL_ADDRESS'),
    HANDLE_BRANCH_CONTACT_NUMBER: USE('HANDLE_BRANCH_CONTACT_NUMBER'),
    HANDLE_BRANCH_HAS_EDIT_PERMISSION: USE('HANDLE_BRANCH_HAS_EDIT_PERMISSION'),
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
 * Handling the form mode
 * @param value {string} [ADD, EDIT, VIEW]
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
 * Handling the grid reload status, if any action changes the grid will be notified to reload it itself
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
 * Clear the form or reset all the states
 * @returns {{payload: null, type: string}}
 * @constructor
 */
export function ResetBranchForm() {
    return {
        type: actionTypes.RESET_BRANCH_FORM,
        payload: null,
    }
}

/**
 * Handling the branch Id
 * @param value {number}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBranchID(value) {
    return {
        type: actionTypes.HANDLE_BRANCH_ID,
        payload: value,
    }
}

/**
 * Handling the Branch Code (Unique Code)
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBranchCode(value) {
    return {
        type: actionTypes.HANDLE_BRANCH_CODE,
        payload: value,
    }
}

/**
 * Handling the Branch Name
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBranchName(value) {
    return {
        type: actionTypes.HANDLE_BRANCH_NAME,
        payload: value,
    }
}

/**
 * Handling the Branch Address
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBranchAddress(value) {
    return {
        type: actionTypes.HANDLE_BRANCH_ADDRESS,
        payload: value,
    }
}

/**
 * Handling the email address
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBranchEmailAddress(value) {
    return {
        type: actionTypes.HANDLE_BRANCH_EMAIL_ADDRESS,
        payload: value,
    }
}

/**
 * Handling the Contact Number
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBranchContactNumber(value) {
    return {
        type: actionTypes.HANDLE_BRANCH_CONTACT_NUMBER,
        payload: value,
    }
}

/**
 * Handling the branch edit permission if it has any of [true, false]
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBranchHasEditPermission(value) {
    return {
        type: actionTypes.HANDLE_BRANCH_HAS_EDIT_PERMISSION,
        payload: value,
    }
}
