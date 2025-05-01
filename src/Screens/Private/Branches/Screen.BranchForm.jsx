import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
import * as BranchForm from "./Screen.Form";
import axios from "axios";
import {APP} from "../../../App/AppProvider";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import PromptDialog from "../../../Components/Common/PromptDialog/PromptDialog";
import {
    HandleBranchAddress,
    HandleBranchCode, HandleBranchContactNumber, HandleBranchEmailAddress, HandleBranchHasEditPermission,
    HandleBranchID,
    HandleBranchName, HandleDataGridShouldReload, HandleFormMode, HandleFormOpen, ResetBranchForm
} from "../../../Global/Data/Actions/Private/BranchForm/BranchForm.Action";

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

        this.GetBranch = this.GetBranch.bind(this);
        this.SaveBranch = this.SaveBranch.bind(this);

        this.handleCloseDialog = this.handleCloseDialog.bind(this);
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
        if (action_name === "DeleteBranch") {
            this.TryBranchDelete(action_id);
        }

        if (action_name === "RestoreBranch") {
            this.TryBranchRestore(action_id);
        }

    }

    /**
     * Core Method Declaration Ends
     * ---------------------------------------------------------------------------------
     */

    handleCloseDialog() {
        this.props.func.HandleFormOpen(false);
        this.props.func.HandleFormMode('');
        this.props.func.ResetFrom();
    }

    /**
     * Get branch details
     */
    GetBranch() {
        this.__SetFAP("general", "Loading", "top", "center");

        axios.get(APP.ENV.URL.API.ROOT + '/company/branches/detail?id=' + this.props.data.BranchID, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }).then((response) => {

            this.__RemoveFAP();

            if (response.data.success) {

                let $branch = response.data.branch;

                this.props.func.HandleId($branch.id);
                this.props.func.HandleCode($branch.Code);
                this.props.func.HandleName($branch.Name);
                this.props.func.HandleAddress($branch.Address);
                this.props.func.HandleEmail($branch.Email);
                this.props.func.HandleContactNumber($branch.ContactNumber);
                this.props.func.HandleHasEditPermission($branch.HasEditPermission);

                if ($branch.HasEditPermission === false) {
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
                    this.__SetFA("error", error.response.data.message);
                    new APP.SERVICES.UAP().Initialize();
                }
            } else {
                new APP.SERVICES.NETWORK_FAILURE().SetError();
            }

        });
    }

    /**
     * Get branch details
     */
    SaveBranch() {

        const FormMode = this.props.data.FormMode;
        const BranchID = this.props.data.BranchID;
        const BranchName = this.props.data.BranchName;
        const BranchAddress = this.props.data.BranchAddress;
        const BranchEmailAddress = this.props.data.BranchEmailAddress;
        const BranchContactNumber = this.props.data.BranchContactNumber;

        if(FormMode === 'EDIT') {
            if(BranchID < 1) {
                this.__SetFA("error", "This is not a valid branch!");
                return false;
            }
        }

        if(BranchName.trim() === '') {
            this.__SetFA("error", "Enter branch name!");
            return false;
        }


        this.__SetFAP("general", "Loading", "top", "center");

        axios.post(APP.ENV.URL.API.ROOT + '/company/branches/save', {
            id: BranchID,
            Name: BranchName,
            Address: BranchAddress,
            Email: BranchEmailAddress,
            ContactNumber: BranchContactNumber,
        }, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }).then((response) => {

            this.__RemoveFAP();
            if (response.data.success) {

                this.__SetFA("success", response.data.message);

                if(FormMode === 'ADD') {
                    this.props.func.ResetFrom();
                    this.props.func.HandleFormOpen(true);
                    this.props.func.HandleFormMode('ADD');
                } else {
                    this.handleCloseDialog();
                }

                this.props.func.HandleDataGridShouldReload(true);

            }

        }).catch((error) => {

            this.__RemoveFAP();

            if (error.response) {
                if (error.response.status === 401) {
                    Auth.remove(this.props);
                }

                if (error.response.status === 403) {
                    this.__SetFA("error", error.response.data.message);
                    new APP.SERVICES.UAP().Initialize();
                }
            } else {
                new APP.SERVICES.NETWORK_FAILURE().SetError();
            }

        });
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.data.FormOpen !== this.props.data.FormOpen) {
            if((this.props.data.FormMode === 'EDIT' ||this.props.data.FormMode === 'VIEW') && this.props.data.FormOpen === true) {
                this.GetBranch();
            }
        }
    }

    render() {


        return (
            <React.Fragment>
                <FullScreenDialog
                    open={this.props.data.FormOpen}
                    title={this.props.data.FormMode === 'ADD' ? "Add Branch" : this.props.data.FormMode === 'EDIT' ? "Edit Branch" : this.props.data.FormMode === 'VIEW' ? "Branch Details" : ""}
                    hasSubmitButton={(this.props.data.FormMode === 'ADD' || this.props.data.FormMode === 'EDIT')}
                    submitButtonTitle={"Save"}
                    onClose={this.handleCloseDialog}
                    onSubmit={this.SaveBranch}
                >

                    <BranchForm.Screen/>

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

Screen.propTypes = {

}


const mapStateToProps = state => {
    return {
        data: state.BranchForm,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        func: {
            HandleFormOpen: (value) => {
                dispatch(HandleFormOpen(value));
            },
            HandleFormMode: (value) => {
                dispatch(HandleFormMode(value));
            },
            HandleDataGridShouldReload: (value) => {
                dispatch(HandleDataGridShouldReload(value));
            },
            ResetFrom: () => {
                dispatch(ResetBranchForm());
            },
            HandleId: (value) => {
                dispatch(HandleBranchID(value));
            },
            HandleCode: (value) => {
                dispatch(HandleBranchCode(value));
            },
            HandleName: (value) => {
                dispatch(HandleBranchName(value));
            },
            HandleAddress: (value) => {
                dispatch(HandleBranchAddress(value));
            },
            HandleEmail: (value) => {
                dispatch(HandleBranchEmailAddress(value));
            },
            HandleContactNumber: (value) => {
                dispatch(HandleBranchContactNumber(value));
            },
            HandleHasEditPermission: (value) => {
                dispatch(HandleBranchHasEditPermission(value));
            },
        }
    }
};

const __Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export {__Screen as Screen};
