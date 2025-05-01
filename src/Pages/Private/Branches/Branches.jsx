import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { APP } from "../../../App/AppProvider";
import { Auth } from "../../../Vendor/Service/Providers/Auth/Service.Auth";
import * as BranchForm from "../../../Screens/Private/Branches/Screen.Form";
import * as BranchGrid from "../../../Screens/Private/Branches/Screen.BranchesGrid";
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
import Grid from "@material-ui/core/Grid";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import PromptDialog from "../../../Components/Common/PromptDialog/PromptDialog";
import {
  HandleBranchAddress,
  HandleBranchCode,
  HandleBranchContactNumber,
  HandleBranchEmailAddress,
  HandleBranchID,
  HandleBranchName,
  HandleFormMode,
  HandleDataGridShouldReload,
  HandleFormOpen,
} from "../../../Global/Data/Actions/Private/BranchForm/BranchForm.Action";
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";

class Branch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ByPassSelectedList: [],
      BranchCode: "",
      BranchName: "",
      BranchAddress: "",
      BranchEmailAddress: "",
      BranchContactNumber: "",

      DataBranchList: [],

      EditMode: false,
      EditBranchId: 0,

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
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handelEmailChange = this.handelEmailChange.bind(this);
    this.handleContactChange = this.handleContactChange.bind(this);
    this.SaveBranch = this.SaveBranch.bind(this);
    this.handleChangeEditMode = this.handleChangeEditMode.bind(this);
    this.handleGridViewAction = this.handleGridViewAction.bind(this);
    this.handleGridEditAction = this.handleGridEditAction.bind(this);
    this.handleGridDeleteAction = this.handleGridDeleteAction.bind(this);
    this.handleGridRestoreAction = this.handleGridRestoreAction.bind(this);
    this.GetBranchList = this.GetBranchList.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.ToggleTrashMode = this.ToggleTrashMode.bind(this);
    this.GetBranchCode = this.GetBranchCode.bind(this);

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
    horizontalAlign =
      typeof horizontalAlign === "undefined" ? "" : horizontalAlign;

    this.setState(
      {
        __FaShow: false,
        __FaType: "",
        __FaMessage: "",
        __FaDuration: "",
        __FaVerticalAlign: "",
        __FaHorizontalAlign: "",
      },
      () => {
        this.setState({
          __FaShow: true,
          __FaType: type,
          __FaMessage: message,
          __FaDuration: duration === "" ? 0 : Number(duration),
          __FaVerticalAlign: verticalAlign,
          __FaHorizontalAlign: horizontalAlign,
        });
      }
    );
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

    this.setState(
      {
        __FaProgressBarShow: false,
        __FaProgressBarType: "",
        __FaProgressBarMessage: "",
        __FaProgressBarVerticalAlign: "",
        __FaProgressBarHorizontalAlign: "",
      },
      () => {
        this.setState({
          __FaProgressBarShow: true,
          __FaProgressBarType: type,
          __FaProgressBarMessage: message,
          __FaProgressBarVerticalAlign: verticalAlign,
          __FaProgressBarHorizontalAlign: horizontalAlign,
        });
      }
    );
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
    this.setState(
      {
        __PromptDialogShow: false,
        __PromptDialogTitle: "",
        __PromptDialogMessage: "",
        __PromptDialogTargetActionName: "",
        __PromptDialogTargetActionID: "",
      },
      () => {
        this.setState({
          __PromptDialogShow: true,
          __PromptDialogTitle: title,
          __PromptDialogMessage: message,
          __PromptDialogTargetActionName: action_name,
          __PromptDialogTargetActionID: action_id,
        });
      }
    );
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

    if (action_name === "SaveBranch") {
      this.SaveBranch();
    }
  }

  handleGridEditAction(id, Name, Code, Address, Email, Number) {
    this.setState({
      BranchCode: Code,
      BranchName: Name,
      BranchAddress: Address,
      BranchEmailAddress: Email,
      BranchContactNumber: Number,
      EditBranchId: id,
      EditMode: true,
    });
  }

  handleChangeEditMode(IsEditMode) {
    this.setState(
      {
        EditMode: IsEditMode,
      },
      () => {}
    );

    if (!IsEditMode) {
      this.setState({
        BranchCode: "",
        BranchName: "",
        BranchAddress: "",
        BranchEmailAddress: "",
        BranchContactNumber: "",
        EditMode: false,
        EditBranchId: 0,
      });
    }
  }

  handleNameChange(e) {
    this.setState(
      {
        BranchName: e.target.value,
      },
      () => {}
    );
  }
  handleCodeChange(e) {
    this.setState(
      {
        BranchCode: e.target.value,
      },
      () => {}
    );
  }

  handleAddressChange(e) {
    this.setState(
      {
        BranchAddress: e.target.value,
      },
      () => {}
    );
  }
  handelEmailChange(e) {
    this.setState(
      {
        BranchEmailAddress: e.target.value,
      },
      () => {}
    );
  }
  handleContactChange(e) {
    this.setState(
      {
        BranchContactNumber: e.target.value,
      },
      () => {}
    );
  }

  SaveBranch() {
    const FormMode = this.props.data.FormMode;
    const BranchID = this.state.EditBranchId;
    const BranchName = this.state.BranchName;
    const BranchAddress = this.state.BranchAddress;
    const BranchEmailAddress = this.state.BranchEmailAddress;
    const BranchContactNumber = this.state.BranchContactNumber;

    if (FormMode === "EDIT") {
      if (BranchID < 1) {
        this.__SetFA("error", "This is not a valid branch!");
        return false;
      }
    }

    if (BranchName.trim() === "") {
      this.__SetFA("error", "Enter branch name!");
      return false;
    }

    this.__SetFAP("general", "Loading", "top", "center");

    axios
      .post(
        APP.ENV.URL.API.ROOT + "/company/branches/save",
        {
          id: BranchID,
          Name: BranchName,
          Address: BranchAddress,
          Email: BranchEmailAddress,
          ContactNumber: BranchContactNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        this.__RemoveFAP();
        if (response.data.success) {
          this.__SetFA("success", response.data.message);

          if (FormMode === "ADD") {
            this.props.func.ResetFrom();
            this.props.func.HandleFormOpen(true);
            this.props.func.HandleFormMode("ADD");
          } else {
            this.handleCloseDialog();
          }

          this.props.func.HandleDataGridShouldReload(true);
        }
      })
      .catch((error) => {
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

  handleCloseDialog() {
    this.props.func.HandleFormOpen(false);
    this.props.func.HandleFormMode("");
    this.setState(
      {
        BranchCode: "",
        BranchName: "",
        BranchAddress: "",
        BranchEmailAddress: "",
        BranchContactNumber: "",
        EditMode: false,
        EditBranchId: 0,
      },
      () => {}
    );
    // this.props.func.ResetFrom();
  }
  /**
   * Get all the banks
   */
  handleGridViewAction(id, Name, Code, Address, Email, Number) {
    this.props.func.HandleId(id);
    this.props.func.HandleFormOpen(true);
    this.props.func.HandleFormMode("VIEW");
    this.setState({
      BranchCode: Code,
      BranchName: Name,
      BranchAddress: Address,
      BranchEmailAddress: Email,
      BranchContactNumber: Number,
      EditBranchId: id,
      EditMode: true,
    });
  }

  handleGridDeleteAction(ActionID) {
    let title = this.state.GridTrashMode ? "Attention!" : "Delete Branch";
    let message = this.state.GridTrashMode
      ? "By pressing the OK button, this action can not be reversed! Are you sure to permanently delete this branch?"
      : "Are you sure to delete this branch?";
    this.__PD("DeleteBranch", ActionID, title, message);
  }

  handleGridRestoreAction(ActionID) {
    this.__PD(
      "RestoreBranch",
      ActionID,
      "Restore Branch",
      "Are you sure to restore this branch?"
    );
  }

  /**
   * Get all the branch
   */
  GetBranchList(SearchQuery = "", FAPShow = true) {
    if (FAPShow) {
      this.__SetFAP("general", "Loading", "top", "center");
    }

    /**
     * Data variables
     * Used to send parameters in the xhr request
     */
    // let $row_limit = this.state.DataGridRowsPerPage,
    //   $current_page_number = this.state.DataGridCurrentPageNumber,
      let $search_query = SearchQuery;
    //   $offset = this.state.Offset;

    /**
     * Make a request to get the available data for the data grid table
     * @return array || object
     */
    let url =
      APP.ENV.URL.API.ROOT +
      "/company/branches?row_limit=" +
    //   $row_limit +
    //   "&page=" +
    //   $current_page_number +
      "&search_query=" +
      $search_query +
    //   "&offset=" +
    //   $offset +
      "&trash_mode=" +
      this.state.GridTrashMode;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          let $sn = response.data.branch_list.length;
          this.setState({ LastGridIndex: $sn });

          this.setState({
            DataBranchList: response.data.branch_list,
          });
         
        }
      })
      .catch((error) => {
        this.__RemoveFAP();

        if (error.response) {
          if (error.response.status === 401) {
            Auth.remove(this.props);
          }

          if (error.response.status === 403) {
            this.setState({
              DataBranches: [],
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
     * Get branch Code
     */
    GetBranchCode(){
      this.__SetFAP("general", "Loading", "top", "center");

      axios.get(APP.ENV.URL.API.ROOT + '/company/branches/getUpdatedCode', {
          headers: {
              Authorization: `Bearer ${Auth.getToken()}`,
          },
      }).then((response) => {

          this.__RemoveFAP();

          if (response.data.success) {

              let $branch = response.data.branch_newCode;

              this.setState({
                BranchCode: $branch
              });
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
   * Try to delete a bank
   */
  TryBranchDelete(BranchID) {
    this.__SetFAP("general", "Loading", "top", "center");
    axios
      .delete(
        APP.ENV.URL.API.ROOT +
          "/company/branches/delete?trash_mode=" +
          this.state.GridTrashMode,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
          data: {
            BranchID: BranchID,
          },
        }
      )
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.__SetFA("success", response.data.message);

          this.GetBranchList("", false);
        } else {
          this.__SetFA("error", response.data.message, 5000);
        }
      })
      .catch((error) => {
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
  TryBranchRestore(BranchID) {
    this.__SetFAP("general", "Loading", "top", "center");
    axios
      .put(
        APP.ENV.URL.API.ROOT + "/company/branches/restore",
        {
          BranchID: BranchID,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.__SetFA("success", response.data.message);

          this.GetBranchList("", false);
        } else {
          this.__SetFA("error", response.data.message, 5000);
        }
      })
      .catch((error) => {
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
    this.setState(
      (prevState) => ({
        GridTrashMode: !prevState.GridTrashMode,
        DataBranchList: [],
      }),
      () => {
        this.GetBranchList();
      }
    );
  }

  componentDidMount() {
    document.title = "Branch List / C&F";
    this.GetBranchCode();
    this.GetBranchList();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.data.DataGridShouldReload !==
        this.props.data.DataGridShouldReload &&
      this.props.data.DataGridShouldReload === true
    ) {
      this.GetBranchCode();
      this.GetBranchList("", false);
      this.props.func.HandleDataGridShouldReload(false);
    }
  }

  render() {
    return (
      <React.Fragment>
        <ModuleAccessible ModuleIndex={3}>
          <Grid container spacing={0}>
            <Grid item xs={8} sm={11}>
              <h2 style={{ margin: "0 0 20px 0" }}>Branch List</h2>
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
              title={
                this.props.data.FormMode === "ADD"
                  ? "Add Branch"
                  : this.props.data.FormMode === "EDIT"
                  ? "Edit Branch"
                  : this.props.data.FormMode === "VIEW"
                  ? "Branch Details"
                  : ""
              }
              hasSubmitButton={
                this.props.data.FormMode === "ADD" ||
                this.props.data.FormMode === "EDIT"
              }
              submitButtonTitle={"Save"}
              onClose={this.handleCloseDialog}
              onSubmit={this.SaveBranch}
            >
              <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item xs={3} sm={3}>
                   <BranchForm.Screen
                  SaveInProgress={true}
                  Name={this.state.BranchName}
                  Code={this.state.BranchCode}
                  Address={this.state.BranchAddress}
                  Email={this.state.BranchEmailAddress}
                  Contact={this.state.BranchContactNumber}
                  viewMode={true}
                />
                </Grid>
              </Grid>
            </FullScreenDialog>

            {!this.state.GridTrashMode && (
              <Grid item xs={12} sm={3}>
                <BranchForm.Screen
                  SaveInProgress={this.state.SaveInProgress}
                  Name={this.state.BranchName}
                  Code={this.state.BranchCode}
                  Address={this.state.BranchAddress}
                  Email={this.state.BranchEmailAddress}
                  Contact={this.state.BranchContactNumber}
                  EditMode={this.state.EditMode}
                  EditBranchId={this.state.EditBranchId}
                  onChangeEditMode={this.handleChangeEditMode}
                  onNameChange={this.handleNameChange}
                  onCodeChange={this.handleCodeChange}
                  onAddressChange={this.handleAddressChange}
                  onEmailChange={this.handelEmailChange}
                  onContactChange={this.handleContactChange}
                  onSave={() => this.SaveBranch()}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={this.state.GridTrashMode ? 12 : 9}>
              <BranchGrid.Screen
                data={this.state.DataBranchList}
                TrashMode={this.state.GridTrashMode}
                BypassMode={this.props.BypassMode}
                onSearchSubmit={this.GetBranchList}
                onEditAction={this.handleGridEditAction}
                onViewAction={this.handleGridViewAction}
                onDeleteAction={this.handleGridDeleteAction}
                onRestoreAction={this.handleGridRestoreAction}
                onOpenAccessPermissionDialog={
                  this.handleOpenAccessPermissionDialog
                }
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
              {...(this.state.__FaProgressBarMessage !== ""
                ? { message: this.state.__FaProgressBarMessage }
                : "")}
              {...(this.state.__FaProgressBarVerticalAlign !== ""
                ? {
                    verticalAlign: this.state.__FaProgressBarVerticalAlign,
                    horizontalAlign: this.state.__FaProgressBarHorizontalAlign,
                  }
                : "")}
            />
          )}

          {/* Prompt Dialog */}
          {this.state.__PromptDialogShow && (
            <PromptDialog
              title={this.state.__PromptDialogTitle}
              message={this.state.__PromptDialogMessage}
              onConfirm={this.__PDRunAction}
            />
          )}
        </ModuleAccessible>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
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

      HandleEmailAddress: (value) => {
        dispatch(HandleBranchEmailAddress(value));
      },
      HandleContactNumber: (value) => {
        dispatch(HandleBranchContactNumber(value));
      },
    },
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.BranchForm,
  };
};

Branch.propTypes = {
  BypassMode: PropTypes.bool,
  onBypassIdSelected: PropTypes.func,
  BypassSelectedId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Branch);
