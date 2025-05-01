import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { APP } from "../../../App/AppProvider";
import { Auth } from "../../../Vendor/Service/Providers/Auth/Service.Auth";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import PromptDialog from "../../../Components/Common/PromptDialog/PromptDialog";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";

import {
  HandleDataGridShouldReload,
  HandleFormMode,
  HandleFormOpen,
} from "../../../Global/Data/Actions/Private/CurrencyForm/CurrencyForm.Action";
import {
  SetSessionCompany
} from "../../../Global/Data/Actions/Private/SessionUser/SessionUser.Action";
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  Avatar: {
    width: theme.spacing(22),
    height: theme.spacing(22),
    display: "inline-block",
  },

  TextField: {
    "& .MuiOutlinedInput-root": {
      color: "#262626",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: APP.CONFIG.COLORS.PRIMARY,
    },
    "&.MuiFormControl-marginNormal": {
      margin: "0",
    },
    "&.MuiFormControl-marginNormal input": {
      padding: "10.5px 14px",
    },
  },
  AutoComplete: {
    "& .MuiInputBase-root": {
      padding: "0",
    },
  },
  TextArea: {
    width: "100%",
  },

  FormControl: {
    "&.MuiFormControl-root": {
      color: "#262626",
      width: "100%",
    },
    "&.MuiFormControl-root .MuiSelect-root": {
      padding: "10.5px 14px",
      color: "black",
    },
    "&.MuiFormControl-root .MuiInputLabel-outlined": {
      top: "-7px",
    },
    "&.MuiFormControl-root .MuiInputLabel-shrink": {
      transform: "translate(14px, 0px) scale(0.75) !important ",
    },
  },
  table: {
    minWidth: 650,
  },

  inputField: {
    display: "flex",
    flexDirection: "column",
  },
  addButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginBlock: "10px",
  },
  uploadItem: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "10px",
    marginBottom: "5px",
  },
});
const noLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwSGGfwg7rhSagWK4LfDiAqhLq70ljOTKzg&usqp=CAU";
class Company extends Component {
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
      AddPermission: new APP.SERVICES.UAP().GetModulePermissions(
        APP.CONFIG.MODULE[18]
      ).Add === 1,
      EditPermission: new APP.SERVICES.UAP().GetModulePermissions(
        APP.CONFIG.MODULE[18]
      ).Edit === 1,
      ModuleIndex: 18,

      CompanyName: "",
      CompanyPhone: "",
      CompanyEmail: "",
      CompanySite: "",
      CompanyAddress: "",
      Logo: "http://candf.salessystembd.com/public_uploads/images/C&F_COMPANY_LOGO_1101688727_TIMESTAMP_1583084805.png",
      RealLogo: "",
      InvoiceNumberType: "",
      IsInvoiceNumberTypeSelected: 0,
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

