import React, {Component} from 'react';
import * as RegistrationForm from "../../../Screens/Public/Registration/Screen.RegistrationForm";
import axios from "axios";
import {APP} from "../../../App/AppProvider";
import querystring from "querystring";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import AlertDialog from "../../../Components/Common/AlertDialog/AlertDialog";

class Registration extends Component {
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

            __AlertDialogShow: false,
            __AlertDialogTitle: "",
            __AlertDialogMessage: "",
            /**
             * Core States End
             * --------------------------------------------------------------------------
             */


            FullName: "",
            CompanyName: "",
            CompanySize: "",
            ContactNumber: "",
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
        /**
         * Core Method Binding Ends
         * ---------------------------------------------------------------------------------
         */

        this.handleChangeFullName = this.handleChangeFullName.bind(this);
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeCompanySize = this.handleChangeCompanySize.bind(this);
        this.handleChangeContactNumber = this.handleChangeContactNumber.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.TryRegistration = this.TryRegistration.bind(this);
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

    ValidatePhone(phone) {
        let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(String(phone));
    };



    handleChangeFullName(e) {
        this.setState({
            FullName: e.target.value,
        })
    }

    handleChangeCompanyName(e) {
        this.setState({
            CompanyName: e.target.value,
        })
    }

    handleChangeCompanySize(e) {
        let value = Number(e.target.value.trim());
        this.setState({
            CompanySize: value > 0 ? value : "",
        });
    }

    handleChangeContactNumber(e) {
        this.setState({
            ContactNumber: e.target.value,
        })
    }


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

    TryRegistration(e) {
        e.preventDefault();


        if (this.state.FullName.trim() === "") {
            this.__SetFA("error", "Enter your full name!");
            return false;
        } else if (this.state.CompanyName.trim() === "") {
            this.__SetFA("error", "Enter your company name!");
            return false;
        } else if (this.state.CompanySize < 1) {
            this.__SetFA("error", "Enter your company size!");
            return false;
        } else if (!this.ValidatePhone(this.state.ContactNumber)) {
            this.__SetFA("error", "Enter your contact number!");
            return false;
        } else if (!this.ValidateEmail(this.state.Email)) {
            this.__SetFA("error", "Enter a valid email address!");
            return false;
        } else if (this.state.Password.length < 6) {
            this.__SetFA("error", "Enter a password (Minimum 6 characters)!");
            return false;
        }

        this.__SetFAP("general", "Registering");

        axios({
            method: "post",
            url: APP.ENV.URL.API.ROOT + "/register",
            data: querystring.stringify({
                full_name: this.state.FullName,
                company_name: this.state.CompanyName,
                company_size: this.state.CompanySize,
                contact_number: this.state.ContactNumber,
                email: this.state.Email,
                password: this.state.Password,
            })
        }).then(({data}) => {

            this.__RemoveFAP();

            if (data.success === true) {

                this.__SetFA('success', 'Registration successful! We have sent a verification link to "' + this.state.Email + '"', 6000);


                this.setState({
                    FullName: "",
                    CompanyName: "",
                    CompanySize: "",
                    ContactNumber: "",
                    Email: "",
                    Password: "",
                });


            } else {

                if(data.error_code === 'DUPLICATE') {
                    this.__SetFA('error',  'This email address was registered with an another account/company, please try again with an another email address!', 6000);
                } else {
                    this.__SetFA('error', data.message, 6000);
                }

            }

        }).catch((error) => {

            this.__SetFA('error',  'Something went wrong or network error!', 6000);
            this.__RemoveFAP();

        });
    }

    render() {
        return (
            <React.Fragment>

                <RegistrationForm.Screen
                    FullName={this.state.FullName}
                    CompanyName={this.state.CompanyName}
                    CompanySize={this.state.CompanySize}
                    ContactNumber={this.state.ContactNumber}
                    Email={this.state.Email}
                    Password={this.state.Password}
                    onChangeFullName={this.handleChangeFullName}
                    onChangeCompanyName={this.handleChangeCompanyName}
                    onChangeCompanySize={this.handleChangeCompanySize}
                    onChangeContactNumber={this.handleChangeContactNumber}
                    onChangeEmail={this.handleChangeEmail}
                    onChangePassword={this.handleChangePassword}
                    onSubmitForm={this.TryRegistration}
                />


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
            </React.Fragment>
        );
    }
}


export default Registration;
