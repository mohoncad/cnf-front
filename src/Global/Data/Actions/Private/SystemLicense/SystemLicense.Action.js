/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'SYSTEM/LICENSE/';

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
    HANDLE_LOADING: USE('HANDLE_LOADING'),
    HANDLE_LOADED: USE('HANDLE_LOADED'),
    HANDLE_SYSTEM_LICENSE: USE('HANDLE_SYSTEM_LICENSE'),
};

export function SetSystemLicenseLoading(value) {
    return {
        type: actionTypes.HANDLE_LOADING,
        payload: value,
    }
}

export function SetSystemLicenseLoaded(value) {
    return {
        type: actionTypes.HANDLE_LOADED,
        payload: value,
    }
}

export function SET_SYSTEM_LICENSE(value) {
    return {
        type: actionTypes.HANDLE_SYSTEM_LICENSE,
        payload: value,
    }
}
