import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {APP} from "../../../../App/AppProvider";
import {Auth} from "../../../../Vendor/Service/Providers/Auth/Service.Auth";
import FloatingAlert from "../../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import PromptDialog from "../../../../Components/Common/PromptDialog/PromptDialog";
import Grid from "@material-ui/core/Grid";
import * as UserRoleForm from "../../../../Screens/Private/UAP/UserRole/Screen.UserRoleForm";
import * as UserRoleGrid from "../../../../Screens/Private/UAP/UserRole/Screen.UserRoleGrid";
import FullScreenDialog from "../../../../Components/Private/FullScreenDialog/FullScreenDialog";
import RolePermissions from "../../RolePermissions/RolePermissions";

class UserRole extends Component {
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

            __PromptDialogShow: false,
            __PromptDialogTargetActionName: "",
            __PromptDialogTargetActionID: "",
            __PromptDialogTitle: "",
            __PromptDialogMessage: "",
            /**
             * Core States End
             * --------------------------------------------------------------------------
             */


            DataUserRoles: [],

            RoleName: "",
            RoleDescription: "",
            RoleIsActive: true,

            EditMode: false,
            EditUserRoleID: 0,

            SaveInProgress: false,

            AccessPermissionDialogOpen: false,
            AccessPermissionUserRoleID: 0,
            AccessPermissionUserRoleName: "",
            AccessPermissionDialogSubmitDisabled: true,
            ModulePermissionList: [],

            GridTrashMode: false,
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


        this.GetAllUserRoles = this.GetAllUserRoles.bind(this);
        this.TryUserRoleSubmit = this.TryUserRoleSubmit.bind(this);
        this.TryUserRoleDelete = this.TryUserRoleDelete.bind(this);
        this.TryUserRoleRestore = this.TryUserRoleRestore.bind(this);

        this.handleChangeRoleName = this.handleChangeRoleName.bind(this);
        this.handleChangeRoleDescription = this.handleChangeRoleDescription.bind(this);
        this.handleChangeRoleIsActive = this.handleChangeRoleIsActive.bind(this);
        this.handleChangeEditMode = this.handleChangeEditMode.bind(this);
        this.handleChangeEditUserRoleID = this.handleChangeEditUserRoleID.bind(this);

        this.handleGridEditAction = this.handleGridEditAction.bind(this);
        this.handleGridDeleteAction = this.handleGridDeleteAction.bind(this);
        this.handleGridRestoreAction = this.handleGridRestoreAction.bind(this);

        this.handleOpenAccessPermissionDialog = this.handleOpenAccessPermissionDialog.bind(this);
        this.handleCloseAccessPermissionDialog = this.handleCloseAccessPermissionDialog.bind(this);
        this.handleSubmitAccessPermissionDialogForm = this.handleSubmitAccessPermissionDialogForm.bind(this);
        this.handleUpdateModulePermissionList = this.handleUpdateModulePermissionList.bind(this);

        this.ToggleTrashMode = this.ToggleTrashMode.bind(this);
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
        if (action_name === "DeleteUserRole") {
            this.TryUserRoleDelete(action_id);
        }

        if (action_name === "RestoreUserRole") {
            this.TryUserRoleRestore(action_id);
        }

