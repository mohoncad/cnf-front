import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from "axios";
import {APP} from "../../../App/AppProvider";
import {Auth} from "../../../Vendor/Service/Providers/Auth/Service.Auth";
import * as CurrencyForm from "../../../Screens/Private/Currency/Screen.CurrencyForm";
import * as CurrencyGrid from "../../../Screens/Private/Currency/Screen.CurrencyGrid";
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
import Grid from "@material-ui/core/Grid";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import PromptDialog from "../../../Components/Common/PromptDialog/PromptDialog";
import { HandleCurrencyHasEditPermission, HandleCurrencyID, HandleCurrencyName, HandleCurrencyRate, HandleDataGridShouldReload, HandleFormMode, HandleFormOpen} from "../../../Global/Data/Actions/Private/CurrencyForm/CurrencyForm.Action";
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";

class Currency extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ByPassSelectedList: [],
            Name: '',
            Rate: '',
            
            DataCurrencyList: [],

            EditMode: false,
            EditCurrencyID: 0,

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
        this.handleRateChange = this.handleRateChange.bind(this);
        this.TryCurrencySubmit = this.TryCurrencySubmit.bind(this);
        this.handleChangeEditMode = this.handleChangeEditMode.bind(this);
        this.handleGridViewAction = this.handleGridViewAction.bind(this);
        this.handleGridEditAction = this.handleGridEditAction.bind(this);
        this.handleGridDeleteAction = this.handleGridDeleteAction.bind(this);
        this.handleGridRestoreAction = this.handleGridRestoreAction.bind(this);
        this.GetCurrencyList = this.GetCurrencyList.bind(this);
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
        if (action_name === "DeleteCurrency") {
            this.TryCurrencyDelete(action_id);
        }

        if (action_name === "RestoreCurrency") {
            this.TryCurrencyRestore(action_id);
        }

        if (action_name === "SaveCurrency") {
            this.TryCurrencySubmit();
        }

    }

    handleGridEditAction(CurrencyId, Name, Rate) {
        this.setState({
            Name: Name,
            Rate: Rate,
            EditMode: true,
            EditCurrencyID: CurrencyId,
        });
    }

    handleChangeEditMode(IsEditMode) {
        this.setState({
            EditMode: IsEditMode,
        }, ()=>{});

        if (!IsEditMode) {
            this.setState({
                Name: '',
                Rate: "",
                EditMode: false,
                EditCurrencyID: 0,
            });
        }
    }

    handleNameChange(e) {
        this.setState({
            Name: e.target.value
        }, ()=> {});
    };
    handleRateChange(e) {
        this.setState({
            Rate: e.target.value
        }, ()=> {});
    };

    TryCurrencySubmit() {
        if (this.state.Name.trim() === '') {
            this.__SetFA("error", "Please enter a name!");
            return false;
        }

        this.__SetFAP("general", "Loading", "top", "center");

        this.setState({SaveInProgress: true});

        axios.post(APP.ENV.URL.API.ROOT + "/company/currency/save", {
            id: this.state.EditCurrencyID,
            Name: this.state.Name,
            CurrencyRate: this.state.Rate,
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
                    Rate: "",

                    EditMode: false,
                    EditCurrencyID: 0,
                });

                this.GetCurrencyList('', false);
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
            EditMode: false,
            EditCurrencyID: 0,
        }, ()=> {});
        // this.props.func.ResetFrom();
    }
    /**
     * Get all the banks
     */
    handleGridViewAction(CurrencyId, Name, Rate) {
        this.props.func.HandleId(CurrencyId);
        this.props.func.HandleFormOpen(true);
        this.props.func.HandleFormMode('VIEW');
        this.setState({
            Name: Name,
            Rate: Rate,
            EditMode: true,
            EditCurrencyID: CurrencyId,
        });
    }
  
    // handleGridEditAction(id) {
    //     this.props.func.HandleId(id);
    //     this.props.func.HandleFormOpen(true);
    //     this.props.func.HandleFormMode('EDIT');
    // }
  
    handleGridDeleteAction(ActionID) {
        let title = this.state.GridTrashMode ? "Attention!" : "Delete Currency";
        let message = this.state.GridTrashMode ? "By pressing the OK button, this action can not be reversed! Are you sure to permanently delete this currency?" : "Are you sure to delete this currency?";
        this.__PD("DeleteCurrency", ActionID, title, message);
    }
  
    handleGridRestoreAction(ActionID) {
        this.__PD("RestoreCurrency", ActionID, "Restore Currency", "Are you sure to restore this currency?");
    }
  
  
    /**
     * Get all the currency
     */
    GetCurrencyList(SearchQuery = '', FAPShow = true) {
        if (FAPShow) {
            this.__SetFAP("general", "Loading", "top", "center");
        }
  
        axios.get(APP.ENV.URL.API.ROOT + "/company/currency?&trash_mode=" + this.state.GridTrashMode + "&search_query=" + SearchQuery.trim(), {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then((response) => {
  
            this.__RemoveFAP();
  
            if (response.data.success) {
  
                this.setState({
                    DataCurrencyList: response.data.currencies,
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
                        DataCurrencyList: [],
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
    TryCurrencyDelete(CurrencyId) {
        this.__SetFAP("general", "Loading", "top", "center");
        axios.delete(APP.ENV.URL.API.ROOT + "/company/currency/delete?trash_mode=" + this.state.GridTrashMode, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            data: {
                CurrencyID: CurrencyId,
            }
        }).then((response) => {
  
            this.__RemoveFAP();
  
            if (response.data.success) {
  
                this.__SetFA("success", response.data.message);
  
                this.GetCurrencyList('', false);
  
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
    TryCurrencyRestore(CurrencyId) {
        this.__SetFAP("general", "Loading", "top", "center");
        axios.put(APP.ENV.URL.API.ROOT + "/company/currency/restore", {
            CurrencyID: CurrencyId,
        }, {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then((response) => {
  
            this.__RemoveFAP();
  
            if (response.data.success) {
  
                this.__SetFA("success", response.data.message);
  
                this.GetCurrencyList('', false);
  
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
            DataCurrencyList: [],
        }), () => {
            this.GetCurrencyList();
        });
    }
  
  
    componentDidMount() {
        document.title = "Bank List / C&F";
  
        this.GetCurrencyList();
    }
  
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data.DataGridShouldReload !== this.props.data.DataGridShouldReload && this.props.data.DataGridShouldReload === true) {
            this.GetCurrencyList('', false);
            this.props.func.HandleDataGridShouldReload(false);
        }
    }

    render() {

        return (
            <React.Fragment>
                <ModuleAccessible ModuleIndex={8}>
                    <Grid container spacing={0}>
                        <Grid item xs={8} sm={11}>
                            <h2 style={{margin: "0 0 20px 0"}}>Currency List</h2>
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
                        title={this.props.data.FormMode === 'ADD' ? "Add Currency" : this.props.data.FormMode === 'EDIT' ? "Edit Currency" : this.props.data.FormMode === 'VIEW' ? "Currency Details" : ""}
                        hasSubmitButton={(this.props.data.FormMode === 'ADD' || this.props.data.FormMode === 'EDIT')}
                        submitButtonTitle={"Save"}
                        onClose={this.handleCloseDialog}
                        onSubmit={this.SaveBranch}
                    >
                        <Grid container spacing={1} justify="center" alignItems="center">
                            <Grid item xs={3} sm={3}>
                            <CurrencyForm.Screen 
                                    Name={this.state.Name}
                                    Rate={this.state.Rate}
                                    viewMode={true}
                                    SaveInProgress={true}
                                />
                            </Grid>
                        </Grid>

                    </FullScreenDialog>
                    
                    {!this.state.GridTrashMode && (
                        <Grid item xs={12} sm={3}>
                            <CurrencyForm.Screen 
                                SaveInProgress={this.state.SaveInProgress}
                                Name={this.state.Name}
                                Rate={this.state.Rate}

                                EditMode={this.state.EditMode}
                                EditCurrencyId={this.state.EditCurrencyID}
                                onChangeEditMode={this.handleChangeEditMode}
                                onNameChange={this.handleNameChange}
                                onRateChange={this.handleRateChange}
                                onSave={() =>  this.TryCurrencySubmit()}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12} sm={this.state.GridTrashMode ? 12 : 9}>
                        <CurrencyGrid.Screen 
                            data={this.state.DataCurrencyList}
                            TrashMode={this.state.GridTrashMode}
                            BypassMode={this.props.BypassMode}
                            onSearchSubmit={this.GetCurrencyList}
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
                dispatch(HandleCurrencyID(value));
            },
            HandleCurrencyName: (value) => {
                dispatch(HandleCurrencyName(value));
            },
            HandleCurrencyRate: (value) => {
                dispatch(HandleCurrencyRate(value));
            },
            HandleCurrencyHasEditPermission: (value) => {
                dispatch(HandleCurrencyHasEditPermission(value));
            },
        }
    }
};

const mapStateToProps = state => {
    return {
        data: state.CurrencyForm,
    }
};

Currency.propTypes = {
    BypassMode: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
