import {
  actionTypes
} from "../../../Actions/Private/BillPayment/BillPayment.Action";

const InitialState = {
  FormOpen: false,
  FormMode: '', //ADD, EDIT, VIEW
  DataGridShouldReload: false,
  PrintType: '',
  ClientList: [],
  ClientWiseBillSummaryList: [],
  SummaryBillList: [],
  BillPayment: {
    id: "",
    Code: "",
    Client: null,
    PayDate: null,
    PaymentType: null,
    SummaryBill: null,
    BillListSource: [],
    TotalAmount: 0.00,
    LessAmount: 0.00,
    PaymentAmount: 0.00,
    ViewClient: "",
    ViewPayment: "",
    BillSource: ""
  },

  MasterFlagEditPermission: false,
  HasEditPermission: false,
};

export function BillPayment(state = InitialState, action) {
  switch (action.type) {
    case actionTypes.FORM_OPEN:
      return {
        ...state,
        FormOpen: action.payload,
      };

    case actionTypes.FORM_MODE:
      return {
        ...state,
        FormMode: action.payload,
      };
    case actionTypes.DATA_GRID_SHOULD_RELOAD:
      return {
        ...state,
        DataGridShouldReload: action.payload,
      };

    case actionTypes.HANDLE_CLIENT_LIST:
      return {
        ...state,
        ClientList: action.payload
      };
    case actionTypes.HANDLE_PAYMENT_ID:
      return {
        ...state,
        BillPayment: {
          ...state.BillPayment,
          id: action.payload
        }
      };
    case actionTypes.HANDLE_PAYMENT_CODE:
      return {
        ...state,
        BillPayment: {
          ...state.BillPayment,
          Code: action.payload
        }
      };
    case actionTypes.HANDLE_CLIENT:
      return {
        ...state,
        BillPayment: {
          ...state.BillPayment,
          Client: action.payload,
          ViewClient: action.payload
        }
      };
    case actionTypes.HANDLE_PAYMENT_DATE:
      return {
        ...state,
        BillPayment: {
          ...state.BillPayment,
          PayDate: action.payload
        }
      };
    case actionTypes.HANDLE_PAYMENT_TYPE:
      return {
        ...state,
        BillPayment: {
          ...state.BillPayment,
          PaymentType: action.payload,
          ViewPayment: action.payload,

        }
      };
    case actionTypes.HANDLE_CLIENT_WISE_BILL_SUMMARY_LIST:
      return {
        ...state,
        ClientWiseBillSummaryList: action.payload
      };
    case actionTypes.HANDLE_SUMMARY_BILL_LIST:
      return {
        ...state,
        SummaryBillList: action.payload
      };
    case actionTypes.HANDLE_SUMMARY_BILL:
      return {
        ...state,
        BillPayment: {
          ...state.BillPayment,
          SummaryBill: action.payload
        }
      };


    case actionTypes.HANDLE_BILL_SOURCE_LIST:
      return {
        ...state,
        BillPayment: {
          ...state.BillPayment,
          BillListSource: action.payload
        }
      };
      case actionTypes.HANDLE_BILL_SOURCE:
        return {
          ...state,
          BillPayment: {
            ...state.BillPayment,
            BillSource: action.payload
          }
        };

    case actionTypes.HANDLE_TOTAL_AMOUNT:
      return {
        ...state,
        BillPayment: {
          ...state.BillPayment,
          TotalAmount: action.payload
        }
      };
    case actionTypes.HANDLE_LESS_AMOUNT:
      return {
        ...state,
        BillPayment: {
          ...state.BillPayment,
          LessAmount: action.payload
        }
      };
    case actionTypes.HANDLE_PAID_AMOUNT:
      return {
        ...state,
        BillPayment: {
          ...state.BillPayment,
          PaymentAmount: action.payload
        }
      };
    case actionTypes.RESET_FORM:
      return InitialState;

    default:
      return state;
  }
}