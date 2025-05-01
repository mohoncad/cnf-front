import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from "axios";
import {APP} from "../../../App/AppProvider";
import {Auth} from "../../../Vendor/Service/Providers/Auth/Service.Auth";
import * as PortForm from "../../../Screens/Private/Port/Screen.PortForm";
import * as PortGrid from "../../../Screens/Private/Port/Screen.PortGrid";
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
import Grid from "@material-ui/core/Grid";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import PromptDialog from "../../../Components/Common/PromptDialog/PromptDialog";
import { HandlePortHasEditPermission, HandlePortID, HandlePortName, HandlePortCode, HandleDataGridShouldReload, HandleFormMode, HandleFormOpen} from "../../../Global/Data/Actions/Private/PortForm/PortForm.Action";
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";

class Port extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ByPassSelectedList: [],
            Name: '',
            Code: '',
            
            DataPortList: [],

            EditMode: false,
            EditPortID: 0,

            SaveInProgress: false,

            AccessPermissionDialogOpen: false,
            AccessPermissionUserRoleID: 0,
            AccessPermissionUserRoleName: "",
            AccessPermissionDialogSubmitDisabled: true,
            ModulePermissionList: [],

            GridTrashMode: false,
            
            __AlertDialogShow: false,
            __AlertDialogTitle: "",
            __AlertDialogMessage: "",

            __PromptDialogShow: false,
            __PromptDialogTargetActionName: "",
            __PromptDialogTargetActionID: "",
            __PromptDialogTitle: "",
            __PromptDialogMessage: "",

        };
        // this.handleChangeEditUserRoleID = this.handleChangeEditUserRoleID.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.TryPortSubmit = this.TryPortSubmit.bind(this);
        this.handleChangeEditMode = this.handleChangeEditMode.bind(this);
        this.handleGridViewAction = this.handleGridViewAction.bind(this);
        this.handleGridEditAction = this.handleGridEditAction.bind(this);
        this.handleGridDeleteAction = this.handleGridDeleteAction.bind(this);
        this.handleGridRestoreAction = this.handleGridRestoreAction.bind(this);
        this.GetPortList = this.GetPortList.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.ToggleTrashMode = this.ToggleTrashMode.bind(this);
        
        this.__SetFA = this.__SetFA.bind(this);
        this.__RemoveFA = this.__RemoveFA.bind(this);
        this.__SetFAP = this.__SetFAP.bind(this);
        this.__RemoveFAP = this.__RemoveFAP.bind(this);
        this.__PD = this.__PD.bind(this);
        this.__PDRunAction = this.__PDRunAction.bind(this);
    }

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
        if (action_name === "DeletePort") {
            this.TryPortDelete(action_id);
        }

        if (action_name === "RestorePort") {
            this.TryPortRestore(action_id);
        }

        if (action_name === "SavePort") {
            this.TryPortSubmit();
        }

    }

    handleGridEditAction(PortId, Name, Code) {
        this.setState({
            Name: Name,
            Code: Code,
            EditMode: true,
            EditPortID: PortId,
        });
    }

    handleChangeEditMode(IsEditMode) {
        this.setState({
            EditMode: IsEditMode,
        }, ()=>{});

        if (!IsEditMode) {
            this.setState({
                Name: '',
                Code: "",
                EditMode: false,
                EditPortID: 0,
            });
        }
    }

    handleNameChange(e) {

        this.setState({
            Name: e.target.value
        }, ()=> {});
    };
    handleCodeChange(e) {
        this.setState({
            Code: e.target.value
        }, ()=> {});
    };

    TryPortSubmit() {
        if (this.state.Name.trim() === '') {
            this.__SetFA("error", "Please enter a name!");
            return false;
        }

        this.__SetFAP("general", "Loading", "top", "center");

        this.setState({SaveInProgress: true});

        axios.post(APP.ENV.URL.API.ROOT + "/company/ports/save", {
            id: this.state.EditPortID,
            Name: this.state.Name,
            PortCode: this.state.Code,
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
                    Name: "",
                    Code: "",

                    EditMode: false,
                    EditPortID: 0,
                });

                this.GetPortList('', false);
                // new APP.SERVICES.UAP().Initialize();

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

    handleCloseDialog() {
        this.props.func.HandleFormOpen(false);
        this.props.func.HandleFormMode('');
        this.setState({
            Name: '',
            Code: "",
            EditMode: false,
            EditPortID: 0,
        }, ()=> {});
        // this.props.func.ResetFrom();
    }
    /**
     * Get all the banks
     */
    handleGridViewAction(PortId, Name, Code) {
        this.props.func.HandleId(PortId);
        this.props.func.HandleFormOpen(true);
        this.props.func.HandleFormMode('VIEW');
        this.setState({
            Name: Name,
            Code: Code,
            EditMode: true,
            EditPortID: PortId,
        });
    }
  
    // handleGridEditAction(id) {
    //     this.props.func.HandleId(id);
    //     this.props.func.HandleFormOpen(true);
    //     this.props.func.HandleFormMode('EDIT');
    // }
  
    handleGridDeleteAction(ActionID) {
        let title = this.state.GridTrashMode ? "Attention!" : "Delete Port";
        let message = this.state.GridTrashMode ? "By pressing the OK button, this action can not be reversed! Are you sure to permanently delete this port?" : "Are you sure to delete this port?";
        this.__PD("DeletePort", ActionID, title, message);
    }
  
    handleGridRestoreAction(ActionID) {
        this.__PD("RestorePort", ActionID, "Restore Port", "Are you sure to restore this port?");
    }
  
  
    /**
     * Get all the port
     */
    GetPortList(SearchQuery = '', FAPShow = true) {
        if (FAPShow) {
            this.__SetFAP("general", "Loading", "top", "center");
        }
  
        axios.get(APP.ENV.URL.API.ROOT + "/company/ports?&trash_mode=" + this.state.GridTrashMode + "&search_query=" + SearchQuery.trim(), {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then((response) => {
  
            this.__RemoveFAP();
  
            if (response.data.success) {
  
                this.setState({
                    DataPortList: response.data.ports,
                });
  
            }
  
        }).catch((error) => {
  
            this.__RemoveFAP();
  
            if (error.response) {
                if (error.response.status === 401) {
                    Auth.remove(this.props);
                }
  
                if (error.response.status === 403) {
                    this.setState({
                        DataPortList: [],
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
     * Try to delete a bank
     */
    TryPortDelete(PortId) {
        this.__SetFAP("general", "Loading", "top", "center");
        axios.delete(APP.ENV.URL.API.ROOT + "/company/ports/delete?trash_mode=" + this.state.GridTrashMode, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            data: {
                PortID: PortId,
            }
        }).then((response) => {
  
            this.__RemoveFAP();
  
            if (response.data.success) {
  
                this.__SetFA("success", response.data.message);
  
                this.GetPortList('', false);
  
            } else {
                this.__SetFA("error", response.data.message, 5000);
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
     * Try to restore a bank
     */
    TryPortRestore(PortId) {
        this.__SetFAP("general", "Loading", "top", "center");
        axios.put(APP.ENV.URL.API.ROOT + "/company/ports/restore", {
            portID: PortId,
        }, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then((response) => {
  
            this.__RemoveFAP();
  
            if (response.data.success) {
  
                this.__SetFA("success", response.data.message);
  
                this.GetPortList('', false);
  
            } else {
                this.__SetFA("error", response.data.message, 5000);
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
     * Toggle Trash Mode
     */
    ToggleTrashMode() {
        this.setState((prevState) => ({
            GridTrashMode: !prevState.GridTrashMode,
            DataPortList: [],
        }), () => {
            this.GetPortList();
        });
    }
  
  
    componentDidMount() {
        document.title = "Port List / C&F";
  
        this.GetPortList();
    }
  
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data.DataGridShouldReload !== this.props.data.DataGridShouldReload && this.props.data.DataGridShouldReload === true) {
            this.GetPortList('', false);
            this.props.func.HandleDataGridShouldReload(false);
        }
    }

    render() {

        return (
            <React.Fragment>
                <ModuleAccessible ModuleIndex={10}>
                    <Grid container spacing={0}>
                        <Grid item xs={8} sm={11}>
                            <h2 style={{margin: "0 0 20px 0"}}>Port List</h2>
                        </Grid>
                        {/* <Grid item xs={4} sm={1}>
                            <Button style={{background: APP.CONFIG.COLORS.PRIMARY, color: "#ffffff"}} size={"small"}
                                    fullWidth={true} onClick={() => {
                                this.props.func.HandleFormOpen(true);
                                this.props.func.HandleFormMode('ADD');
                            }}>
                                <AddIcon/> &nbsp; Add
                            </Button>
                        </Grid> */}
                    </Grid>

                    <Grid container spacing={1}>
                    <FullScreenDialog
                        open={this.props.data.FormOpen}
                        title={this.props.data.FormMode === 'ADD' ? "Add Port" : this.props.data.FormMode === 'EDIT' ? "Edit Port" : this.props.data.FormMode === 'VIEW' ? "Port Details" : ""}
                        hasSubmitButton={(this.props.data.FormMode === 'ADD' || this.props.data.FormMode === 'EDIT')}
                        submitButtonTitle={"Save"}
                        onClose={this.handleCloseDialog}
                        onSubmit={this.SaveBranch}
                    >
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item xs={3} sm={3}>
                            <PortForm.Screen 
                                    Name={this.state.Name}
                                    Code={this.state.Code}
                                    viewMode={true}
                                    SaveInProgress={true}
                                />
                            </Grid>
                        </Grid>

                    </FullScreenDialog>
                    
                    {!this.state.GridTrashMode && (
                        <Grid item xs={12} sm={3}>
                            <PortForm.Screen 
                                SaveInProgress={this.state.SaveInProgress}
                                Name={this.state.Name}
                                Code={this.state.Code}
                                EditMode={this.state.EditMode}
                                EditPortId={this.state.EditPortID}
                                onChangeEditMode={this.handleChangeEditMode}
                                onNameChange={this.handleNameChange}
                                onCodeChange={this.handleCodeChange}
                                onSave={() =>  this.TryPortSubmit()}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12} sm={this.state.GridTrashMode ? 12 : 9}>
                        <PortGrid.Screen 
                            data={this.state.DataPortList}
                            TrashMode={this.state.GridTrashMode}
                            BypassMode={this.props.BypassMode}
                            onSearchSubmit={this.GetPortList}
                            onEditAction={this.handleGridEditAction}
                            onViewAction={this.handleGridViewAction}
                            onDeleteAction={this.handleGridDeleteAction}
                            onRestoreAction={this.handleGridRestoreAction}
                            onOpenAccessPermissionDialog={this.handleOpenAccessPermissionDialog}
                            onTrashModeToggle={this.ToggleTrashMode}
                            onBypassRoleSelected={this.props.onBypassRoleSelected}
                        />
                    </Grid>
                </Grid>
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

                </ModuleAccessible>
            </React.Fragment>
        );
    }
}

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
            HandleId: (value) => {
                dispatch(HandlePortID(value));
            },
            HandlePortName: (value) => {
                dispatch(HandlePortName(value));
            },
            HandlePortCode: (value) => {
                dispatch(HandlePortCode(value));
            },
            HandlePortHasEditPermission: (value) => {
                dispatch(HandlePortHasEditPermission(value));
            },
        }
    }
};

const mapStateToProps = state => {
    return {
        data: state.PortForm,
    }
};

Port.propTypes = {
    BypassMode: PropTypes.bool,
    onBypassIdSelected: PropTypes.func,
    BypassSelectedId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Port);
