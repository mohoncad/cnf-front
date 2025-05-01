import {
  actionTypes
} from "../../../Actions/Private/Company/Company.Action";

const InitialState = {
  CompanyName: "",
  CompanyPhone: "",
  CompanyEmail: "",
  CompanySite: "",
  CompanyAddress: "",
  Logo: "",
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function Company(state = InitialState, action) {
  switch (action.type) {
    case actionTypes.COMPANY_NAME:
      return {
        ...state,
        CompanyName: action.payload,
      };

    case actionTypes.COMPANY_PHONE:
      return {
        ...state,
        CompanyPhone: action.payload,
      };

    case actionTypes.COMPANY_EMAIL:
      return {
        ...state,
        CompanyEmail: action.payload,
      };

    case actionTypes.COMPANY_SITE:
      return {
        ...state,
        CompanySite: action.payload,
      };

    case actionTypes.COMPANY_ADDRESS:
      return {
        ...state,
        CompanyAddress: action.payload,
      };

    case actionTypes.HANDLE_LOGO:
      return {
        ...state,
        Logo: action.payload,
      };

    default:
      return state;
  }
}