    // this.OpenForm = this.OpenForm.bind(this);
    this.GetCompanyInfo = this.GetCompanyInfo.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSite = this.handleSite.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleInvoiceNumberType = this.handleInvoiceNumberType.bind(this);
  }

  handleName(e) {
    this.setState({
      CompanyName: e.target.value,
    });
  }
  handlePhone(e) {
    this.setState({
      CompanyPhone: e.target.value,
    });
  }
  handleEmail(e) {
    this.setState({
      CompanyEmail: e.target.value,
    });
  }
  handleSite(e) {
    this.setState({
      CompanySite: e.target.value,
    });
  }
  handleAddress(e) {
    this.setState({
      CompanyAddress: e.target.value,
    });
  }

  handleFileUpload(e) {
    const fileList = e.target.files[0];
    this.setState({
      Logo: URL.createObjectURL(fileList),
      RealLogo: fileList,
    });
  }

  async handleDelete() {
    const $company_id = new APP.SERVICES.SessionUser(this.props).GetProfile()
      .CompanyID;
    this.__SetFAP("general", "Loading", "top", "center");

    await axios
      .delete(APP.ENV.URL.API.ROOT + "/company/deleteLogo?id=" + $company_id, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.setState({
            Logo: noLogo,
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



  async handleSave() {
    if (this.state.CompanyName === "" || this.state.CompanyEmail === "") {
      this.__SetFA("error", "Invalid Form");
      return false;
    }
    const $company_id = new APP.SERVICES.SessionUser(this.props).GetProfile()
      .CompanyID;
    this.__SetFAP("general", "Loading", "top", "center");

    const __formData = new FormData();
    __formData.append("id", $company_id);
    __formData.append("Name", this.state.CompanyName);
    __formData.append("Address1", this.state.CompanyAddress);
    __formData.append("Email", this.state.CompanyEmail);
    __formData.append("ContactNumber", this.state.CompanyPhone);
    __formData.append("WebAddress", this.state.CompanySite);
    __formData.append("Logo", this.state.RealLogo !== "" ? this.state.RealLogo : this.state.Logo);
    __formData.append("InvoiceNumberType", this.state.InvoiceNumberType);
    __formData.append("IsInvoiceNumberTypeSelected", 1);
    this.setState({
      IsInvoiceNumberTypeSelected: 1,
    });


    // this.props.func.SetSessionCompany({
    //   id: "7",
    //   Name: "Sajib Hawee",
    //   Address1: "Mission Road, Ward # 03, Gowalbathan, Kaliakair, Gazipur",
    //   Email: "haweesajib10@gmail.com",
    //   ContactNumber: "01784333088",
    //   WebAddress: "asdsad",
    //   Logo: "",
    //   InvoiceNumberType: "generic",
    //   IsInvoiceNumberTypeSelected: 1,
    // })


    await axios
      .post(APP.ENV.URL.API.ROOT + "/company/save", __formData, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.__SetFA("success", response.data.message);
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

  async GetCompanyInfo() {
    this.__SetFAP("general", "Loading", "top", "center");
    const $company_id = new APP.SERVICES.SessionUser(this.props).GetProfile()
      .CompanyID;
    await axios
      .get(APP.ENV.URL.API.ROOT + "/company/detail?id=" + $company_id, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.setState({
            CompanyName: response.data.company.Name,
            CompanyPhone: response.data.company.ContactNumber,
            CompanyEmail: response.data.company.Email,
            CompanySite: response.data.company.WebAddress,
            CompanyAddress: response.data.company.Address1,
            Logo: response.data.company.Logo ?? noLogo,
            InvoiceNumberType: response.data.company.InvoiceNumberType,
            IsInvoiceNumberTypeSelected:
              response.data.company.IsInvoiceNumberTypeSelected,
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
    if (action_name === "DeleteUser") {
      this.TryUserDelete(action_id);
    }

    if (action_name === "RestoreClient") {
      this.TryUserRestore(action_id);
    }
  }

  handleInvoiceNumberType(e) {
    this.setState({
      InvoiceNumberType: e.target.value,
    });
  }

  componentDidMount() {
    this.GetCompanyInfo();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ModuleAccessible ModuleIndex={18}>
          <Grid container spacing={0}>
            <Grid item xs={8} sm={11}>
              <h2 style={{ margin: "0 0 20px 0" }}>Company Info</h2>
            </Grid>
          </Grid>

          <Paper
            variant={"outlined"}
            square={false}
            style={{ padding: "20px" }}
          >
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      variant={"outlined"}
                      size={"small"}
                      label="Name"
                      className={classes.TextField}
                      value={this.state.CompanyName}
                      onChange={this.handleName}
                      required
                      disabled={!this.state.EditPermission}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      variant={"outlined"}
                      size={"small"}
                      label="Phone"
                      className={classes.TextField}
                      value={this.state.CompanyPhone}
                      onChange={this.handlePhone}
                      disabled={!this.state.EditPermission}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      variant={"outlined"}
                      size={"small"}
                      label="Email"
                      className={classes.TextField}
                      value={this.state.CompanyEmail}
                      onChange={this.handleEmail}
                      required
                      disabled={!this.state.EditPermission}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      variant={"outlined"}
                      size={"small"}
                      label="Website"
                      className={classes.TextField}
                      value={this.state.CompanySite}
                      onChange={this.handleSite}
                      disabled={!this.state.EditPermission}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      variant={"outlined"}
                      size={"small"}
                      label="Address"
                      className={classes.TextField}
                      value={this.state.CompanyAddress}
                      onChange={this.handleAddress}
                      disabled={!this.state.EditPermission}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Tooltip title="Can set only once">
                      <FormControl
                        variant="outlined"
                        className={classes.FormControl}
                      >
                        <InputLabel>Invoice Number Type</InputLabel>
                        <Select
                          fullWidth={true}
                          variant={"outlined"}
                          label="Invoice Number Type"
                          disabled={
                            this.state.IsInvoiceNumberTypeSelected === 1
                          }
                          onChange={this.handleInvoiceNumberType}
                          value={this.state.InvoiceNumberType}
                        >
                          <MenuItem value="generic">Generic</MenuItem>
                          <MenuItem value="client_wise">Client Wise</MenuItem>
                        </Select>
                      </FormControl>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <img
                    style={{ width: "300px" }}
                    src={this.state.Logo}
                    alt=""
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {this.state.EditPermission && (
                    <Button
                      // className={classes.addButton}
                      variant="contained"
                      color="secondary"
                      onClick={this.handleDelete}
                    >
                      Delete Logo
                    </Button>
                  )}
                </div>
                <div className={classes.inputField}>
                  {this.state.EditPermission && (
                    <>
                    <label>Upload New Logo</label>
                    <Button variant="contained" component="label">
                      Upload Logo
                      <input
                        accept=".jpg, .png"
                        type="file"
                        hidden
                        onChange={this.handleFileUpload}
                      />
                    </Button>
                    </>
                  )}
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                {this.state.EditPermission && (
                  <Button
                    // className={classes.addButton}
                    variant="contained"
                    color="primary"
                    onClick={this.handleSave}
                  >
                    Save
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>

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
      SetSessionCompany: (value) => {
        dispatch(SetSessionCompany(value));
      },
    },
  };
};

const mapStateToProps = (state) => {
  return {
    data: state.CompanyForm,
  };
};

Company.propTypes = {
  BypassMode: PropTypes.bool,
  onBypassIdSelected: PropTypes.func,
  BypassSelectedId: PropTypes.number,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Company));
