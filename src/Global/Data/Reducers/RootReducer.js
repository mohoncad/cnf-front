import {combineReducers} from "redux";
import {NETWORK_ERROR} from "./Private/NetworkError/NetworkError.Reducer";
import {AUTH} from "./Private/Auth/Auth.Reducer";
import {SYSTEM_LICENSE} from "./Private/SystemLicense/SystemLicense.Reducer";
import {UAP_MODULE_LIST} from "./Private/UAP/UAP.Reducer";
import {UserProfileForm} from "./Private/UserProfileForm/UserProfileForm.Reducer";
import {SessionUser, SessionCompany} from "./Private/SessionUser/SessionUser.Reducer";
import {BranchForm} from "./Private/BranchForm/BranchForm.Reducer";
import {BankForm} from "./Private/BankForm/BankForm.Reducer";
import {ClientGroupForm} from "./Private/ClientGroupForm/ClientGroupForm.Reducer";
import {ClientsForm} from "./Private/ClientsForm/ClientsForm.Reducer";
import {SuppliersForm} from "./Private/Suppliers/SuppliersForm.Reducer";
import {CurrencyForm} from "./Private/CurrencyForm/CurrencyForm.Reducer";
import {UnitForm} from "./Private/UnitForm/UnitForm.Reducer";
import {PortForm} from "./Private/PortForm/PortForm.Reducer";
import {ImportBill} from "./Private/ImportBill/ImportBill.Reducer";
import {TransportBill} from "./Private/TransportBill/TransportBill.Reducer";
import {BillSummary} from "./Private/BillSummary/BillSummary.Reducer";
import {Company} from "./Private/Company/Company.Reducer";
import {BillPayment} from "./Private/BillPayment/BillPayment.Reducer";

/**
 * Combined Reducers
 * @type {Reducer<CombinedState<{}>>}
 */
export const RootReducer = combineReducers({
    NETWORK_ERROR,
    AUTH,
    SYSTEM_LICENSE,
    UAP_MODULE_LIST,
    SessionUser,
    SessionCompany,
    UserProfileForm,
    BranchForm,
    BankForm,
    ClientGroupForm,
    CurrencyForm,
    UnitForm,
    PortForm,
    ClientsForm,
    SuppliersForm,
    ImportBill,
    TransportBill,
    BillSummary,
    Company,
    BillPayment
});