        if (action_name === "SaveUserRole") {
            this.TryUserRoleSubmit();
        }

    }

    /**
     * Core Method Declaration Ends
     * ---------------------------------------------------------------------------------
     */



    handleChangeRoleName(e) {
        this.setState({
            RoleName: e.target.value,
        });
    }

    handleChangeRoleDescription(e) {
        this.setState({
            RoleDescription: e.target.value,
        });
    }

    handleChangeRoleIsActive(IsActive) {
        this.setState({
            RoleIsActive: IsActive,
        });
    }

    handleChangeEditMode(IsEditMode) {
        this.setState({
            EditMode: IsEditMode,
        });

        if (!IsEditMode) {
            this.setState({
                RoleName: "",
                RoleDescription: "",
                RoleIsActive: true,

                EditMode: false,
                EditUserRoleID: 0,
            });
        }
    }

    handleChangeEditUserRoleID(IsActive) {
        this.setState({
            EditUserRoleID: IsActive,
        });
    }


    handleGridEditAction(RoleID, RoleName, RoleDescription, RoleIsActive) {
        this.setState({
            RoleName: RoleName,
            RoleDescription: RoleDescription,
            RoleIsActive: RoleIsActive,

            EditMode: true,
            EditUserRoleID: RoleID,
        });
    }


    handleGridDeleteAction(RoleID) {
        let title = this.state.GridTrashMode ? "Attention!" : "Delete User Role";
        let message = this.state.GridTrashMode ? "By pressing the OK button, this action can not be reversed! Are you sure to permanently delete this user role?" : "Are you sure to delete this user role?";
        this.__PD("DeleteUserRole", RoleID, title, message);
    }

    handleGridRestoreAction(RoleID) {
        this.__PD("RestoreUserRole", RoleID, "Restore User Role", "Are you sure to restore this user role?");
    }


    handleOpenAccessPermissionDialog(UserRoleID, UserRoleName) {
        this.setState({
            AccessPermissionDialogOpen: true,
            AccessPermissionUserRoleID: UserRoleID,
            AccessPermissionUserRoleName: UserRoleName,
        });
    }

    handleCloseAccessPermissionDialog() {
        this.setState({
            AccessPermissionDialogOpen: false,
            AccessPermissionUserRoleID: 0,
            AccessPermissionUserRoleName: "",
            AccessPermissionDialogSubmitDisabled: true,
            ModulePermissionList: [],
        });
    }

    handleUpdateModulePermissionList(Modules) {
        this.setState({
            ModulePermissionList: Modules,
            AccessPermissionDialogSubmitDisabled: false,
        });
    }

    /**
     * Submit the access dialog permission form
     * save the permissions
     */
    handleSubmitAccessPermissionDialogForm() {

        this.__SetFAP("general", "Loading", "top", "center");

        this.setState({AccessPermissionDialogSubmitDisabled: true});

        axios.post(APP.ENV.URL.API.ROOT + "/set_role_permissions", {
            RoleID: this.state.AccessPermissionUserRoleID,
            Modules: this.state.ModulePermissionList,
        }, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then((response) => {

            this.__RemoveFAP();

            if (response.data.success) {

                new APP.SERVICES.UAP().Initialize();

                this.__SetFA("success", response.data.message);

                this.setState({
                    AccessPermissionDialogOpen: false,
                    AccessPermissionUserRoleID: 0,
                    AccessPermissionUserRoleName: "",
                    AccessPermissionDialogSubmitDisabled: true,
                    ModulePermissionList: [],
                });

            } else {
                this.__SetFA("error", response.data.message, 5000);
            }

        }).catch((error) => {

            this.__RemoveFAP();
            this.setState({AccessPermissionDialogSubmitDisabled: false});

            if(error.response) {
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
     * Get all the user roles
     */
    GetAllUserRoles(SearchQuery = '', FAPShow = true) {
        if (FAPShow) {
            this.__SetFAP("general", "Loading", "top", "center");
        }

        axios.get(APP.ENV.URL.API.ROOT + "/user_role_list?&trash_mode=" + this.state.GridTrashMode + "&search_query=" + SearchQuery.trim(), {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then((response) => {

            this.__RemoveFAP();

            if (response.data.success) {

                this.setState({
                    DataUserRoles: response.data.user_role_list,
                });

            }

        }).catch((error) => {

            this.__RemoveFAP();

            if(error.response) {
                if (error.response.status === 401) {
                    Auth.remove(this.props);
                }

                if (error.response.status === 403) {
                    this.setState({
                        DataUserRoles: [],
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
     * Try to submit the user role,
     * Edit or create a new data
     */
    TryUserRoleSubmit() {

        if (this.state.RoleName.trim() === '') {
            this.__SetFA("error", "Please enter a role!");
            return false;
        }

        this.__SetFAP("general", "Loading", "top", "center");

        this.setState({SaveInProgress: true});

        axios.post(APP.ENV.URL.API.ROOT + "/user_role/modify", {
            RoleID: this.state.EditUserRoleID,
            RoleName: this.state.RoleName,
            RoleDescription: this.state.RoleDescription,
            RoleIsActive: this.state.RoleIsActive,
        }, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then((response) => {

            this.__RemoveFAP();
            this.setState({SaveInProgress: false});

            if (response.data.success) {

                this.__SetFA("success", response.data.message);

                this.setState({
                    RoleName: "",
                    RoleDescription: "",
                    RoleIsActive: true,

                    EditMode: false,
                    EditUserRoleID: 0,
                });

                this.GetAllUserRoles('', false);
                new APP.SERVICES.UAP().Initialize();

            } else {
                this.__SetFA("error", response.data.message, 5000);
            }

        }).catch((error) => {

            this.__RemoveFAP();
            this.setState({SaveInProgress: false});

            if(error.response) {
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
     * Try to delete a user role
     */
    TryUserRoleDelete(RoleID) {
        this.__SetFAP("general", "Loading", "top", "center");
        axios.post(APP.ENV.URL.API.ROOT + "/user_role/delete?trash_mode=" + this.state.GridTrashMode, {
            RoleID: RoleID,
        }, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then((response) => {

            this.__RemoveFAP();

            if (response.data.success) {

                this.__SetFA("success", response.data.message);

                this.GetAllUserRoles('', false);

            } else {
                this.__SetFA("error", response.data.message, 5000);
            }

        }).catch((error) => {

            this.__RemoveFAP();

            if(error.response) {
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
     * Try to restore a user role
     */
    TryUserRoleRestore(RoleID) {
        this.__SetFAP("general", "Loading", "top", "center");
        axios.post(APP.ENV.URL.API.ROOT + "/user_role/restore", {
            RoleID: RoleID,
        }, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then((response) => {

            this.__RemoveFAP();

            if (response.data.success) {

                this.__SetFA("success", response.data.message);

                this.GetAllUserRoles('', false);

            } else {
                this.__SetFA("error", response.data.message, 5000);
            }

        }).catch((error) => {

            this.__RemoveFAP();

            if(error.response) {
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
     * Toggle Trash Mode
     */
    ToggleTrashMode() {
        this.setState((prevState) => ({
            GridTrashMode: !prevState.GridTrashMode,
            DataUserRoles: [],
        }), () => {
            this.GetAllUserRoles();
        });
    }


    componentDidMount() {
        document.title = "User Role List / C&F";

        this.GetAllUserRoles();
    }

    render() {
        return (
            <React.Fragment>

                <h2 style={{marginTop: 0}}>User Role</h2>

                <Grid container spacing={1}>
                    {!this.state.GridTrashMode && (
                        <Grid item xs={12} sm={4}>

                            <UserRoleForm.Screen
                                SaveInProgress={this.state.SaveInProgress}

                                RoleName={this.state.RoleName}
                                RoleDescription={this.state.RoleDescription}
                                RoleIsActive={this.state.RoleIsActive}
                                EditMode={this.state.EditMode}
                                EditUserRoleID={this.state.EditUserRoleID}

                                onChangeRoleName={this.handleChangeRoleName}
                                onChangeRoleDescription={this.handleChangeRoleDescription}
                                onChangeRoleIsActive={this.handleChangeRoleIsActive}
                                onChangeEditMode={this.handleChangeEditMode}
                                onChangeEditUserRoleID={this.handleChangeEditUserRoleID}
                                onUserRoleSubmit={() => this.state.EditMode ? this.__PD("SaveUserRole", "", "Alert", "Are you sure to save this user role?") : this.TryUserRoleSubmit()}
                            />

                        </Grid>
                    )}
                    <Grid item xs={12} sm={this.state.GridTrashMode ? 12 : 8}>

                        <UserRoleGrid.Screen
                            data={this.state.DataUserRoles}
                            TrashMode={this.state.GridTrashMode}
                            BypassMode={this.props.BypassMode}
                            onSearchSubmit={this.GetAllUserRoles}
                            onEditAction={this.handleGridEditAction}
                            onDeleteAction={this.handleGridDeleteAction}
                            onRestoreAction={this.handleGridRestoreAction}
                            onOpenAccessPermissionDialog={this.handleOpenAccessPermissionDialog}
                            onTrashModeToggle={this.ToggleTrashMode}
                            onBypassRoleSelected={this.props.onBypassRoleSelected}
                        />

                    </Grid>
                </Grid>


                {/* Role Permission modal */}
                <FullScreenDialog
                    open={this.state.AccessPermissionDialogOpen}
                    title={"Set Access Permissions"}
                    hasSubmitButton={true}
                    submitButtonTitle={"Save"}
                    submitButtonDisabled={this.state.AccessPermissionDialogSubmitDisabled}
                    onSubmit={this.handleSubmitAccessPermissionDialogForm}
                    onClose={this.handleCloseAccessPermissionDialog}>
                    <div style={{padding: "20px"}}>
                        <RolePermissions
                            RoleID={this.state.AccessPermissionUserRoleID}
                            RoleName={this.state.AccessPermissionUserRoleName}
                            onUpdateModulePermissionList={this.handleUpdateModulePermissionList}
                        />
                    </div>
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


UserRole.propTypes = {
    BypassMode: PropTypes.bool,
    onBypassRoleSelected: PropTypes.func,
}

export default withRouter(UserRole);
