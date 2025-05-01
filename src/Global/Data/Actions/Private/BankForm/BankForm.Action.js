/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'BANK/FORM/';

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
    RESET_BANK_FORM: USE('RESET_BANK_FORM'),

    HANDLE_BANK_ID: USE('HANDLE_BANK_ID'),
    HANDLE_BANK_CODE: USE('HANDLE_BANK_CODE'),
    HANDLE_BANK_NAME: USE('HANDLE_BANK_NAME'),
    HANDLE_BANK_BANK_NAME: USE('HANDLE_BANK_BANK_NAME'),
    HANDLE_BANK_ACCOUNT_TYPE: USE('HANDLE_BANK_ACCOUNT_TYPE'),
    HANDLE_BANK_ACCOUNT_NAME: USE('HANDLE_BANK_ACCOUNT_NAME'),
    HANDLE_BANK_ACCOUNT_NUMBER: USE('HANDLE_BANK_ACCOUNT_NUMBER'),
    HANDLE_BANK_HAS_EDIT_PERMISSION: USE('HANDLE_BANK_HAS_EDIT_PERMISSION'),
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
export function ResetBankForm() {
    return {
        type: actionTypes.RESET_BANK_FORM,
        payload: null,
    }
}

/**
 * Handling the bank Id
 * @param value {number}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBankID(value) {
    return {
        type: actionTypes.HANDLE_BANK_ID,
        payload: value,
    }
}

/**
 * Handling the Bank Code (Unique Code)
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBankCode(value) {
    return {
        type: actionTypes.HANDLE_BANK_CODE,
        payload: value,
    }
}

/**
 * Handling the Bank Name
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBankName(value) {
    return {
        type: actionTypes.HANDLE_BANK_NAME,
        payload: value,
    }
}

/**
 * Handling the Bank Branch Name
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBankBranchName(value) {
    return {
        type: actionTypes.HANDLE_BANK_BANK_NAME,
        payload: value,
    }
}

/**
 * Handling the Bank Account Type
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBankAccountType(value) {
    return {
        type: actionTypes.HANDLE_BANK_ACCOUNT_TYPE,
        payload: value,
    }
}

/**
 * Handling the Bank Account Name
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBankAccountName(value) {
    return {
        type: actionTypes.HANDLE_BANK_ACCOUNT_NAME,
        payload: value,
    }
}

/**
 * Handling the Bank Account Number
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBankAccountNumber(value) {
    return {
        type: actionTypes.HANDLE_BANK_ACCOUNT_NUMBER,
        payload: value,
    }
}

/**
 * Handling the bank edit permission if it has any of [true, false]
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBankHasEditPermission(value) {
    return {
        type: actionTypes.HANDLE_BANK_HAS_EDIT_PERMISSION,
        payload: value,
    }
}
