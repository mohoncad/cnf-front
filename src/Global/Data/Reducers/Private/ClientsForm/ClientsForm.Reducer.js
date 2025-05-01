import {actionTypes} from "../../../Actions/Private/ClientsForm/ClientsForm.Action";

const InitialState = {
    FormOpen: false,
    FormMode: '', //ADD, EDIT, VIEW
    DataGridShouldReload: false,

    ClientsRoleList: [],
    GroupList: [],
    ClientId: 0,
    Code: '',
    ClientsRoleID: 0,
    ClientGroupID: '',
    Name: '',
    CodePrefix: '',
    MailingAddress: '',
    Fax: '',
    Phone: '',
    Mobile: '',
    Email: '',
    Web: '',
    IRC: '',
    ERC: '',
    BIN: '',
    TIN: '',
    BondLisc: '',
    BOI: '',
    GenBond: '',
    Note: '',
    QuotationDoc: '',
    Registration: '',
    VatDoc: '',
    MasterFlagEditPermission: false,
    HasEditPermission: false,
};

/**
 * Reducer function, to manage the states in the store
 * @param state {Object}
 * @param action {Object}
 * @constructor
 */
export function ClientsForm(state = InitialState, action) {

    switch (action.type) {
        case actionTypes.FORM_OPEN : return {
            ...state,
            FormOpen: action.payload,
        };

        case actionTypes.FORM_MODE : return {
            ...state,
            FormMode: action.payload,
        };


        case actionTypes.DATA_GRID_SHOULD_RELOAD : return {
            ...state,
            DataGridShouldReload: action.payload,
        };

        case actionTypes.HANDLE_GROUP_LIST :
            return {
                ...state,
                GroupList: action.payload
            };
        

            case actionTypes.HANDLE_CLIENT_ID : return {
                ...state,
                ClientId: action.payload,
            };

            
        case actionTypes.HANDLE_CODE :
            return {
                ...state,
                Code: action.payload
            };
        
        case actionTypes.HANDLE_GROUP :
            return {
                ...state,
                ClientGroupID: action.payload
            };

        case actionTypes.HANDLE_NAME :
            return {
                ...state,
                Name: action.payload
            };
        
        case actionTypes.HANDLE_CODE_PREFIX :
            return {
                ...state,
                CodePrefix: action.payload
            };
        case actionTypes.HANDLE_MAIL_ADD :
            return {
                ...state,
                MailingAddress: action.payload
            };
        case actionTypes.HANDLE_MOBILE :
            return {
                ...state,
                Mobile: action.payload
            };
        case actionTypes.HANDLE_FAX :
            return {
                ...state,
                Fax: action.payload
            };
    
        case actionTypes.HANDLE_PHONE :
            return {
                ...state,
                Phone: action.payload
            };
        case actionTypes.HANDLE_EMAIL :
            return {
                ...state,
                Email: action.payload
            };
        case actionTypes.HANDLE_WEB :
            return {
                ...state,
                Web: action.payload
            };
        case actionTypes.HANDLE_IRC :
            return {
                ...state,
                IRC: action.payload
            };    
        case actionTypes.HANDLE_ERC :
            return {
                ...state,
                ERC: action.payload
            };    

        case actionTypes.HANDLE_BIN :
            return {
                ...state,
                BIN: action.payload
            };
        
        case actionTypes.HANDLE_TIN :
            return {
                ...state,
                TIN: action.payload
            };
        
        case actionTypes.HANDLE_BOND_LISC :
            return {
                ...state,
                BondLisc: action.payload
            };
    
        case actionTypes.HANDLE_BOI :
            return {
                ...state,
                BOI: action.payload
            };
            
        case actionTypes.HANDLE_GEN_BOND :
            return {
                ...state,
                GenBond: action.payload
            };
        
        case actionTypes.HANDLE_NOTE :
            return {
                ...state,
                Note: action.payload
            };

        case actionTypes.HANDLE_REGISTRATION :
            return {
                ...state,
                Registration: action.payload
            };
        case actionTypes.HANDLE_VATDOC :
            return {
                ...state,
                VatDoc: action.payload
            };
        
        case actionTypes.HANDLE_QUOTATION :
            return {
                ...state,
                QuotationDoc: action.payload
            };
            case actionTypes.HANDLE_EDIT_PERMISSION :
                return {
                    ...state,
                    HasEditPermission: action.payload
                };
                           
            
        case actionTypes.RESET_FORM :
            return InitialState;

        default :
            return state;
    }
}
