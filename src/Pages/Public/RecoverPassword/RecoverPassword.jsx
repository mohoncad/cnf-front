import React, {Component} from 'react';
import * as RecoverPasswordForm from "../../../Screens/Public/RecoverPassword/Screen.RecoverPasswordForm";
import axios from "axios";
import {APP} from "../../../App/AppProvider";
import querystring from "querystring";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import AlertDialog from "../../../Components/Common/AlertDialog/AlertDialog";

class RecoverPassword extends Component {
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

            __FaProgressBarShow: false,
            __FaProgressBarType: "",
            __FaProgressBarMessage: "",

            __AlertDialogShow: false,
            __AlertDialogTitle: "",
            __AlertDialogMessage: "",
            /**
             * Core States End
             * --------------------------------------------------------------------------
             */


            Email: "admin@gmail.com",
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
        /**
         * Core Method Binding Ends
         * ---------------------------------------------------------------------------------
         */

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.TryRecoverPassword = this.TryRecoverPassword.bind(this);
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

    __SetFAP(type, message) {
        this.__RemoveFA();

        this.setState({
            __FaProgressBarShow: false,
            __FaProgressBarType: "",
            __FaProgressBarMessage: "",
        }, () => {
            this.setState({__FaProgressBarShow: true, __FaProgressBarType: type, __FaProgressBarMessage: message,});
        });
    }

    __RemoveFAP() {
        this.setState({__FaProgressBarShow: false, __FaProgressBarType: "", __FaProgressBarMessage: "",});
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
    /**
     * Core Method Declaration Ends
     * ---------------------------------------------------------------------------------
     */


    ValidateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    handleChangeEmail(e) {
        this.setState({
            Email: e.target.value.trim(),
        })
    }

    TryRecoverPassword(e) {
        e.preventDefault();


        if (!this.ValidateEmail(this.state.Email)) {
            this.__SetFA("error", "Enter a valid email address!");
            return false;
        } else if (this.state.Password === "") {
            this.__SetFA("error", "Enter your password!");
            return false;
        }

        axios({
            method: "post",
            url: APP.ENV.URL.API.ROOT + "/recover/password",
            data: querystring.stringify({
                email: this.state.Email,
            })
        }).then(({data}) => {

            if (data.success === true) {

                this.__SetFA("success", "We have sent a verification link to your email address!", 6000);

            } else {

                this.__SetFA("error", data.message);

            }

        }).catch((error) => {
            if(error.response) {
                this.__SetFA("error", "Failed! " + error.response.status);
            } else {
                this.__SetFA("error", "Network connection failed!");
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <RecoverPasswordForm.Screen
                    Email={this.state.Email}
                    onChangeEmail={this.handleChangeEmail}
                    onSubmitForm={this.TryRecoverPassword}/>

                {/* Floating Progress Bar */}
                {this.state.__FaProgressBarShow && (
                    <FloatingProgressbar
                        show={this.state.__FaProgressBarShow}
                        type={this.state.__FaProgressBarType}
                        {...this.state.__FaProgressBarMessage !== "" ? {message: this.state.__FaProgressBarMessage} : ""}
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

                {/* Single Alert Dialog */}
                {this.state.__AlertDialogShow && (
                    <AlertDialog
                        open={true}
                        title={this.state.__AlertDialogTitle}
                        message={this.state.__AlertDialogMessage}/>
                )}

                {/* Prompt Dialog */}
            </React.Fragment>
        );
    }
}

export default RecoverPassword;