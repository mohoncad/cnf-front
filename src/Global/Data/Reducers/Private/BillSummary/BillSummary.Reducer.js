import {
    actionTypes
} from "../../../Actions/Private/BillSummary/BillSummary.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,
    PrintType: '',

    BillId: 0,
    Client: null,
    BillType: '',
    FromDate: null,
    ToDate: null,
    SummaryCode: '',
    Subject: '',
    BillList: [],


    MasterFlagEditPermission: false,
    HasEditPermission: false,
    ClientList: [],
    PortList: [],
    BillTypeList: ['Import', 'Export', 'Transport'],
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function BillSummary(state = InitialState, action) {

    switch (action.type) {
        case actionTypes.FORM_OPEN:
            return {
                ...state,
                FormOpen: action.payload,
            };
        case actionTypes.HANDLE_EDIT_PERMISSION:
            return {
                ...state,
                HasEditPermission: action.payload,
            };
        case actionTypes.HANDLE_PRINT_TYPE:
            return {
                ...state,
                PrintType: action.payload,
            };
        case actionTypes.FORM_MODE:
            return {
                ...state,
                FormMode: action.payload,
            };
        case actionTypes.HANDLE_CODE:
            return {
                ...state,
                BillId: action.payload,
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
            case actionTypes.HANDLE_PORT_LIST:
            return {
                ...state,
                PortList: action.payload
            };
            

        case actionTypes.HANDLE_CLIENT:
            return {
                ...state,
                Client: action.payload
            };
        case actionTypes.HANDLE_BILL_TYPE:
            return {
                ...state,
                BillType: action.payload
            };
        case actionTypes.HANDLE_FROM_DATE:
            return {
                ...state,
                FromDate: action.payload
            };
        case actionTypes.HANDLE_TO_DATE:
            return {
                ...state,
                ToDate: action.payload
            };
        case actionTypes.HANDLE_SUMMARY_CODE:
            return {
                ...state,
                SummaryCode: action.payload
            };
        case actionTypes.HANDLE_SUBJECT:
            return {
                ...state,
                Subject: action.payload
            };
        case actionTypes.HANDLE_LIST:
            return {
                ...state,
                BillList: action.payload
            };

        case actionTypes.HANDLE_BILL_TYPE_LIST:
            return {
                ...state,
                BillTypeList: action.payload
            };


        case actionTypes.RESET_FORM:
            return InitialState;

        default:
            return state;
    }
}