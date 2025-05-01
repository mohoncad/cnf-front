import {Store} from "../../../Store";

/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'SUPPLIERS/FORM/';

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

    HANDLE_EDIT_PERMISSION: USE('HANDLE_EDIT_PERMISSION'),
    HANDLE_SUPPLIER_ID: USE('HANDLE_SUPPLIER_ID'),
    HANDLE_BRANCH_LIST: USE('HANDLE_BRANCH_LIST'),
    HANDLE_CODE: USE('HANDLE_CODE'),
    HANDLE_NAME: USE('HANDLE_NAME'),
    HANDLE_PHONE: USE('HANDLE_PHONE'),
    HANDLE_EMAIL: USE('HANDLE_EMAIL'),
    HANDLE_ADDRESS: USE('HANDLE_ADDRESS'),
    HANDLE_STATUS: USE('HANDLE_STATUS'),
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
export function HandleHasEditPermission(value) {
    return {
        type: actionTypes.HANDLE_EDIT_PERMISSION,
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
 * Handling the Client List Data
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
export function HandleSupplierId(value) {
    return {
        type: actionTypes.HANDLE_SUPPLIER_ID,
        payload: value
    }
}


/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleCode(value) {
    return {
        type: actionTypes.HANDLE_CODE,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleName(value) {
    return {
        type: actionTypes.HANDLE_NAME,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandlePhone(value) {
    return {
        type: actionTypes.HANDLE_PHONE,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
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
 * Handling the code
 * @param value {Array}
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
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleStatus(value) {
    return {
        type: actionTypes.HANDLE_STATUS,
        payload: value
    }
}