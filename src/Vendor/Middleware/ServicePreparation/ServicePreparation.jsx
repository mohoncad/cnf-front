import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SuspenseLoader from "../../../Components/Common/SuspenseLoader/SuspenseLoader";
import {APP} from "../../../App/AppProvider";
import NetworkFailure from "../../../Screens/Common/NetworkFailure/NetworkFailure";
import BranchCheckpoint from "../BranchCheckpoint/BranchCheckpoint";


class ServicePreparation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ServicesLoaded: false,
            NetworkError: false,
            ReloadServices: true,
        };

        this.NetWorkFailure = APP.SERVICES.NETWORK_FAILURE;
        this.Auth = APP.SERVICES.AUTH;
        this.SessionUser = new APP.SERVICES.SessionUser(this.props);
        this.SystemLicense = new APP.SERVICES.SystemLicense(this.props);
        this.UAP = new APP.SERVICES.UAP(this.props);

        this.AuthCheck = this.AuthCheck.bind(this);
        this.CheckPreparation = this.CheckPreparation.bind(this);
        this.InitializeServices = this.InitializeServices.bind(this);
    }


    NetworkStatusCheck() {
        APP.STORE.subscribe(() => {
            const NetworkStatus = new APP.SERVICES.NETWORK_FAILURE().GetStatus();

            if(NetworkStatus === true) {
                this.setState({NetworkError: true});
            } else {
                this.setState({NetworkError: false});
            }
        });
    }


    AuthCheck() {
        APP.STORE.subscribe(() => {
            if(!APP.STORE.getState().AUTH.Authenticated) {
                this.props.history.replace(APP.ROUTES.PUBLIC.LOGIN);
            }
        });
    }


    CheckPreparation() {
        APP.STORE.subscribe(() => {
            if (this.UAP.IsReady() && this.SessionUser.IsReady() && this.SystemLicense.IsReady()) {
                this.setState({
                    ServicesLoaded: true,
                    ReloadServices: false,
                });
            }
        });
    }


    InitializeServices() {
        this.SessionUser.Initialize();
        this.SystemLicense.Initialize();
        this.UAP.Initialize();

        let auth = new this.Auth(this.props);
        auth.TurnOnGuard();
        this.AuthCheck();

        /**
         * Initialize Network Failure class
         */
        new this.NetWorkFailure().Initialize();
        this.NetworkStatusCheck();
    }

    componentDidMount() {
        this.InitializeServices();
        this.CheckPreparation();
    }

    render() {
        return (
            <React.Fragment>
                {this.state.NetworkError && (
                    <NetworkFailure ReloadServices={this.state.ReloadServices} onReloadServices={this.InitializeServices}/>
                )}

                {!this.state.NetworkError ? this.state.ServicesLoaded ?
                    (
                        <React.Fragment>
                            {/* Middleware registration */}
                            <BranchCheckpoint>
                                {this.props.children}
                            </BranchCheckpoint>
                        </React.Fragment>
                    )
                    : <SuspenseLoader title={"Preparing background services..."}/> : null}
            </React.Fragment>
        );
    }
}

export default withRouter(ServicePreparation);
