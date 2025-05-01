/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'CURRENCY/FORM/';

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
    RESET_CURRENCY_FORM: USE('RESET_CURRENCY_FORM'),

    HANDLE_CURRENCY_ID: USE('HANDLE_CURRENCY_ID'),
    HANDLE_CURRENCY_NAME: USE('HANDLE_CURRENCY_NAME'),
    HANDLE_CURRENCY_RATE: USE('HANDLE_CURRENCY_RATE'),
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
export function ResetCurrencyForm() {
    return {
        type: actionTypes.RESET_CURRENCY_FORM,
        payload: null,
    }
}

/**
 * Handling the Currency Id
 * @param value {number}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleCurrencyID(value) {
    return {
        type: actionTypes.HANDLE_CURRENCY_ID,
        payload: value,
    }
}
/**
 * Handling the Currency Name
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleCurrencyName(value) {
    return {
        type: actionTypes.HANDLE_CURRENCY_NAME,
        payload: value,
    }
}

/**
 * Handling the Currency Rate
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleCurrencyRate(value) {
    return {
        type: actionTypes.HANDLE_CURRENCY_RATE,
        payload: value,
    }
}


/**
 * Handling the Currency edit permission if it has any of [true, false]
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleCurrencyHasEditPermission(value) {
    return {
        type: actionTypes.HANDLE_CURRENCY_HAS_EDIT_PERMISSION,
        payload: value,
    }
}
