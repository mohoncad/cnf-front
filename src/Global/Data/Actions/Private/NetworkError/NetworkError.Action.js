/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'APP/NETWORK_ERROR/';

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
    HANDLE_SET_NETWORK_ERROR: USE('HANDLE_SET_NETWORK_ERROR'),
};

/**
 * Set the Network error, true||false
 * @param value
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function SET_NETWORK_ERROR(value) {
    return {
        type: actionTypes.HANDLE_SET_NETWORK_ERROR,
        payload: value,
    }
}
