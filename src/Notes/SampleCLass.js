import React, {Component} from 'react';
import axios from "axios";
import {APP} from "../App/AppProvider";
import querystring from "querystring";
import {Auth} from "../Vendor/Service/Providers/Auth/Service.Auth";
import FloatingAlert from "../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../Components/Common/FloatingProgressbar/FloatingProgressbar";
import AlertDialog from "../Components/Common/AlertDialog/AlertDialog";
import PromptDialog from "../Components/Common/PromptDialog/PromptDialog";

class SampleCLass extends Component {
    constructor(props, context) {
        super(props, context);

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

            __FaProgressBarShow: false,
            __FaProgressBarType: "",
            __FaProgressBarMessage: "",
            __FaProgressBarVerticalAlign: "",
            __FaProgressBarHorizontalAlign: "",

            __AlertDialogShow: false,
            __AlertDialogTitle: "",
            __AlertDialogMessage: "",

            __PromptDialogShow: false,
            __PromptDialogTargetActionName: "",
            __PromptDialogTargetActionID: "",
            __PromptDialogTitle: "",
            __PromptDialogMessage: "",
            /**
             * Core States End
             * --------------------------------------------------------------------------
             */


            Email: "",
            Password: "",
        };

        /**
         * ---------------------------------------------------------------------------------
         * Core Method Bindings
         */
        this.__SetFA = this.__SetFA.bind(this);
        this.__RemoveFA = this.__RemoveFA.bind(this);
        this.__SetFAP = this.__SetFAP.bind(this);
        this.__RemoveFAP = this.__RemoveFAP.bind(this);
        this.__AD = this.__AD.bind(this);
        this.__PD = this.__PD.bind(this);
        this.__PDRunAction = this.__PDRunAction.bind(this);
        /**
         * Core Method Binding Ends
         * ---------------------------------------------------------------------------------
         */

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.TryLogin = this.TryLogin.bind(this);
    }

    /**
     * ---------------------------------------------------------------------------------
     * Core Method Declaration
     */
    __SetFA(type, message, duration, verticalAlign, horizontalAlign) {
        this.__RemoveFAP();

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

    __SetFAP(type, message, verticalAlign, horizontalAlign) {
        this.__RemoveFA();

        this.setState({
            __FaProgressBarShow: false,
            __FaProgressBarType: "",
            __FaProgressBarMessage: "",
            __FaProgressBarVerticalAlign: "",
            __FaProgressBarHorizontalAlign: "",
        }, () => {
            this.setState({
                __FaProgressBarShow: true,
                __FaProgressBarType: type,
                __FaProgressBarMessage: message,
                __FaProgressBarVerticalAlign: verticalAlign,
                __FaProgressBarHorizontalAlign: horizontalAlign,
            });
        });
    }

    __RemoveFAP() {
        this.setState({__FaProgressBarShow: false, __FaProgressBarType: "", __FaProgressBarMessage: "",  __FaProgressBarVerticalAlign: "", __FaProgressBarHorizontalAlign: "",});
    }

    __AD(title, message) {
        this.setState({
            __AlertDialogShow: false,
            __AlertDialogTitle: "",
            __AlertDialogMessage: "",
        }, () => {
            this.setState({__AlertDialogShow: true, __AlertDialogTitle: title, __AlertDialogMessage: message,});
        })
    }

    __PD(action_name, action_id, title, message) {
        this.setState({
            __PromptDialogShow: false,
            __PromptDialogTitle: "",
            __PromptDialogMessage: "",
            __PromptDialogTargetActionName: "",
            __PromptDialogTargetActionID: "",
        }, () => {
            this.setState({
                __PromptDialogShow: true,
                __PromptDialogTitle: title,
                __PromptDialogMessage: message,
                __PromptDialogTargetActionName: action_name,
                __PromptDialogTargetActionID: action_id,
            });
        })
    }

    __PDRunAction() {

        let action_name = this.state.__PromptDialogTargetActionName;
        let action_id = this.state.__PromptDialogTargetActionID;

        //call your callback confirm functions here
        if(action_name === "Delete") {
            this.Delete(action_id);
        }

        if(action_name === "Convert") {
            this.Convert(action_id);
        }

    }
    /**
     * Core Method Declaration Ends
     * ---------------------------------------------------------------------------------
     */


    Delete(id) {
        alert("Deleting " + id);
    }

    Convert(id) {
        alert("Converting " + id);
    }


    ValidateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    handleChangeEmail(e) {
        this.setState({
            Email: e.target.value.trim(),
        })
    }

    handleChangePassword(e) {
        this.setState({
            Password: e.target.value,
        })
    }

    TryLogin(e) {
        e.preventDefault();


        if (!this.ValidateEmail(this.state.Email)) {
            this.__SetFA(true, "error", "Enter a valid email address!");
            return false;
        } else if (this.state.Password === "") {
            this.__SetFA(true, "error", "Enter your password!");
            return false;
        }

        axios({
            method: "post",
            url: APP.API_ROOT + "/auth",
            data: querystring.stringify({
                email: this.state.Email,
                password: this.state.Password,
            })
        }).then(({data}) => {

            if (data.success === true) {
                Auth.set(data.token);
                this.props.history.push(APP.ROUTES.PRIVATE.DASHBOARD);
            } else {
                Auth.remove();
                alert("Login failed! " + data.message);
            }

        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <React.Fragment>

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


                {/* Floating Progress Bar */}
                {this.state.__FaProgressBarShow && (
                    <FloatingProgressbar
                        show={this.state.__FaProgressBarShow}
                        type={this.state.__FaProgressBarType}
                        {...this.state.__FaProgressBarMessage !== "" ? {message: this.state.__FaProgressBarMessage} : ""}
                        {...this.state.__FaProgressBarVerticalAlign !== "" ? {
                            verticalAlign: this.state.__FaProgressBarVerticalAlign,
                            horizontalAlign: this.state.__FaProgressBarHorizontalAlign
                        } : ""}
                    />
                )}

                {/* Single Alert Dialog */}
                {this.state.__AlertDialogShow && (
                    <AlertDialog
                        open={true}
                        title={this.state.__AlertDialogTitle}
                        message={this.state.__AlertDialogMessage}/>
                )}

                {/* Prompt Dialog */}
                {this.state.__PromptDialogShow && (
                    <PromptDialog
                        title={this.state.__PromptDialogTitle}
                        message={this.state.__PromptDialogMessage}
                        onConfirm={this.__PDRunAction}/>
                )}
            </React.Fragment>
        );
    }
}


export default SampleCLass;