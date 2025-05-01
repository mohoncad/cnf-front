/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'UNIT/FORM/';

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
    RESET_UNIT_FORM: USE('RESET_UNIT_FORM'),

    HANDLE_UNIT_ID: USE('HANDLE_UNIT_ID'),
    HANDLE_UNIT_NAME: USE('HANDLE_UNIT_NAME'),
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
export function ResetUnitForm() {
    return {
        type: actionTypes.RESET_UNIT_FORM,
        payload: null,
    }
}

/**
 * Handling the Unit Id
 * @param value {number}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleUnitID(value) {
    return {
        type: actionTypes.HANDLE_UNIT_ID,
        payload: value,
    }
}
/**
 * Handling the Unit Name
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleUnitName(value) {
    return {
        type: actionTypes.HANDLE_UNIT_NAME,
        payload: value,
    }
}

/**
 * Handling the Unit edit permission if it has any of [true, false]
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleUnitHasEditPermission(value) {
    return {
        type: actionTypes.HANDLE_UNIT_HAS_EDIT_PERMISSION,
        payload: value,
    }
}
