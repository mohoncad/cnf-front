/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'PORT/FORM/';

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
    RESET_PORT_FORM: USE('RESET_PORT_FORM'),

    HANDLE_PORT_ID: USE('HANDLE_PORT_ID'),
    HANDLE_PORT_NAME: USE('HANDLE_PORT_NAME'),
    HANDLE_PORT_CODE: USE('HANDLE_PORT_CODE'),
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
export function ResetPortForm() {
    return {
        type: actionTypes.RESET_PORT_FORM,
        payload: null,
    }
}

/**
 * Handling the Port Id
 * @param value {number}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandlePortID(value) {
    return {
        type: actionTypes.HANDLE_PORT_ID,
        payload: value,
    }
}
/**
 * Handling the Port Name
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandlePortName(value) {
    return {
        type: actionTypes.HANDLE_PORT_NAME,
        payload: value,
    }
}

/**
 * Handling the Port Code
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandlePortCode(value) {
    return {
        type: actionTypes.HANDLE_PORT_CODE,
        payload: value,
    }
}

/**
 * Handling the Port edit permission if it has any of [true, false]
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandlePortHasEditPermission(value) {
    return {
        type: actionTypes.HANDLE_PORT_HAS_EDIT_PERMISSION,
        payload: value,
    }
}
