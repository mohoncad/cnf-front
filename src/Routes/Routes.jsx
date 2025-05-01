import React, {Component, Suspense, lazy} from 'react';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {CommonRoute, PublicRoute, PrivateRoute} from "../Vendor/Service/Providers/Route/Service.Route";
import {ROUTE_PATHS as ROUTES} from './RoutePaths';
import FourZeroFour from "../Pages/Common/404/404";
import * as NavigationFrame from "../Screens/Private/NavigationFrame/Screen.NavigationFrame";
import SuspenseLoader from "../Components/Common/SuspenseLoader/SuspenseLoader";
import ServicePreparation from "../Vendor/Middleware/ServicePreparation/ServicePreparation";

/**
 * @Components Lazy loading
 */
//PUBLIC ROUTES
const Login = lazy(() => import(`../Pages/Public/Login/Login`));
const Registration = lazy(() => import(`../Pages/Public/Registration/Registration`));
const RecoverPassword = lazy(() => import(`../Pages/Public/RecoverPassword/RecoverPassword`));
const SupportLogin = lazy(() => import(`../Pages/Public/SupportLogin/SupportLogin`));
//PRIVATE ROUTES
const Dashboard = lazy(() => import(`../Pages/Private/Dashboard/Dashboard`));
const UserRole = lazy(() => import(`../Pages/Private/UAP/UserRole/UserRole`));
const Users = lazy(() => import(`../Pages/Private/Users/Users`));
const MyProfile = lazy(() => import(`../Pages/Private/MyProfile/MyProfile`));
const Branches = lazy(() => import(`../Pages/Private/Branches/Branches`));
const Banks = lazy(() => import(`../Pages/Private/Banks/Banks`));
const ClientGroup = lazy(() => import(`../Pages/Private/ClientGroup/Clients`));
const Currency = lazy(() => import(`../Pages/Private/Currency/Currency`));
const Unit = lazy(() => import(`../Pages/Private/Unit/Unit`));
const Port = lazy(() => import(`../Pages/Private/Port/Port`));
const Clients = lazy(() => import(`../Pages/Private/Clients/Clients`));
const Suppliers = lazy(() => import(`../Pages/Private/Suppliers/Suppliers`));
const ImportBill = lazy(() => import(`../Pages/Private/ImportBill/ImportBill`));
const ExportBill = lazy(() => import(`../Pages/Private/ExportBill/ExportBill`));
const TransportBill = lazy(() => import(`../Pages/Private/TransportBill/TransportBill`));
const BillSummary = lazy(() => import(`../Pages/Private/BillSummary/BillSummary`));
const Company = lazy(() => import(`../Pages/Private/Company/Company`));
const Report = lazy(() => import(`../Pages/Private/Report/Report`));
const TransportReport = lazy(() => import(`../Pages/Private/Report/TransportReport`));
const SummaryReport = lazy(() => import(`../Pages/Private/Report/SummaryReport`));
const BillPayment = lazy(() => import(`../Pages/Private/BillPayment/BillPayment`));

const Logout = lazy(() => import(`../Pages/Private/Logout/Logout`));
const ReactApp = lazy(() => import(`../ReactApp`));


class Routes extends Component {
    constructor(props) {
        super(props);

        this.onUP = this.onUP.bind(this);
    }


    onUP(id) {
        console.log(id);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <PrivateRoute path={ROUTES.PRIVATE.ROOT} component={() => {
                        return (
                        <ServicePreparation>
                           <NavigationFrame.Screen>
                                <Suspense fallback={<SuspenseLoader height={"70vh"}/>}>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.ROOT} component={Dashboard}/>
                                    <PrivateRoute path={ROUTES.PRIVATE.LOGOUT} component={Logout}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.USER_ROLE} component={UserRole}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.USER} component={Users}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.MY_PROFILE} component={MyProfile}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.BRANCH} component={Branches}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.BANK} component={() => (<Banks BypassMode={true} BypassSelectedId={1} onBypassIdSelected={this.onUP} />)}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CLIENT_GROUPS} component={ClientGroup}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.CURRENCY} component={Currency}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.UNIT} component={Unit}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.PORT} component={Port}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.COMPANY} component={Company}/>

                                    <PrivateRoute exact path={ROUTES.PRIVATE.CLIENT} component={Clients}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.SUPPLIER} component={Suppliers}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.IMPORT} component={ImportBill}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.EXPORT} component={ExportBill}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.TRANSPORT} component={TransportBill}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.BILL_SUMMARY} component={BillSummary}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.REPORT} component={Report}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.TRANSPORT_REPORT} component={TransportReport}/>
                                    <PrivateRoute exact path={ROUTES.PRIVATE.SUMMARY_REPORT} component={SummaryReport}/> 

                                    <PrivateRoute exact path={ROUTES.PRIVATE.BILL_PAYMENT} component={BillPayment}/>

                                </Suspense>
                            </NavigationFrame.Screen>
                        </ServicePreparation>
                    )}}/>


                    <Suspense fallback={<SuspenseLoader/>}>
                        <PublicRoute exact path={ROUTES.ROOT} component={Login}/>
                        <CommonRoute exact path={ROUTES.COMMON.REACT} component={ReactApp}/>

                        <PublicRoute exact path={ROUTES.PUBLIC.LOGIN} component={Login}/>
                        <PublicRoute exact path={ROUTES.PUBLIC.REGISTER} component={Registration}/>
                        <PublicRoute exact path={ROUTES.PUBLIC.RECOVER_PASSWORD} component={RecoverPassword}/>
                        <PublicRoute exact path={ROUTES.PUBLIC.SUPPORT_LOGIN + "/:cid"} component={SupportLogin}/>
                    </Suspense>

                    <CommonRoute exact path={"*"} component={FourZeroFour}/>
                </Switch>
            </Router>
        );
    }
}

export default Routes;
