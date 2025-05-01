import {
    actionTypes
} from "../../../Actions/Private/TransportBill/TransportBill.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,
    PrintType: '',

    IsSelfProfile: false,
    TransportId: 0,
    BillInfo: {
        Client: null,
        ClientAddress: '',
        BillCode: '',
        BillDate: null,
        DeliveryChallanNo: '',
        DeliveryDate: null,
        TransportChallanNo: '',
        TransportDate: null,
        lc_no: '',
        lc_date: null,
        be_no: '',
        be_date: null,
        holding_no: '',
        holding_date: null,
        job_no: '',
        job_date: null,
        awb_no: '',
        unit_id: null,
        quantity: '',
        description: '',
        transport_type: null,
        vehicle_reg_no: '',
        driver_name: '',
        from: null,
        to: null,
    },
    Particulars: {
        particulars_charges: [],
        totalAmount: 0.00,
        dueAmount: 0.00,
        paidAmount: 0.00,
    },
    MasterFlagEditPermission: false,
    HasEditPermission: false,
    ClientList: [],
    BankList: [],
    DocumentList: [],
    CurrencyList: [],
    TransportTypeList: [],
    UnitList: [],
    ChargeHead: [],
    LocationList: [],
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function TransportBill(state = InitialState, action) {

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

        case actionTypes.HANDLE_TRANSPORT_ID:
            return {
                ...state,
                TransportId: action.payload,
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
        case actionTypes.HANDLE_BILL_DATE:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    BillDate: action.payload
                }
            };
        case actionTypes.HANDLE_DELIVERY_NO:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    DeliveryChallanNo: action.payload
                }
            };
        case actionTypes.HANDLE_DELIVERY_DATE:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    DeliveryDate: action.payload
                }
            };
        case actionTypes.HANDLE_TRANSPORT_NO:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    TransportChallanNo: action.payload
                }
            };
        case actionTypes.HANDLE_TRANSPORT_DATE:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    TransportDate: action.payload
                }
            };
        case actionTypes.HANDLE_LC_NO:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    lc_no: action.payload
                }
            };
        case actionTypes.HANDLE_LC_DATE:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    lc_date: action.payload
                }
            };

        case actionTypes.HANDLE_BE_NO:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    be_no: action.payload
                }
            };
        case actionTypes.HANDLE_BE_DATE:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    be_date: action.payload
                }
            };
        case actionTypes.HANDLE_HOLDING_NO:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    holding_no: action.payload
                }
            };
        case actionTypes.HANDLE_HOLDING_DATE:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    holding_date: action.payload
                }
            };

        case actionTypes.HANDLE_JOB_NO:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    job_no: action.payload
                }
            };
        case actionTypes.HANDLE_JOB_DATE:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    job_date: action.payload
                }
            };
        case actionTypes.HANDLE_AWB_NO:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    awb_no: action.payload
                }
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
        case actionTypes.HANDLE_TRANSPORT_LIST:
            return {
                ...state,
                TransportTypeList: action.payload,
            };
        case actionTypes.HANDLE_LOCATION_LIST:
            return {
                ...state,
                LocationList: action.payload,
            };


        case actionTypes.HANDLE_UNIT_ID:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    unit_id: action.payload
                }
            };
        case actionTypes.HANDLE_QUANTITY:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    quantity: action.payload
                }
            };
        case actionTypes.HANDLE_DESCRIPTION:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    description: action.payload
                }
            };

        case actionTypes.HANDLE_TRANSPORT_TYPE:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    transport_type: action.payload
                }
            };
        case actionTypes.HANDLE_VEHICLE_NO:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    vehicle_reg_no: action.payload
                }
            };
        case actionTypes.HANDLE_DRIVER_NAME:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    driver_name: action.payload
                }
            };
        case actionTypes.HANDLE_FROM:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    from: action.payload
                }
            };
        case actionTypes.HANDLE_TO:
            return {
                ...state,
                BillInfo: {
                    ...state.BillInfo,
                    to: action.payload
                }
            };
            //particulars

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

        case actionTypes.RESET_FORM:
            return InitialState;

        default:
            return state;
    }
}