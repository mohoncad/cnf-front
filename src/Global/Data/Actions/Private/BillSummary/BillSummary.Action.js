import {Store} from "../../../Store";

/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'SUMMARY/FORM/';

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
    HANDLE_PRINT_TYPE: USE('HANDLE_PRINT_TYPE'),
    HANDLE_CODE: USE('HANDLE_CODE'),
    
    DATA_GRID_SHOULD_RELOAD: USE('DATA_GRID_SHOULD_RELOAD'),
    HANDLE_EDIT_PERMISSION: USE('HANDLE_EDIT_PERMISSION'),
    HANDLE_CLIENT_LIST: USE('HANDLE_CLIENT_LIST'),
    HANDLE_PORT_LIST: USE('HANDLE_PORT_LIST'),
    HANDLE_CLIENT: USE('HANDLE_CLIENT'),
    HANDLE_BILL_TYPE: USE('HANDLE_BILL_TYPE'),
    HANDLE_FROM_DATE: USE('HANDLE_FROM_DATE'),
    HANDLE_TO_DATE: USE('HANDLE_TO_DATE'),
    HANDLE_BILL_TYPE_LIST: USE('HANDLE_BILL_TYPE_LIST'),
    
    HANDLE_SUMMARY_CODE: USE('HANDLE_SUMMARY_CODE'),
    HANDLE_SUBJECT: USE('HANDLE_SUBJECT'),
    HANDLE_LIST: USE('HANDLE_LIST'),
    
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
 * Handling the form open status
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleCode(value) {
    return {
        type: actionTypes.HANDLE_CODE,
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
 * Handling the form mode one of [VOUCER, REG_VOUCER, CLIENT BILL, REG CLIENT BILL]
 * @param value {string}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandlePrintType(value) {
    return {
        type: actionTypes.HANDLE_PRINT_TYPE,
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
 * Handling the grid reload notifier, when true the grid is notified to re render
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
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


/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleClientList(value) {
    return {
        type: actionTypes.HANDLE_CLIENT_LIST,
        payload: value
    }
}


/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandlePortList(value) {
    return {
        type: actionTypes.HANDLE_PORT_LIST,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleSupplierList(value) {
    return {
        type: actionTypes.HANDLE_SUPPLIER_LIST,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleDocumentList(value) {
    return {
        type: actionTypes.HANDLE_DOCUMENT_LIST,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleCurrencyList(value) {
    return {
        type: actionTypes.HANDLE_CURRENCY_LIST,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleBillTypeList(value) {
    return {
        type: actionTypes.HANDLE_BILL_TYPE_LIST,
        payload: value
    }
}


/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleClient(value) {
    return {
        type: actionTypes.HANDLE_CLIENT,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleBillType(value) {
    return {
        type: actionTypes.HANDLE_BILL_TYPE,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleFromDate(value) {
    return {
        type: actionTypes.HANDLE_FROM_DATE,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleToDate(value) {
    return {
        type: actionTypes.HANDLE_TO_DATE,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleSummaryCode(value) {
    return {
        type: actionTypes.HANDLE_SUMMARY_CODE,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleSubject(value) {
    return {
        type: actionTypes.HANDLE_SUBJECT,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleList(value) {
    return {
        type: actionTypes.HANDLE_LIST,
        payload: value
    }
}