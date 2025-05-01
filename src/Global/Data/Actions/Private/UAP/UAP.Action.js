/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'UAP/MODULES/';

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
    HANDLE_UAP_MODULES: USE('HANDLE_UAP_MODULES'),
};

export function SetUAPModulesLoading(value) {
    return {
        type: actionTypes.HANDLE_LOADING,
        payload: value,
    }
}

export function SetUAPModulesLoaded(value) {
    return {
        type: actionTypes.HANDLE_LOADED,
        payload: value,
    }
}

export function SET_UAP_MODULES(value) {
    return {
        type: actionTypes.HANDLE_UAP_MODULES,
        payload: value,
    }
}
