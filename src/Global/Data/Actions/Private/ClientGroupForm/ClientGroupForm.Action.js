/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'CLIENT/FORM/';

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
    RESET_CLIENT_FORM: USE('RESET_CLIENT_FORM'),

    HANDLE_CLIENT_ID: USE('HANDLE_CLIENT_ID'),
    HANDLE_CLIENT_NAME: USE('HANDLE_CLIENT_NAME'),
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
export function ResetClientForm() {
    return {
        type: actionTypes.RESET_CLIENT_FORM,
        payload: null,
    }
}

/**
 * Handling the CLIENT Id
 * @param value {number}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleClientID(value) {
    return {
        type: actionTypes.HANDLE_CLIENT_ID,
        payload: value,
    }
}
/**
 * Handling the CLIENT Name
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleClientName(value) {
    return {
        type: actionTypes.HANDLE_CLIENT_NAME,
        payload: value,
    }
}

/**
 * Handling the CLIENT edit permission if it has any of [true, false]
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleClientHasEditPermission(value) {
    return {
        type: actionTypes.HANDLE_CLIENT_HAS_EDIT_PERMISSION,
        payload: value,
    }
}
