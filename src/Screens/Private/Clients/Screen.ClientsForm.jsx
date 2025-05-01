import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { APP } from "../../../App/AppProvider";
// import TextField from "@material-ui/core/TextField";
// import AutoCompleteSelect from "../../../Components/Private/AutoCompleteSelect/AutoCompleteSelect";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import FloatingAlert from "../../../Components/Common/FloatingAlert/FloatingAlert";
import FloatingProgressbar from "../../../Components/Common/FloatingProgressbar/FloatingProgressbar";
import PromptDialog from "../../../Components/Common/PromptDialog/PromptDialog";
import {
  HandleBranchList,
  HandleCode,
  HandleDataGridShouldReload,
  HandleGroup,
  HandleFormMode,
  HandleFormOpen,
  HandleName,
  HandleClientId,
  HandleCodePrefix,
  HandleMobile,
  HandleBin,
  HandleBoi,
  HandleEmail,
  HandleBond,
  HandleErc,
  HandleFax,
  HandleGen,
  HandleIrc,
  HandleMailAdd,
  HandleNote,
  HandlePhone,
  HandleQuotationDoc,
  HandleTin,
  HandleVatDoc,
  HandleWeb,
  HandleRegistration,
  ResetForm,
  HandleEditPermission,
} from "../../../Global/Data/Actions/Private/ClientsForm/ClientsForm.Action";
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
      EditMode: false,
      EditId: 0,

      id: "",
      Code: "",
      Name: "",
      MailingAddess: "",
      Phone: "",
      Email: "",
      ClientGroupID: "",
      CodePrefix: "",
      Fax: "",
      Mobile: "",
      Web: "",
      IRC: "",
      BIN_VAT: "",
      BondLicense: "",
      GenBond: "",
      ERC: "",
      TIN: "",
      BOIReg: "",
      Note: "",
      VATRegCopy: "",
      Quotation: "",
      VatFile: {},
      QuotationFile: {},
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
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMailingAddChange = this.handleMailingAddChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleClientGroupIdChange = this.handleClientGroupIdChange.bind(this);
    this.handleCodePrefixChange = this.handleCodePrefixChange.bind(this);
    this.handleFaxChange = this.handleFaxChange.bind(this);
    this.handleMobileChange = this.handleMobileChange.bind(this);
    this.handleWebChange = this.handleWebChange.bind(this);
    this.handleIrcChange = this.handleIrcChange.bind(this);
    this.handleBINChange = this.handleBINChange.bind(this);
    this.handleBondLisChange = this.handleBondLisChange.bind(this);
    this.handleGenBondChange = this.handleGenBondChange.bind(this);
    this.handleERCChange = this.handleERCChange.bind(this);
    this.handleTINChange = this.handleTINChange.bind(this);
    this.handleBOIChange = this.handleBOIChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleVatRegChange = this.handleVatRegChange.bind(this);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);

    this.handleCloseDialog = this.handleCloseDialog.bind(this);

    this.handleSubmitForm = this.handleSubmitForm.bind(this);

    // this.GetFreeUserRoles = this.GetFreeUserRoles.bind(this);
    // this.GetFreeBranches = this.GetFreeBranches.bind(this);
    this.GetClientDetails = this.GetClientDetails.bind(this);

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
    if (action_name === "DeleteUser") {
      this.TryUserDelete(action_id);
    }
  }

  /**
   * Core Method Declaration Ends
   * ---------------------------------------------------------------------------------
   */

  ValidateEmail(email) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  ValidatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phone));
  }

  handleUpdateFormMode(FormMode) {
    this.setState({ FormMode });
  }

  handleNameChange(e) {
    this.props.func.HandleName(e.target.value);
  }
  handleCodeChange(e) {
    this.props.func.HandleCode(e.target.value);
  }
  handleMailingAddChange(e) {
    this.props.func.HandleMailAdd(e.target.value);
  }
  handlePhoneChange(e) {
    this.props.func.HandlePhone(e.target.value);
  }
  handleEmailChange(e) {
    this.props.func.HandleEmail(e.target.value);
  }
  handleClientGroupIdChange(e) {
    this.props.func.HandleGroup(e.target.value);
  }

  handleCodePrefixChange(e) {
    this.props.func.HandleCodePrefix(e.target.value);
  }
  handleFaxChange(e) {
    this.props.func.HandleFax(e.target.value);
  }
  handleMobileChange(e) {
    this.props.func.HandleMobile(e.target.value);
  }
  handleWebChange(e) {
    this.props.func.HandleWeb(e.target.value);
  }
  handleIrcChange(e) {
    this.props.func.HandleIrc(e.target.value);
  }
  handleBINChange(e) {
    this.props.func.HandleBin(e.target.value);
  }
  handleBondLisChange(e) {
    this.props.func.HandleBond(e.target.value);
  }
  handleGenBondChange(e) {
    this.props.func.HandleGen(e.target.value);
  }
  handleERCChange(e) {
    this.props.func.HandleErc(e.target.value);
  }
  handleTINChange(e) {
    this.props.func.HandleTin(e.target.value);
  }
  handleBOIChange(e) {
    this.props.func.HandleBoi(e.target.value);
  }
  handleNoteChange(e) {
    this.props.func.HandleNote(e.target.value);
  }

  handleVatRegChange(e) {
    if (e) {
      const fileList = e.target.files;
      this.props.func.HandleVatDoc(fileList[0].name);
      this.setState({
        VatFile: fileList[0]
      })
    } else {
      this.setState({
        VatFile: null
      })
      this.props.func.HandleVatDoc("");
    }
  }

  handleQuoteChange(e) {
    if (e) {
      const fileList = e.target.files;
      this.props.func.HandleQuotationDoc(fileList[0].name);
      this.setState({
        QuotationFile: fileList[0]
      })
    } else {
      this.setState({
        QuotationFile: null
      })
      this.props.func.HandleQuotationDoc("");
    }
  }

  /**
   *
   */
  GetClientDetails() {
    this.__SetFAP("general", "Loading", "top", "center");

    axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/clients/detail?id=" +
          this.props.GlobalData.ClientId +
          "?Code=" +
          this.props.GlobalData.Code,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          let $client = response.data.client;

          this.props.func.HandleClientId($client.id);
          this.props.func.HandleCode($client.Code);
          this.props.func.HandleName($client.Name);
          this.props.func.HandleGroup($client.ClientGroupID);
          this.props.func.HandleCodePrefix($client.CodePrefix);
          this.props.func.HandleMobile($client.Mobile);
          this.props.func.HandleEmail($client.Email);
          this.props.func.HandleMailAdd($client.MailingAddess);
          this.props.func.HandleFax($client.Fax);
          this.props.func.HandlePhone($client.Phone);
          this.props.func.HandleWeb($client.Web);
          this.props.func.HandleIrc($client.IRC);
          this.props.func.HandleErc($client.ERC);
          this.props.func.HandleBin($client.BIN_VAT);
          this.props.func.HandleTin($client.TIN);
          this.props.func.HandleBond($client.BondLicense);
          this.props.func.HandleBoi($client.BOIReg);
          this.props.func.HandleGen($client.GenBond);
          this.props.func.HandleNote($client.Note);
          this.props.func.HandleVatDoc($client.VATRegCopy);
          this.props.func.HandleQuotationDoc($client.Quotation);
          this.props.func.HandleEditPermission($client.HasEditPermission);
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

  /**
   * Add a new User entry Or Update existing user's entry
   * @Mode: [ADD, EDIT]
   */
  handleSubmitForm() {
    if (this.props.GlobalData.Code === "") {
      this.__SetFA("error", "Code cannot be empty!");
      return false;
    }
    if (this.props.GlobalData.ClientGroupID === "") {
      this.__SetFA("error", "Group cannot be empty!");
      return false;
    }

    if (this.props.GlobalData.Name.trim() === "") {
      this.__SetFA("error", "Please enter the full name of the user!");
      return false;
    }

    if (this.props.GlobalData.CodePrefix.trim() === "") {
      this.__SetFA("error", "Code cannot be empty!");
      return false;
    }

    if (
      this.props.GlobalData.Email &&
      !this.ValidateEmail(this.props.GlobalData.Email)
    ) {
      this.__SetFA("error", "Please enter a valid email address!");
      return false;
    }

    this.__SetFAP("general", "Loading", "top", "center");

    const __formData = new FormData();
    __formData.append("Name", this.props.GlobalData.Name);
    __formData.append("Code", this.props.GlobalData.Code);
    __formData.append("MailingAddess", this.props.GlobalData.MailingAddress);
    __formData.append("Phone", this.props.GlobalData.Phone);
    __formData.append("Email", this.props.GlobalData.Email);
    __formData.append("ClientGroupID", this.props.GlobalData.ClientGroupID);
    __formData.append("CodePrefix", this.props.GlobalData.CodePrefix);
    __formData.append("Fax", this.props.GlobalData.Fax);
    __formData.append("Mobile", this.props.GlobalData.Mobile);
    __formData.append("Web", this.props.GlobalData.Web);
    __formData.append("IRC", this.props.GlobalData.IRC);
    __formData.append("BIN_VAT", this.props.GlobalData.BIN);
    __formData.append("BondLicense", this.props.GlobalData.BondLisc);
    __formData.append("GenBond", this.props.GlobalData.GenBond);
    __formData.append("ERC", this.props.GlobalData.ERC);
    __formData.append("TIN", this.props.GlobalData.TIN);
    __formData.append("BOIReg", this.props.GlobalData.BOI);
    __formData.append("Note", this.props.GlobalData.Note);
    __formData.append("VATRegCopy", this.state.VatFile);
    __formData.append("Quotation", this.state.QuotationFile);

    if (this.props.GlobalData.FormMode === "EDIT") {
      __formData.append("id", this.props.GlobalData.ClientId);
    }
    axios
      .post(APP.ENV.URL.API.ROOT + "/company/clients/save", __formData, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.__SetFA("success", response.data.message);

          this.props.func.HandleDataGridShouldReload(true);
          if (this.state.EditMode) {
            this.props.func.ClearForm();
            this.props.func.HandleFormOpen(true);
            this.props.func.HandleFormMode("ADD");
          } else {
            this.handleCloseDialog();
          }
        } else {
          this.__SetFA("error", response.data.message);
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
    document.addEventListener("keydown", this.keyDownHandler);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.GlobalData.FormOpen !== this.props.GlobalData.FormOpen &&
      this.props.GlobalData.FormOpen === true
    ) {
      if (
        this.props.GlobalData.FormMode === "EDIT" ||
        this.props.GlobalData.FormMode === "VIEW"
      ) {
        this.GetClientDetails();
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <FullScreenDialog
          open={this.props.GlobalData.FormOpen}
          onClose={this.handleCloseDialog}
          title={
            this.props.GlobalData.FormMode === "ADD"
              ? "Add Client"
              : this.props.GlobalData.FormMode === "EDIT"
              ? "Edit Client"
              : this.props.GlobalData.FormMode === "VIEW"
              ? "Client Profile"
              : ""
          }
          hasSubmitButton={
            this.props.GlobalData.FormMode === "ADD" ||
            this.props.GlobalData.FormMode === "EDIT"
          }
          submitButtonTitle={"Save"}
          submitButtonDisabled={false}
          onSubmit={this.handleSubmitForm}
        >
          <Form.Screen
            // onUserRoleListReloadCommand={this.GetFreeUserRoles}
            // onBranchListReloadCommand={this.GetFreeBranches}
            onCodeChange={this.handleCodeChange}
            onNameChange={this.handleNameChange}
            onMailingChange={this.handleMailingAddChange}
            onPhoneChange={this.handlePhoneChange}
            onEmailChange={this.handleEmailChange}
            onClientGroupChange={this.handleClientGroupIdChange}
            onCodePrefixChange={this.handleCodePrefixChange}
            onFaxChange={this.handleFaxChange}
            onMobileChange={this.handleMobileChange}
            onWebChange={this.handleWebChange}
            onIrcChange={this.handleIrcChange}
            onBinChange={this.handleBINChange}
            onBondLisChange={this.handleBondLisChange}
            onGenBondChange={this.handleGenBondChange}
            onErcChange={this.handleERCChange}
            onTinChange={this.handleTINChange}
            onBoiChange={this.handleBOIChange}
            onNoteChange={this.handleNoteChange}
            onQuoteChange={this.handleQuoteChange}
            onVatChange={this.handleVatRegChange}
          />
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
            onConfirm={this.__PDRunAction}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GlobalData: state.ClientsForm,
  };
};

const mapDispatchToProps = (dispatch) => {
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
      StoreBranchList: (payload) => {
        dispatch(HandleBranchList(payload));
      },
      HandleClientId: (payload) => {
        dispatch(HandleClientId(payload));
      },
      HandleGroup: (payload) => {
        dispatch(HandleGroup(payload));
      },
      HandleCode: (payload) => {
        dispatch(HandleCode(payload));
      },
      HandleBin: (payload) => {
        dispatch(HandleBin(payload));
      },
      HandleBoi: (payload) => {
        dispatch(HandleBoi(payload));
      },
      HandleBond: (payload) => {
        dispatch(HandleBond(payload));
      },
      HandleErc: (payload) => {
        dispatch(HandleErc(payload));
      },
      HandleFax: (payload) => {
        dispatch(HandleFax(payload));
      },
      HandleGen: (payload) => {
        dispatch(HandleGen(payload));
      },
      HandleIrc: (payload) => {
        dispatch(HandleIrc(payload));
      },
      HandleWeb: (payload) => {
        dispatch(HandleWeb(payload));
      },
      HandleVatDoc: (payload) => {
        dispatch(HandleVatDoc(payload));
      },
      HandleTin: (payload) => {
        dispatch(HandleTin(payload));
      },
      HandleQuotationDoc: (payload) => {
        dispatch(HandleQuotationDoc(payload));
      },
      HandlePhone: (payload) => {
        dispatch(HandlePhone(payload));
      },
      HandleNote: (payload) => {
        dispatch(HandleNote(payload));
      },
      HandleMailAdd: (payload) => {
        dispatch(HandleMailAdd(payload));
      },
      HandleEmail: (payload) => {
        dispatch(HandleEmail(payload));
      },
      HandleCodePrefix: (payload) => {
        dispatch(HandleCodePrefix(payload));
      },
      HandleMobile: (payload) => {
        dispatch(HandleMobile(payload));
      },
      HandleName: (payload) => {
        dispatch(HandleName(payload));
      },
      HandleRegistration: (payload) => {
        dispatch(HandleRegistration(payload));
      },
      HandleEditPermission: (payload) => {
        dispatch(HandleEditPermission(payload));
      },
    },
  };
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export { _Screen as Screen };
