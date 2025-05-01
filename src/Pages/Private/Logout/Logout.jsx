import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SuspenseLoader from "../../../Components/Common/SuspenseLoader/SuspenseLoader";
import axios from "axios";
import {APP} from "../../../App/AppProvider";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import Button from "@material-ui/core/Button";
import {ROUTE_PATHS as ROUTES} from "../../../Routes/RoutePaths";

const Auth = APP.SERVICES.AUTH;

class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /**
             * --------------------------------------------------------------------------
             * Core States
             */
            __FaShow: false,
            __FaType: "",
            __FaMessage: "",
            __FaDuration: "",
            __FaVerticalAlign: "",
            __FaHorizontalAlign: "",
            /**
             * Core States End
             * --------------------------------------------------------------------------
             */

            IsProcessing: true,
            ProcessFailed: false,
        };

        /**
         * ---------------------------------------------------------------------------------
         * Core Method Bindings
         */
        this.__SetFA = this.__SetFA.bind(this);
        this.__RemoveFA = this.__RemoveFA.bind(this);
        /**
         * Core Method Binding Ends
         * ---------------------------------------------------------------------------------
         */


        this.TryLogout = this.TryLogout.bind(this);
    }

    /**
     * ---------------------------------------------------------------------------------
     * Core Method Declaration
     */
    __SetFA(type, message, duration, verticalAlign, horizontalAlign) {

        type = typeof type === "undefined" ? "" : type;
        message = typeof message === "undefined" ? "" : message;
        duration = typeof duration === "undefined" ? "" : duration;
        verticalAlign = typeof verticalAlign === "undefined" ? "" : verticalAlign;
        horizontalAlign = typeof horizontalAlign === "undefined" ? "" : horizontalAlign;

        this.setState({
            __FaShow: false,
            __FaType: "",
            __FaMessage: "",
            __FaDuration: "",
            __FaVerticalAlign: "",
            __FaHorizontalAlign: "",
        }, () => {
            this.setState({
                __FaShow: true,
                __FaType: type,
                __FaMessage: message,
                __FaDuration: duration === '' ? 0 : Number(duration),
                __FaVerticalAlign: verticalAlign,
                __FaHorizontalAlign: horizontalAlign,
            });
        });
    }

    __RemoveFA() {
        this.setState({
            __FaShow: false,
            __FaType: "",
            __FaMessage: "",
            __FaDuration: "",
            __FaVerticalAlign: "",
            __FaHorizontalAlign: "",
        });
    }

    /**
     * Core Method Declaration Ends
     * ---------------------------------------------------------------------------------
     */

    TryLogout() {

        this.setState({
            IsProcessing: true,
            ProcessFailed: false,
        });


        axios.post(APP.ENV.URL.API.ROOT + "/logout", {}, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then((response) => {

            if (response.data.success) {

                this.setState({
                    IsProcessing: false,
                    ProcessFailed: false,
                });

                Auth.remove();
                // window.location.reload();
            } else {
                this.__SetFA("error", "Failed to logout!" + response.data.message);

                this.setState({
                    IsProcessing: false,
                    ProcessFailed: true,
                });
            }


        }).catch((error) => {

            if(error.response) {
                if (error.response.status === 401) {
                    Auth.remove();
                    this.props.history.push(ROUTES.PUBLIC.LOGIN);
                }
            } else {
                new APP.SERVICES.NETWORK_FAILURE().SetError();
            }



            this.setState({
                IsProcessing: false,
                ProcessFailed: true,
            });

        });

    };


    componentDidMount() {
        this.TryLogout();
    }


    render() {
        return (
            <React.Fragment>

                {this.state.ProcessFailed && (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "70vh"
                    }}>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={this.TryLogout}>
                            Retry
                        </Button>
                    </div>
                )}

                {this.state.IsProcessing && (
                    <SuspenseLoader
                        title={"Logging out"}
                        height={"70vh"}
                    />
                )}


                {/* Floating Alert */}
                {this.state.__FaShow && (
                    <FloatingAlert
                        show={this.state.__FaShow}
                        type={this.state.__FaType}
                        message={this.state.__FaMessage}
                        duration={this.state.__FaDuration}
                        verticalAlign={this.state.__FaVerticalAlign}
                        horizontalAlign={this.state.__FaHorizontalAlign}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default Logout;