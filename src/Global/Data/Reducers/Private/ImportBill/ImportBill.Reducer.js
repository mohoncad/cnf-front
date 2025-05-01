import {
    actionTypes
} from "../../../Actions/Private/ImportBill/ImportBill.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,
    PrintType: '',
    SuppliersRoleList: [],
    BranchList: [],

    IsSelfProfile: false,
    BillID: 0,
    IsPai: false,
    BillInfo: {
        Client: null,
        ClientAddress: '',
        BillCode: '',
        Date: null,
        ClientBank: null,
        Supplier: null,
        Description: '',
        Note: '',
        DocList: [],
    },
    JobDetails: {
        invoice_no: '',
        invoice_date: null,
        lc_no: '',
        lc_date: null,
        be_no: '',
        be_date: null,
        mawb_no: '',
        mawb_date: null,
        hawb_no: '',
        hawb_date: null,
        currency_id: null,
        currency_rate: "",
        invoice_value: "",
        gross_weight: "",
        net_weight: "",
        unit_id: null,
        quantity: "",
        carrier: "",
        port_id: null,
        commodity: "",
        a_value: "",
    },
    Particulars: {
        particulars_charges: [],
        totalAmount: 0.00,
        dueAmount: 0.00,
        paidAmount: 0.00,
    },
    Attachment: [],
    FetchAttachment: [],
    Code: '',
    Name: '',
    Phone: '',
    Email: '',
    Address: '',
    Status: '',
    MasterFlagEditPermission: false,
    HasEditPermission: false,
    ClientList: [],
    SupplierList: [],
    BankList: [],
    DocumentList: [],
    CurrencyList: [],
    PortList: [],
    UnitList: [],
    ChargeCategory: [],
    ChargeHead: [],
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function ImportBill(state = InitialState, action) {

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

        case actionTypes.HANDLE_BILL_ID:
            return {
                ...state,
                BillID: action.payload,
            };
        case actionTypes.HANDLE_DOCUMENT_LIST:
            return {
                ...state,
                DocumentList: action.payload,
            };
        case actionTypes.DATA_GRID_SHOULD_RELOAD:
            return {
                ...state,
                DataGridShouldReload: action.payload,
            };

        case actionTypes.HANDLE_BRANCH_LIST:
            return {
                ...state,
                BranchList: action.payload
            };
        case actionTypes.HANDLE_CLIENT_LIST:
            return {
                ...state,
                ClientList: action.payload
            };

        case actionTypes.HANDLE_SUPPLIER_LIST:
            return {
                ...state,
                SupplierList: action.payload
            };
        case actionTypes.HANDLE_BANK_LIST:
            return {
                ...state,
                BankList: action.payload
            };
        case actionTypes.HANDLE_CLIENT:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    Client: action.payload
                }
            };
        case actionTypes.HANDLE_CLIENT_ADDRESS:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    ClientAddress: action.payload
                }
            };
        case actionTypes.HANDLE_BILL_CODE:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    BillCode: action.payload
                }
            };
        case actionTypes.HANDLE_DATE:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    Date: action.payload
                }
            };
        case actionTypes.HANDLE_CLIENT_BANK:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    ClientBank: action.payload
                }
            };
        case actionTypes.HANDLE_SUPPLIER:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    Supplier: action.payload
                }
            };
        case actionTypes.HANDLE_DESCRIPTION:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    Description: action.payload
                }
            };
        case actionTypes.HANDLE_DOC_INSERT:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    DocList: action.payload
                }
            };
        case actionTypes.HANDLE_NOTE:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    Note: action.payload
                }
            };
        case actionTypes.HANDLE_IS_PAID:
            return {
                ...state,
                IsPaid: action.payload
            };
            //JOB DETAILS
        case actionTypes.HANDLE_CURRENCY_LIST:
            return {
                ...state,
                CurrencyList: action.payload,
            };
        case actionTypes.HANDLE_PORT_LIST:
            return {
                ...state,
                PortList: action.payload,
            };
        case actionTypes.HANDLE_UNIT_LIST:
            return {
                ...state,
                UnitList: action.payload,
            };

        case actionTypes.HANDLE_INVOICE_NO:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    invoice_no: action.payload
                }
            };
        case actionTypes.HANDLE_INVOICE_DATE:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    invoice_date: action.payload
                }
            };
        case actionTypes.HANDLE_LC_NO:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    lc_no: action.payload
                }
            };
        case actionTypes.HANDLE_LC_DATE:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    lc_date: action.payload
                }
            };

        case actionTypes.HANDLE_BE_NO:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    be_no: action.payload
                }
            };
        case actionTypes.HANDLE_BE_DATE:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    be_date: action.payload
                }
            };

        case actionTypes.HANDLE_MAWB:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    mawb_no: action.payload
                }
            };
        case actionTypes.HANDLE_MAWB_DATE:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    mawb_date: action.payload
                }
            };
        case actionTypes.HANDLE_HAWB:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    hawb_no: action.payload
                }
            };
        case actionTypes.HANDLE_HAWB_DATE:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    hawb_date: action.payload
                }
            };
        case actionTypes.HANDLE_CURRENCY_ID:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    currency_id: action.payload
                }
            };
        case actionTypes.HANDLE_CURRENCY_RATE:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    currency_rate: action.payload
                }
            };
        case actionTypes.HANDLE_INVOICE_VALUE:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    invoice_value: action.payload
                }
            };
        case actionTypes.HANDLE_GROSS_WEIGHT:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    gross_weight: action.payload
                }
            };
        case actionTypes.HANDLE_NET_WEIGHT:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    net_weight: action.payload
                }
            };
        case actionTypes.HANDLE_UNIT_ID:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    unit_id: action.payload
                }
            };
        case actionTypes.HANDLE_QUANTITY:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    quantity: action.payload
                }
            };
        case actionTypes.HANDLE_CARRIER:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    carrier: action.payload
                }
            };
        case actionTypes.HANDLE_PORT:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    port_id: action.payload
                }
            };
        case actionTypes.HANDLE_COMMODITY:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    commodity: action.payload
                }
            };
        case actionTypes.HANDLE_A_VALUE:
            return {
                ...state,
                JobDetails: {
                    ...state.JobDetails,
                    a_value: action.payload
                }
            };

            //particulars

        case actionTypes.HANDLE_CHARGE_CATEGORY:
            return {
                ...state,
                ChargeCategory: action.payload,
            };
        case actionTypes.HANDLE_CHARGE_HEAD:
            return {
                ...state,
                ChargeHead: action.payload,
            };
        case actionTypes.HANDLE_PARTICULAR_INSERT:
            return {
                ...state,
                Particulars: {
                    particulars_charges: action.payload,
                }
            };
        case actionTypes.HANDLE_PARTICULAR_TOTAL:
            return {
                ...state,
                Particulars: {
                    ...state.Particulars,
                    totalAmount: action.payload,
                }
            };
        case actionTypes.HANDLE_PARTICULAR_PAID:
            return {
                ...state,
                Particulars: {
                    ...state.Particulars,
                    paidAmount: action.payload,
                }
            };
        case actionTypes.HANDLE_PARTICULAR_DUE:
            return {
                ...state,
                Particulars: {
                    ...state.Particulars,
                    dueAmount: action.payload,
                }
            };
        case actionTypes.HANDLE_ATTACHMENT:
            return {
                ...state,
                Attachment: action.payload,
            };
        case actionTypes.HANDLE_FETCH_ATTACHMENT:
            return {
                ...state,
                FetchAttachment: action.payload,
            };

        case actionTypes.RESET_FORM:
            return InitialState;

        default:
            return state;
    }
}