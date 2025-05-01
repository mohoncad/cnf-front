const NAMESPACE = 'COMPANY';

function USE(ACTION) {
  return NAMESPACE + ACTION;
}
//Action types
export const actionTypes = {
  COMPANY_NAME: USE('COMPANY_NAME'),
  COMPANY_PHONE: USE('COMPANY_PHONE'),
  COMPANY_EMAIL: USE('COMPANY_EMAIL'),
  COMPANY_SITE: USE('COMPANY_SITE'),
  COMPANY_ADDRESS: USE('COMPANY_ADDRESS'),
  HANDLE_LOGO: USE('HANDLE_LOGO'),
};


/**
 * Handling the form open status
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleName(value) {
  return {
      type: actionTypes.COMPANY_NAME,
      payload: value,
  }
}
/**
 * Handling the form open status
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandlePhone(value) {
  return {
      type: actionTypes.COMPANY_PHONE,
      payload: value,
  }
}
/**
 * Handling the form open status
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
export function HandleEmail(value) {
  return {
      type: actionTypes.COMPANY_EMAIL,
      payload: value,
  }
}
/**
 * Handling the form open status
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleSite(value) {
  return {
      type: actionTypes.COMPANY_SITE,
      payload: value,
  }
}
/**
 * Handling the form open status
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleAddress(value) {
  return {
      type: actionTypes.COMPANY_ADDRESS,
      payload: value,
  }
}
/**
 * Handling the form open status
 * @param value {boolean}
 * @returns {{payload: *, type: string}}
 * @constructor
 */
 export function HandleLogo(value) {
  return {
      type: actionTypes.HANDLE_LOGO,
      payload: value,
  }
}