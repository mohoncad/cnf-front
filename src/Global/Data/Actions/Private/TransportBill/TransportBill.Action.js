import {Store} from "../../../Store";

/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'TRANSPORT/FORM/';

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
    
    DATA_GRID_SHOULD_RELOAD: USE('DATA_GRID_SHOULD_RELOAD'),
    HANDLE_EDIT_PERMISSION: USE('HANDLE_EDIT_PERMISSION'),
    HANDLE_CLIENT_LIST: USE('HANDLE_CLIENT_LIST'),
    HANDLE_CLIENT: USE('HANDLE_CLIENT'),
    HANDLE_CLIENT_ADDRESS: USE('HANDLE_CLIENT_ADDRESS'),
    HANDLE_TRANSPORT_ID: USE('HANDLE_TRANSPORT_ID'),
    HANDLE_BILL_CODE: USE('HANDLE_BILL_CODE'),
    HANDLE_BILL_DATE: USE('HANDLE_BILL_DATE'),
    HANDLE_DELIVERY_NO: USE('HANDLE_DELIVERY_NO'),
    HANDLE_DELIVERY_DATE: USE('HANDLE_DELIVERY_DATE'),
    HANDLE_TRANSPORT_NO: USE('HANDLE_TRANSPORT_NO'),
    HANDLE_TRANSPORT_DATE: USE('HANDLE_TRANSPORT_DATE'),
    HANDLE_LC_NO: USE('HANDLE_LC_NO'),
    HANDLE_LC_DATE: USE('HANDLE_LC_DATE'),
    HANDLE_BE_NO: USE('HANDLE_BE_NO'),
    HANDLE_BE_DATE: USE('HANDLE_BE_DATE'),
    HANDLE_HOLDING_NO: USE('HANDLE_HOLDING_NO'),
    HANDLE_HOLDING_DATE: USE('HANDLE_HOLDING_DATE'),
    HANDLE_JOB_NO: USE('HANDLE_JOB_NO'),
    HANDLE_JOB_DATE: USE('HANDLE_JOB_DATE'),
    HANDLE_AWB_NO: USE('HANDLE_AWB_NO'),
    HANDLE_DESCRIPTION: USE('HANDLE_DESCRIPTION'),
    HANDLE_TRANSPORT_LIST: USE('HANDLE_TRANSPORT_LIST'),
    HANDLE_UNIT_LIST: USE('HANDLE_UNIT_LIST'), 
    HANDLE_TRANSPORT_TYPE: USE('HANDLE_TRANSPORT_TYPE'),
    HANDLE_LOCATION_LIST: USE('HANDLE_LOCATION_LIST'),
    HANDLE_VEHICLE_NO: USE('HANDLE_VEHICLE_NO'),
    HANDLE_DRIVER_NAME: USE('HANDLE_DRIVER_NAME'),
    HANDLE_FROM: USE('HANDLE_FROM'),
    HANDLE_TO: USE('HANDLE_TO'),
    HANDLE_UNIT_ID: USE('HANDLE_UNIT_ID'),
    HANDLE_QUANTITY: USE('HANDLE_QUANTITY'),
    
    // particulars
    HANDLE_CHARGE_HEAD: USE('HANDLE_CHARGE_HEAD'),
    HANDLE_PARTICULAR_INSERT: USE('HANDLE_PARTICULAR_INSERT'),
    HANDLE_PARTICULAR_TOTAL: USE('HANDLE_PARTICULAR_TOTAL'),
    HANDLE_PARTICULAR_PAID: USE('HANDLE_PARTICULAR_PAID'),
    HANDLE_PARTICULAR_DUE: USE('HANDLE_PARTICULAR_DUE'),
    
    //attachment
    HANDLE_ATTACHMENT: USE('HANDLE_ATTACHMENT'),    
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
 * Handling the Client List Data
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleTransportId(value) {
    return {
        type: actionTypes.HANDLE_TRANSPORT_ID,
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
 export function HandleBankList(value) {
    return {
        type: actionTypes.HANDLE_BANK_LIST,
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
 export function HandleClientAddress(value) {
    return {
        type: actionTypes.HANDLE_CLIENT_ADDRESS,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleBillCode(value) {
    return {
        type: actionTypes.HANDLE_BILL_CODE,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleBillDate(value) {
    return {
        type: actionTypes.HANDLE_BILL_DATE,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleDeliverDate(value) {
    return {
        type: actionTypes.HANDLE_DELIVERY_DATE,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleDeliverNo(value) {
    return {
        type: actionTypes.HANDLE_DELIVERY_NO,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleTransportDate(value) {
    return {
        type: actionTypes.HANDLE_TRANSPORT_DATE,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleTransportNo(value) {
    return {
        type: actionTypes.HANDLE_TRANSPORT_NO,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleDescription(value) {
    return {
        type: actionTypes.HANDLE_DESCRIPTION,
        payload: value
    }
}


/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleUnitList(value) {
    return {
        type: actionTypes.HANDLE_UNIT_LIST,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleTransportList(value) {
    return {
        type: actionTypes.HANDLE_TRANSPORT_LIST,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleTransportType(value) {
    return {
        type: actionTypes.HANDLE_TRANSPORT_TYPE,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleLocationList(value) {
    return {
        type: actionTypes.HANDLE_LOCATION_LIST,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleVehicleNo(value) {
    return {
        type: actionTypes.HANDLE_VEHICLE_NO,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleDriverName(value) {
    return {
        type: actionTypes.HANDLE_DRIVER_NAME,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleFrom(value) {
    return {
        type: actionTypes.HANDLE_FROM,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleTo(value) {
    return {
        type: actionTypes.HANDLE_TO,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleLCNo(value) {
    return {
        type: actionTypes.HANDLE_LC_NO,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleLCDate(value) {
    return {
        type: actionTypes.HANDLE_LC_DATE,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleBENo(value) {
    return {
        type: actionTypes.HANDLE_BE_NO,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleBEDate(value) {
    return {
        type: actionTypes.HANDLE_BE_DATE,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleHoldingNo(value) {
    return {
        type: actionTypes.HANDLE_HOLDING_NO,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleHoldingDate(value) {
    return {
        type: actionTypes.HANDLE_HOLDING_DATE,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleJobNo(value) {
    return {
        type: actionTypes.HANDLE_JOB_NO,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleJobDate(value) {
    return {
        type: actionTypes.HANDLE_JOB_DATE,
        payload: value
    }
}


/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleUnit(value) {
    return {
        type: actionTypes.HANDLE_UNIT_ID,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleQuantity(value) {
    return {
        type: actionTypes.HANDLE_QUANTITY,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleAWBNo(value) {
    return {
        type: actionTypes.HANDLE_AWB_NO,
        payload: value
    }
}



/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleChargeHead(value) {
    return {
        type: actionTypes.HANDLE_CHARGE_HEAD,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleParticulars(value) {
    return {
        type: actionTypes.HANDLE_PARTICULAR_INSERT,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleParticularTotalAmount(value) {
    return {
        type: actionTypes.HANDLE_PARTICULAR_TOTAL,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleParticularPaidAmount(value) {
    return {
        type: actionTypes.HANDLE_PARTICULAR_PAID,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleParticularDueAmount(value) {
    return {
        type: actionTypes.HANDLE_PARTICULAR_DUE,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleAttachment(value) {
    return {
        type: actionTypes.HANDLE_ATTACHMENT,
        payload: value
    }
}
