import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FullScreenDialog from "../../../../Components/Private/FullScreenDialog/FullScreenDialog";
import Button from "@material-ui/core/Button";
import {APP} from "../../../../App/AppProvider";
import axios from "axios";
import FloatingAlert from "../../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import PromptDialog from "../../../../Components/Common/PromptDialog/PromptDialog";
import {
    HandleAddress,
    HandleSelectedBranchList,
    HandleBranchList,
    HandleContactNumber,
    HandleEmail, HandleFormMode, HandleFormOpen, HandleDataGridShouldReload,
    HandleFullName, HandleHasEditPermission,
    HandleIsActive,
    HandleIsMasterUser,
    HandleIsSupportUser,
    HandleMasterFlagEditPermission,
    HandlePassword,
    HandleProfilePhotoFile,
    HandleProfilePhotoUrl, HandleUserCode,
    HandleUserID,
    HandleUserRoleID,
    HandleUserRoleList,
    ResetForm, HandleIsSelfProfile
} from "../../../../Global/Data/Actions/Private/UserProfileForm/UserProfileForm.Action";
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

        this.GetFreeUserRoles = this.GetFreeUserRoles.bind(this);
        this.GetFreeBranches = this.GetFreeBranches.bind(this);
        this.GetUserProfile = this.GetUserProfile.bind(this);

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
     * Get the user roles freely
     */
    GetFreeUserRoles() {
        this.__SetFAP("general", "Loading", "top", "center");

        axios.get(APP.ENV.URL.API.ROOT + '/free_user_role_list', {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }).then((response) => {

            this.__RemoveFAP();

            if (response.data.success) {

                this.props.func.StoreUserRoleList(response.data.user_role_list);

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
     * Get the branches freely
     */
    GetFreeBranches() {
        this.__SetFAP("general", "Loading", "top", "center");

        axios.get(APP.ENV.URL.API.ROOT + '/company/branches/free_list', {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }).then((response) => {

            this.__RemoveFAP();

            if (response.data.success) {

                this.props.func.StoreBranchList(response.data.branch_list);

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
     *
     */
    GetUserProfile() {
        this.__SetFAP("general", "Loading", "top", "center");

        axios.get(APP.ENV.URL.API.ROOT + '/users/profile?id=' + this.props.GlobalData.UserID, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }).then((response) => {

            this.__RemoveFAP();

            if (response.data.success) {

                let $user = response.data.user;

                this.props.func.HandleIsSelfProfile($user.IsSelfProfile);
                this.props.func.HandleUserID($user.id);
                this.props.func.HandleUserCode($user.Code);
                this.props.func.HandleSelectedBranchList($user.BranchList);
                this.props.func.HandleUserRoleID($user.UserRoleID);
                this.props.func.HandleIsActive($user.IsActive);
                this.props.func.HandleIsMasterUser($user.IsMasterUser);
                this.props.func.HandleIsSupportUser($user.IsSupportUser);
                this.props.func.HandleFullName($user.FullName);
                this.props.func.HandleEmail($user.email);
                this.props.func.HandleContactNumber($user.ContactNumber);
                this.props.func.HandleAddress($user.Address);
                this.props.func.HandleProfilePhotoUrl($user.ProfilePhoto);
                this.props.func.HandleMasterFlagEditPermission($user.MasterFlagEditPermission);
                this.props.func.HandleHasEditPermission($user.HasEditPermission);

                if ($user.HasEditPermission === false) {
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
        const IsSelfProfile = this.props.GlobalData.IsSelfProfile;
        const UserID = this.props.GlobalData.UserID;
        const UserRoleID = this.props.GlobalData.UserRoleID;
        const BranchList = this.props.GlobalData.SelectedBranchList;
        const IsActive = this.props.GlobalData.IsActive;
        const IsMasterUser = this.props.GlobalData.IsMasterUser;
        const IsSupportUser = this.props.GlobalData.IsSupportUser;
        const FullName = this.props.GlobalData.FullName;
        const Email = this.props.GlobalData.Email;
        const Password = this.props.GlobalData.Password;
        const ContactNumber = this.props.GlobalData.ContactNumber;
        const Address = this.props.GlobalData.Address;
        const ProfilePhotoFile = this.props.GlobalData.ProfilePhotoFile;

        if (FormMode === 'EDIT') {
            if (UserID < 1) {
                this.__SetFA("error", "This is not a valid user!");
                return false;
            }
        }

        if (UserRoleID === 0 && IsMasterUser === false && !IsSupportUser) {
            this.__SetFA("error", "Please select a user role!");
            return false;
        }
        if (BranchList.length < 1) {
            this.__SetFA("error", "Please select atleast one branch!");
            return false;
        }

        if (FullName.trim() === '') {
            this.__SetFA("error", "Please enter the full name of the user!");
            return false;
        }

        if (!this.ValidateEmail(Email)) {
            this.__SetFA("error", "Please enter a valid email address!");
            return false;
        }


        if (FormMode === 'ADD') {
            if (Password === '') {
                this.__SetFA("error", "Please enter a password for this user!");
                return false;
            }
        }

        this.__SetFAP("general", "Loading", "top", "center");

        const __formData = new FormData();
        __formData.append('id', UserID);
        __formData.append('UserRoleID', UserRoleID);
        __formData.append('BranchList', JSON.stringify(BranchList));
        __formData.append('IsActive', IsActive);
        __formData.append('IsMasterUser', IsMasterUser);
        __formData.append('FullName', FullName);
        __formData.append('Email', Email);
        __formData.append('Password', Password);
        __formData.append('ContactNumber', ContactNumber);
        __formData.append('Address', Address);
        __formData.append('ProfilePhoto', ProfilePhotoFile);

        axios.post(APP.ENV.URL.API.ROOT + '/users/profile/save', __formData, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }).then((response) => {

            this.__RemoveFAP();

            if (response.data.success) {
                this.__SetFA("success", response.data.message);

                if (IsSelfProfile) {
                    new APP.SERVICES.SessionUser().Initialize();
                }

                this.props.func.HandleDataGridShouldReload(true);

                if(!IsSelfProfile) {
                    if (FormMode === 'ADD') {
                        this.props.func.ClearForm();
                        this.props.func.HandleFormOpen(true);
                        this.props.func.HandleFormMode('ADD');

                        //load the required modules again
                        this.GetFreeUserRoles();
                        this.GetFreeBranches();
                    } else {
                        this.handleCloseDialog();
                    }
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
    }


    keyDownHandler(e) {
        if (e.keyCode === 83 && e.ctrlKey) {
            e.preventDefault();
            this.handleSubmitForm();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDownHandler);


        if (this.props.MyProfileMode) {
            this.props.func.HandleFormOpen(true);
            this.props.func.HandleFormMode('EDIT');
            this.props.func.HandleUserID(new APP.SERVICES.SessionUser().GetProfile().id);
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.GlobalData.FormOpen !== this.props.GlobalData.FormOpen) && this.props.GlobalData.FormOpen === true) {
            if (this.props.GlobalData.FormMode === 'ADD' || this.props.GlobalData.FormMode === 'EDIT' || this.props.GlobalData.FormMode === 'VIEW') {
                this.GetFreeUserRoles();
                this.GetFreeBranches();
            }

            if (this.props.GlobalData.FormMode === 'EDIT' || this.props.GlobalData.FormMode === 'VIEW') {
                this.GetUserProfile();
            }
        }
    }

    render() {
        return (
            <React.Fragment>

                {!this.props.MyProfileMode && (
                    <FullScreenDialog
                        open={this.props.GlobalData.FormOpen}
                        onClose={this.handleCloseDialog}
                        title={this.props.GlobalData.FormMode === 'ADD' ? 'Add User' : this.props.GlobalData.FormMode === 'EDIT' ? 'Edit User' : this.props.GlobalData.FormMode === 'VIEW' ? 'User Profile' : ""}
                        hasSubmitButton={(this.props.GlobalData.FormMode === 'ADD' || this.props.GlobalData.FormMode === 'EDIT')}
                        submitButtonTitle={"Save"}
                        submitButtonDisabled={false}
                        onSubmit={this.handleSubmitForm}>

                        <Form.Screen
                            onUserRoleListReloadCommand={this.GetFreeUserRoles}
                            onBranchListReloadCommand={this.GetFreeBranches}/>

                    </FullScreenDialog>
                )}

                {this.props.MyProfileMode && (
                    <React.Fragment>
                        <Form.Screen
                            onUserRoleListReloadCommand={this.GetFreeUserRoles}
                            onBranchListReloadCommand={this.GetFreeBranches}/>

                        <div style={{textAlign: "right", paddingRight: "10px"}}>
                            <Button variant={"contained"}
                                    style={{background: APP.CONFIG.COLORS.ACTION_BTN.SUCCESS, color: "#ffffff"}}
                                    onClick={this.handleSubmitForm}>
                                Save
                            </Button>
                        </div>
                    </React.Fragment>
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
    MyProfileMode: PropTypes.bool,
};

const mapStateToProps = state => {
    return {
        GlobalData: state.UserProfileForm
    }
};

const mapDispatchToProps = dispatch => {
    return {
        func: {
            ClearForm: () => {
                dispatch(ResetForm());
                dispatch(HandleUserRoleList([]));
                dispatch(HandleSelectedBranchList([]));
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

            StoreUserRoleList: (payload) => {
                dispatch(HandleUserRoleList(payload));
            },

            StoreBranchList: (payload) => {
                dispatch(HandleBranchList(payload));
            },

            HandleIsSelfProfile: (payload) => {
                dispatch(HandleIsSelfProfile(payload));
            },
            HandleUserID: (payload) => {
                dispatch(HandleUserID(payload));
            },
            HandleUserCode: (payload) => {
                dispatch(HandleUserCode(payload));
            },
            HandleSelectedBranchList: (payload) => {
                dispatch(HandleSelectedBranchList(payload));
            },
            HandleUserRoleID: (payload) => {
                dispatch(HandleUserRoleID(payload));
            },
            HandleIsActive: (payload) => {
                dispatch(HandleIsActive(payload));
            },
            HandleIsMasterUser: (payload) => {
                dispatch(HandleIsMasterUser(payload));
            },
            HandleIsSupportUser: (payload) => {
                dispatch(HandleIsSupportUser(payload));
            },
            HandleFullName: (payload) => {
                dispatch(HandleFullName(payload));
            },
            HandleEmail: (payload) => {
                dispatch(HandleEmail(payload));
            },
            HandlePassword: (payload) => {
                dispatch(HandlePassword(payload));
            },
            HandleContactNumber: (payload) => {
                dispatch(HandleContactNumber(payload));
            },
            HandleAddress: (payload) => {
                dispatch(HandleAddress(payload));
            },
            HandleProfilePhotoUrl: (payload) => {
                dispatch(HandleProfilePhotoUrl(payload));
            },
            HandleProfilePhotoFile: (payload) => {
                dispatch(HandleProfilePhotoFile(payload));
            },
            HandleMasterFlagEditPermission: (payload) => {
                dispatch(HandleMasterFlagEditPermission(payload));
            },
            HandleHasEditPermission: (payload) => {
                dispatch(HandleHasEditPermission(payload));
            },
        }
    }
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export {_Screen as Screen};
