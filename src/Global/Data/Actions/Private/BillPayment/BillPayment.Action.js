import {
  Store
} from "../../../Store";
/**
 * This part is a namespace holder for action types and manage them in a unique action name
 * @type {string}
 */
const NAMESPACE = 'BILLPAYMENT';

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

export const actionTypes = {
  FORM_OPEN: USE('FORM_OPEN'),
  FORM_MODE: USE('FORM_MODE'),
  RESET_FORM: USE('RESET_FORM'),

  DATA_GRID_SHOULD_RELOAD: USE('DATA_GRID_SHOULD_RELOAD'),

  HANDLE_MASTER_FLAG_EDIT_PERMISSION: USE('HANDLE_MASTER_FLAG_EDIT_PERMISSION'),
  HANDLE_HAS_EDIT_PERMISSION: USE('HANDLE_HAS_EDIT_PERMISSION'),

  HANDLE_CLIENT_LIST: USE('HANDLE_CLIENT_LIST'),
  HANDLE_PAYMENT_CODE: USE('HANDLE_PAYMENT_CODE'),
  HANDLE_CLIENT: USE('HANDLE_CLIENT'),
  HANDLE_PAYMENT_DATE: USE('HANDLE_PAYMENT_DATE'),
  HANDLE_PAYMENT_TYPE: USE('HANDLE_PAYMENT_TYPE'),
  HANDLE_CLIENT_WISE_BILL_SUMMARY_LIST: USE('HANDLE_CLIENT_WISE_BILL_SUMMARY_LIST'),
  HANDLE_SUMMARY_BILL_LIST: USE('HANDLE_SUMMARY_BILL_LIST'),
  HANDLE_SUMMARY_BILL: USE('HANDLE_SUMMARY_BILL'),
  HANDLE_BILL: USE('HANDLE_BILL'),
  HANDLE_BILL_SOURCE_LIST: USE('HANDLE_BILL_SOURCE_LIST'),
  HANDLE_TOTAL_AMOUNT: USE('HANDLE_TOTAL_AMOUNT'),
  HANDLE_LESS_AMOUNT: USE('HANDLE_LESS_AMOUNT'),
  HANDLE_PAID_AMOUNT: USE('HANDLE_PAID_AMOUNT'),
  HANDLE_PAYMENT_ID: USE('HANDLE_PAYMENT_ID'),
  HANDLE_BILL_SOURCE: USE('HANDLE_BILL_SOURCE'),
  

};

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
 * Handling the Master Flag Edit Permission Flag
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleMasterFlagEditPermission(value) {
  return {
    type: actionTypes.HANDLE_MASTER_FLAG_EDIT_PERMISSION,
    payload: value
  }
}

/**
 * Handling the Has Edit Permission Flag
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleHasEditPermission(value) {
  return {
    type: actionTypes.HANDLE_HAS_EDIT_PERMISSION,
    payload: value
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
 * Handling the list
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
export function HandlePaymentCode(value) {
  return {
    type: actionTypes.HANDLE_PAYMENT_CODE,
    payload: value
  }
}
/**
 * Handling the id
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandlePaymentId(value) {
  return {
    type: actionTypes.HANDLE_PAYMENT_ID,
    payload: value
  }
}

/**
 * Handling the client
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
 * Handling the pay date
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandlePaymentDate(value) {
  return {
    type: actionTypes.HANDLE_PAYMENT_DATE,
    payload: value
  }
}
/**
 * Handling the pay type
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandlePaymentType(value) {
  return {
    type: actionTypes.HANDLE_PAYMENT_TYPE,
    payload: value
  }
}

/**
 * Handling the client wise bill summary list
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleClientWiseBillSummaryList(value) {
  return {
    type: actionTypes.HANDLE_CLIENT_WISE_BILL_SUMMARY_LIST,
    payload: value
  }
}

/**
 * Handling the summary bill list
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleSummaryBillList(value) {
  return {
    type: actionTypes.HANDLE_SUMMARY_BILL_LIST,
    payload: value
  }
}

/**
 * Handling the summary bill
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleSummaryBill(value) {
  return {
    type: actionTypes.HANDLE_SUMMARY_BILL,
    payload: value
  }
}


/**
 * Handling the bill source list
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleBillSourceList(value) {
  return {
    type: actionTypes.HANDLE_BILL_SOURCE_LIST,
    payload: value
  }
}

/**
 * Handling the bill source
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleBillSource(value) {
  return {
    type: actionTypes.HANDLE_BILL_SOURCE,
    payload: value
  }
}

/**
 * Handling the total amount
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleTotalAmount(value) {
  return {
    type: actionTypes.HANDLE_TOTAL_AMOUNT,
    payload: value
  }
}

/**
 * Handling the less amount
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleLessAmount(value) {
  return {
    type: actionTypes.HANDLE_LESS_AMOUNT,
    payload: value
  }
}

/**
 * Handling the paid amount
 * @param value {Array}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandlePaidAmount(value) {
  return {
    type: actionTypes.HANDLE_PAID_AMOUNT,
    payload: value
  }
}



