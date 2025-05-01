import React, {Component} from 'react';
import {connect} from 'react-redux';
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
import {APP} from "../../../App/AppProvider";
// import TextField from "@material-ui/core/TextField";
// import AutoCompleteSelect from "../../../Components/Private/AutoCompleteSelect/AutoCompleteSelect";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import PromptDialog from "../../../Components/Common/PromptDialog/PromptDialog";
import {
    HandleHasEditPermission, HandleCode, HandleDataGridShouldReload,
    HandleFormMode,
    HandleFormOpen,
    HandleAddress,
    HandleEmail,
    HandlePhone,
    HandleStatus,
    HandleName,
    HandleSupplierId,
    ResetForm,
} from "../../../Global/Data/Actions/Private/Suppliers/SuppliersForm.Action";
import * as Form from "./Screen.Form";

const Auth = APP.SERVICES.AUTH;


class Screen extends Component {
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
            __FaProgressBarVerticalAlign: "",
            __FaProgressBarHorizontalAlign: "",

            __PromptDialogShow: false,
            __PromptDialogTargetActionName: "",
            __PromptDialogTargetActionID: "",
            __PromptDialogTitle: "",
            __PromptDialogMessage: "",
            /**
             * Core States End
             * --------------------------------------------------------------------------
             */

        };


        /**
         * ---------------------------------------------------------------------------------
         * Core Method Bindings
         */
        this.__SetFA = this.__SetFA.bind(this);
        this.__RemoveFA = this.__RemoveFA.bind(this);
        this.__SetFAP = this.__SetFAP.bind(this);
        this.__RemoveFAP = this.__RemoveFAP.bind(this);
        this.__PD = this.__PD.bind(this);
        this.__PDRunAction = this.__PDRunAction.bind(this);
        /**
         * Core Method Binding Ends
         * ---------------------------------------------------------------------------------
         */

        this.handleUpdateFormMode = this.handleUpdateFormMode.bind(this);

        this.handleCloseDialog = this.handleCloseDialog.bind(this);

        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.GetSupplierDetail = this.GetSupplierDetail.bind(this);

        this.keyDownHandler = this.keyDownHandler.bind(this);
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
        this.setState({
            __FaProgressBarShow: false,
            __FaProgressBarType: "",
            __FaProgressBarMessage: "",
            __FaProgressBarVerticalAlign: "",
            __FaProgressBarHorizontalAlign: "",
        });
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
        if (action_name === "DeleteUser") {
            this.TryUserDelete(action_id);
        }

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


    handleUpdateFormMode(FormMode) {
        this.setState({FormMode});
    }


    /**
     *
     */
    GetSupplierDetail() {
        this.__SetFAP("general", "Loading", "top", "center");

        axios.get(APP.ENV.URL.API.ROOT + '/company/suppliers/detail?id=' + this.props.GlobalData.SuppliersID, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }).then((response) => {

            this.__RemoveFAP();

            if (response.data.success) {

                let $supplier = response.data.supplier;

                this.props.func.HandleSupplierId($supplier.id);
                this.props.func.HandleCode($supplier.Code);
                this.props.func.HandleStatus($supplier.Status === 1 ? true : false);
                this.props.func.HandleName($supplier.Name);
                this.props.func.HandleEmail($supplier.Email);
                this.props.func.HandleAddress($supplier.Address);
                this.props.func.HandlePhone($supplier.Phone);
                this.props.func.HandleHasEditPermission($supplier.HasEditPermission);

                if ($supplier.HasEditPermission === false) {
                    this.props.func.HandleFormMode('VIEW');
                }

            }

        }).catch((error) => {

            this.__RemoveFAP();

            if (error.response) {
                if (error.response.status === 401) {
                    Auth.remove(this.props);
                }

                if (error.response.status === 403) {
                    this.setState({
                        DataUserProfile: {},
                    });
                    this.__SetFA("error", error.response.data.message);
                    new APP.SERVICES.UAP().Initialize();
                }
            } else {
                new APP.SERVICES.NETWORK_FAILURE().SetError();
            }

        });
    }


    /**
     * Add a new User entry Or Update existing user's entry
     * @Mode: [ADD, EDIT]
     */
    handleSubmitForm() {
        const FormMode = this.props.GlobalData.FormMode;
        if (this.props.GlobalData.Name === "") {
            this.__SetFA("error", "Please enter a name");
            return false;
        }


        this.__SetFAP("general", "Loading", "top", "center");
        const payload = {
            id: this.props.GlobalData.SuppliersID,
            Code: this.props.GlobalData.Code,
            Name: this.props.GlobalData.Name,
            Phone: this.props.GlobalData.Phone,
            Email: this.props.GlobalData.Email,
            Address: this.props.GlobalData.Address,
            Status: this.props.GlobalData.Status
        }

        axios.post(APP.ENV.URL.API.ROOT + '/company/suppliers/save', payload, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }).then((response) => {

            this.__RemoveFAP();

            if (response.data.success) {
                this.__SetFA("success", response.data.message);
                this.props.func.HandleDataGridShouldReload(true);

                    if (FormMode === 'ADD') {
                        this.props.func.ClearForm();
                        // this.props.func.HandleFormOpen(true);
                        // this.props.func.HandleFormMode('ADD');
                    } else {
                        this.handleCloseDialog();
                    }


            } else {
                this.__SetFA("error", response.data.message);
            }

        }).catch((error) => {

            this.__RemoveFAP();

            if (error.response) {
                if (error.response.status === 401) {
                    Auth.remove(this.props);
                }

                if (error.response.status === 403) {
                    this.setState({
                        DataUserProfile: {},
                    });
                    this.__SetFA("error", error.response.data.message);
                    new APP.SERVICES.UAP().Initialize();
                }
            } else {
                new APP.SERVICES.NETWORK_FAILURE().SetError();
            }

        });

    }

    handleCloseDialog() {
        this.props.func.ClearForm();
    this.props.func.HandleDataGridShouldReload(true);

    }


    keyDownHandler(e) {
        if (e.keyCode === 83 && e.ctrlKey) {
            e.preventDefault();
            this.handleSubmitForm();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDownHandler);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.GlobalData.FormOpen !== this.props.GlobalData.FormOpen) && this.props.GlobalData.FormOpen === true) {

            if (this.props.GlobalData.FormMode === 'EDIT' || this.props.GlobalData.FormMode === 'VIEW') {
                this.GetSupplierDetail();
            }
        }
    }

    render() {
        return (
            <React.Fragment>

             
                    <FullScreenDialog
                        open={this.props.GlobalData.FormOpen}
                        onClose={this.handleCloseDialog}
                        title={this.props.GlobalData.FormMode === 'ADD' ? 'Add New Supplier' : this.props.GlobalData.FormMode === 'EDIT' ? 'Edit Supplier' : this.props.GlobalData.FormMode === 'VIEW' ? 'Supplier' : ""}
                        hasSubmitButton={(this.props.GlobalData.FormMode === 'ADD' || this.props.GlobalData.FormMode === 'EDIT')}
                        submitButtonTitle={"Save"}
                        submitButtonDisabled={false}
                        onSubmit={this.handleSubmitForm}>

                        <Form.Screen />

                    </FullScreenDialog>

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

const mapStateToProps = state => {
    return {
        GlobalData: state.SuppliersForm,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        func: {
            ClearForm: () => {
                dispatch(ResetForm());
                // dispatch(HandleUserRoleList([]));
                // dispatch(HandleSelectedBranchList([]));
            },

            HandleFormOpen: (payload) => {
                dispatch(HandleFormOpen(payload));
            },

            HandleFormMode: (payload) => {
                dispatch(HandleFormMode(payload));
            },

            HandleDataGridShouldReload: (value) => {
                dispatch(HandleDataGridShouldReload(value));
            },
            HandleHasEditPermission: (value) => {
                dispatch(HandleHasEditPermission(value));
            },
            HandleSupplierId: (payload) => {
                dispatch(HandleSupplierId(payload));
            },
            HandleCode: (payload) => {
                dispatch(HandleCode(payload));
            },
            HandleEmail: (payload) => {
                dispatch(HandleEmail(payload));
            },
            HandleName: (payload) => {
                dispatch(HandleName(payload));
            },
            HandlePhone: (payload) => {
                dispatch(HandlePhone(payload));
            },
            HandleAddress: (payload) => {
                dispatch(HandleAddress(payload));
            },
            HandleStatus: (payload) => {
                dispatch(HandleStatus(payload));
            },
        }
    }
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export {_Screen as Screen};
