import React, {Component} from 'react';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import * as LoginForm from "../../../Screens/Public/Login/Screen.LoginForm";
import axios from "axios";
import {APP} from "../../../App/AppProvider";
import querystring from "querystring";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../Components/Common/FloatingProgressbar/FloatingProgressbar";

const Auth = APP.SERVICES.AUTH;

class Login extends Component {
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

    handleChangePassword(e) {
        this.setState({
            Password: e.target.value,
        })
    }

    TryLogin(e) {
        e.preventDefault();

        if (!this.ValidateEmail(this.state.Email)) {
            this.__SetFA("error", "Enter a valid email address!");
            return false;
        } else if (this.state.Password === "") {
            this.__SetFA("error", "Enter your password!");
            return false;
        }

        
        this.__SetFAP("general", "Logging in");
        axios({
            method: "post",
            url: APP.ENV.URL.API.ROOT + "/auth",
            data: querystring.stringify({
                email: this.state.Email,
                password: this.state.Password,                
            })
            
        }).then(({data}) => {
            this.__RemoveFAP();

            if (data.success === true) {
               Auth.set(data.token);

                let ref_ = queryString.parse(this.props.location.search).ref_;
                if(typeof ref_ !== 'undefined' && ref_ !== null && ref_ !== '') {
                    window.location.replace(ref_);
                } else {
                    this.props.history.push(APP.ROUTES.PRIVATE.DASHBOARD);
                }

            } else {
                Auth.remove();
                this.__SetFA('error', data.message, 2000);
            }

        }).catch((error) => {
            console.log(error);
            this.__SetFA('error', 'Something went wrong or network error!', 2000);
            this.__RemoveFAP();
        });
    }

    componentDidMount() {
        document.title = "Login / C&F";
    }

    render() {
        return (
            <React.Fragment>

                <LoginForm.Screen
                    Email={this.state.Email}
                    Password={this.state.Password}
                    onChangeEmail={this.handleChangeEmail}
                    onChangePassword={this.handleChangePassword}
                    onSubmitForm={this.TryLogin}/>


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
            </React.Fragment>
        );
    }
}


export default withRouter(Login);
