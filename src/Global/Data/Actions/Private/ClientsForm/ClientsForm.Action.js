import {Store} from "../../../Store";

/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'CLIENTS/FORM/';

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
    HANDLE_CLIENT_ID: USE('HANDLE_CLIENT_ID'),
    HANDLE_BRANCH_LIST: USE('HANDLE_BRANCH_LIST'),
    HANDLE_CODE: USE('HANDLE_CODE'),
    HANDLE_GROUP: USE('HANDLE_GROUP'),
    HANDLE_NAME: USE('HANDLE_NAME'),
    HANDLE_CODE_PREFIX: USE('HANDLE_CODE_PREFIX'),
    HANDLE_MAIL_ADD: USE('HANDLE_MAIL_ADD'),
    HANDLE_PHONE: USE('HANDLE_PHONE'),
    HANDLE_EMAIL: USE('HANDLE_EMAIL'),
    HANDLE_FAX: USE('HANDLE_FAX'),
    HANDLE_WEB: USE('HANDLE_WEB'),
    HANDLE_IRC: USE('HANDLE_IRC'),
    HANDLE_ERC: USE('HANDLE_ERC'),
    HANDLE_BIN: USE('HANDLE_BIN'),
    HANDLE_TIN: USE('HANDLE_TIN'),
    HANDLE_BOND_LISC: USE('HANDLE_BOND_LISC'),
    HANDLE_BOI: USE('HANDLE_BOI'),
    HANDLE_GEN_BOND: USE('HANDLE_GEN_BONDs'),
    HANDLE_NOTE: USE('HANDLE_NOTE'),
    HANDLE_MOBILE: USE('HANDLE_MOBILE'),
    HANDLE_REGISTRATION: USE('HANDLE_REGISTRATION'),
    HANDLE_VATDOC: USE('HANDLE_VATDOC'),
    HANDLE_QUOTATION: USE('HANDLE_QUOTATION'),
    HANDLE_EDIT_PERMISSION: USE('HANDLE_EDIT_PERMISSION'),
    HANDLE_GROUP_LIST: USE('HANDLE_GROUP_LIST'), 
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

export function HandleClientId(value) {
    return {
        type: actionTypes.HANDLE_CLIENT_ID,
        payload: value,
    }
}

export function HandleGroupList(value) {
    return {
        type: actionTypes.HANDLE_GROUP_LIST,
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
export function HandleGroup(value) {
    return {
        type: actionTypes.HANDLE_GROUP,
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
export function HandleCodePrefix(value) {
    return {
        type: actionTypes.HANDLE_CODE_PREFIX,
        payload: value
    }
}
/**
 * Handling the Mail Address
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleMailAdd(value) {
    return {
        type: actionTypes.HANDLE_MAIL_ADD,
        payload: value
    }
}

/**
 * Handling the Phone
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
 * Handling the Phone
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
 * Handling the Phone
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleFax(value) {
    return {
        type: actionTypes.HANDLE_FAX,
        payload: value
    }
}

/**
 * Handling the Phone
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleWeb(value) {
    return {
        type: actionTypes.HANDLE_WEB,
        payload: value
    }
}

/**
 * Handling the Phone
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleIrc(value) {
    return {
        type: actionTypes.HANDLE_IRC,
        payload: value
    }
}


/**
 * Handling the Phone
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleErc(value) {
    return {
        type: actionTypes.HANDLE_ERC,
        payload: value
    }
}


/**
 * Handling the Phone
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBin(value) {
    return {
        type: actionTypes.HANDLE_BIN,
        payload: value
    }
}

/**
 * Handling the Phone
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleTin(value) {
    return {
        type: actionTypes.HANDLE_TIN,
        payload: value
    }
}

/**
 * Handling the Phone
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBond(value) {
    return {
        type: actionTypes.HANDLE_BOND_LISC,
        payload: value
    }
}

/**
 * Handling the Phone
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleBoi(value) {
    return {
        type: actionTypes.HANDLE_BOI,
        payload: value
    }
}

/**
 * Handling the Phone
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleGen(value) {
    return {
        type: actionTypes.HANDLE_GEN_BOND,
        payload: value
    }
}

/**
 * Handling the Phone
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleNote(value) {
    return {
        type: actionTypes.HANDLE_NOTE,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleMobile(value) {
    return {
        type: actionTypes.HANDLE_MOBILE,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleRegistration(value) {
    return {
        type: actionTypes.HANDLE_REGISTRATION,
        payload: value
    }
}



/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleVatDoc(value) {
    return {
        type: actionTypes.HANDLE_VATDOC,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleQuotationDoc(value) {
    return {
        type: actionTypes.HANDLE_QUOTATION,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleEditPermission(value) {
    return {
        type: actionTypes.HANDLE_EDIT_PERMISSION,
        payload: value
    }
}
