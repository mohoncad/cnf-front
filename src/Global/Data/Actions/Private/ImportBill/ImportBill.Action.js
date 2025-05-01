import {Store} from "../../../Store";

/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'IMPORTBILL/FORM/';

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
    HANDLE_SUPPLIER_ID: USE('HANDLE_SUPPLIER_ID'),
    HANDLE_BRANCH_LIST: USE('HANDLE_BRANCH_LIST'),
    HANDLE_CLIENT_LIST: USE('HANDLE_CLIENT_LIST'),
    HANDLE_SUPPLIER_LIST: USE('HANDLE_SUPPLIER_LIST'),
    HANDLE_BANK_LIST: USE('HANDLE_BANK_LIST'),
    HANDLE_CLIENT: USE('HANDLE_CLIENT'),
    HANDLE_CLIENT_ADDRESS: USE('HANDLE_CLIENT_ADDRESS'),
    HANDLE_BILL_CODE: USE('HANDLE_BILL_CODE'),
    HANDLE_DATE: USE('HANDLE_DATE'),
    HANDLE_CLIENT_BANK: USE('HANDLE_CLIENT_BANK'),
    HANDLE_SUPPLIER: USE('HANDLE_SUPPLIER'),
    HANDLE_DESCRIPTION: USE('HANDLE_DESCRIPTION'),
    HANDLE_NOTE: USE('HANDLE_NOTE'),
    HANDLE_BILL_ID: USE('HANDLE_BILL_ID'),
    HANDLE_DOCUMENT_LIST: USE('HANDLE_DOCUMENT_LIST'),
    HANDLE_DOC_INSERT: USE('HANDLE_DOC_INSERT'),

    //for job details
    HANDLE_CURRENCY_LIST: USE('HANDLE_CURRENCY_LIST'),
    HANDLE_PORT_LIST: USE('HANDLE_PORT_LIST'),
    HANDLE_UNIT_LIST: USE('HANDLE_UNIT_LIST'),
    HANDLE_INVOICE_NO: USE('HANDLE_INVOICE_NO'),
    HANDLE_INVOICE_DATE: USE('HANDLE_INVOICE_DATE'),

    HANDLE_LC_NO: USE('HANDLE_LC_NO'),
    HANDLE_LC_DATE: USE('HANDLE_LC_DATE'),
    HANDLE_BE_NO: USE('HANDLE_BE_NO'),
    HANDLE_BE_DATE: USE('HANDLE_BE_DATE'),
    HANDLE_MAWB: USE('HANDLE_MAWB'),
    HANDLE_MAWB_DATE: USE('HANDLE_MAWB_DATE'),
    HANDLE_HAWB: USE('HANDLE_HAWB'),
    HANDLE_HAWB_DATE: USE('HANDLE_HAWB_DATE'),
    HANDLE_CURRENCY_ID: USE('HANDLE_CURRENCY_ID'),
    HANDLE_CURRENCY_RATE: USE('HANDLE_CURRENCY_RATE'),
    HANDLE_INVOICE_VALUE: USE('HANDLE_INVOICE_VALUE'),
    HANDLE_GROSS_WEIGHT: USE('HANDLE_GROSS_WEIGHT'),
    HANDLE_NET_WEIGHT: USE('HANDLE_NET_WEIGHT'),
    HANDLE_UNIT_ID: USE('HANDLE_UNIT_ID'),
    HANDLE_QUANTITY: USE('HANDLE_QUANTITY'),
    HANDLE_CARRIER: USE('HANDLE_CARRIER'),
    HANDLE_PORT: USE('HANDLE_PORT'),
    HANDLE_COMMODITY: USE('HANDLE_COMMODITY'),
    HANDLE_A_VALUE: USE('HANDLE_A_VALUE'),
    HANDLE_IS_PAID: USE('HANDLE_IS_PAID'),
    
    // particulars
    HANDLE_CHARGE_CATEGORY: USE('HANDLE_CHARGE_CATEGORY'),
    HANDLE_CHARGE_HEAD: USE('HANDLE_CHARGE_HEAD'),
    HANDLE_PARTICULAR_INSERT: USE('HANDLE_PARTICULAR_INSERT'),
    HANDLE_PARTICULAR_TOTAL: USE('HANDLE_PARTICULAR_TOTAL'),
    HANDLE_PARTICULAR_PAID: USE('HANDLE_PARTICULAR_PAID'),
    HANDLE_PARTICULAR_DUE: USE('HANDLE_PARTICULAR_DUE'),
    
    //attachment
    HANDLE_ATTACHMENT: USE('HANDLE_ATTACHMENT'),
    HANDLE_FETCH_ATTACHMENT: USE('HANDLE_FETCH_ATTACHMENT'),
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
export function HandleBillId(value) {
    return {
        type: actionTypes.HANDLE_BILL_ID,
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
 export function HandleDate(value) {
    return {
        type: actionTypes.HANDLE_DATE,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleClientBank(value) {
    return {
        type: actionTypes.HANDLE_CLIENT_BANK,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleSupplier(value) {
    return {
        type: actionTypes.HANDLE_SUPPLIER,
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
 export function HandleDocList(value) {
    return {
        type: actionTypes.HANDLE_DOC_INSERT,
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
 export function HandleInvoiceNo(value) {
    return {
        type: actionTypes.HANDLE_INVOICE_NO,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleInvoiceDate(value) {
    return {
        type: actionTypes.HANDLE_INVOICE_DATE,
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
 export function HandleMAWB(value) {
    return {
        type: actionTypes.HANDLE_MAWB,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleMAWBDate(value) {
    return {
        type: actionTypes.HANDLE_MAWB_DATE,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleHAWB(value) {
    return {
        type: actionTypes.HANDLE_HAWB,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleHAWBDate(value) {
    return {
        type: actionTypes.HANDLE_HAWB_DATE,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleCurrency(value) {
    return {
        type: actionTypes.HANDLE_CURRENCY_ID,
        payload: value
    }
}


/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleCurrencyRate(value) {
    return {
        type: actionTypes.HANDLE_CURRENCY_RATE,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleInvoiceValue(value) {
    return {
        type: actionTypes.HANDLE_INVOICE_VALUE,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleGrossWeight(value) {
    return {
        type: actionTypes.HANDLE_GROSS_WEIGHT,
        payload: value
    }
}

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleNetWeight(value) {
    return {
        type: actionTypes.HANDLE_NET_WEIGHT,
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
 export function HandleCarrier(value) {
    return {
        type: actionTypes.HANDLE_CARRIER,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandlePort(value) {
    return {
        type: actionTypes.HANDLE_PORT,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleCommodity(value) {
    return {
        type: actionTypes.HANDLE_COMMODITY,
        payload: value
    }
}
/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleAValue(value) {
    return {
        type: actionTypes.HANDLE_A_VALUE,
        payload: value
    }
}




//particualrs

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleChargeCategory(value) {
    return {
        type: actionTypes.HANDLE_CHARGE_CATEGORY,
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
 export function HandleIsPaid(value) {
   return {
       type: actionTypes.HANDLE_IS_PAID,
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

/**
 * Handling the code
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleFetchAttachment(value) {
    return {
        type: actionTypes.HANDLE_FETCH_ATTACHMENT,
        payload: value
    }
}