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
  HandleHasEditPermission,
  HandleDataGridShouldReload,
  HandleFormMode,
  HandleFormOpen,
  HandleClient,
  HandleBillType,
  HandleFromDate,
  HandleToDate,
  HandleSummaryCode,
  HandleSubject,
  HandleList,
  ResetForm,
  HandleBillTypeList,
} from "../../../Global/Data/Actions/Private/BillSummary/BillSummary.Action";
import * as Form from "./Screen.Form";
import moment from "moment";

const Auth = APP.SERVICES.AUTH;

class Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * --------------------------------------------------------------------------
       * Core States
       */
      apiCalled: false,

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
    this.GetBillSummary = this.GetBillSummary.bind(this);
    this.GetBillList = this.GetBillList.bind(this);

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
    this.props.func.HandleFormMode(FormMode);
  }

  /**
   *
   */
  GetBillSummary() {
    this.__SetFAP("general", "Loading", "top", "center");
    this.setState({
      apiCalled: true,
    });
    axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/BillSummary/detail?summary_id=" +
          this.props.GlobalData.BillId,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          let $bill_summary = response.data.bill_summary_list;

          this.props.func.HandleClient(
            this.props.GlobalData.ClientList[
              this.props.GlobalData.ClientList.map((e) => e.id).indexOf(
                $bill_summary.client_id
              )
            ]);
          this.props.func.HandleBillType($bill_summary.bill_type);
          this.props.func.HandleFromDate( moment($bill_summary.from_date, "DD-MM-YYYY"));
          this.props.func.HandleToDate(
            $bill_summary.to_date ? moment($bill_summary.to_date, "DD-MM-YYYY") : null
          );
          this.props.func.HandleSummaryCode($bill_summary.summary_code);
          this.props.func.HandleSubject($bill_summary.subject);
          this.props.func.HandleHasEditPermission(
            $bill_summary.HasEditPermission
          );
          this.GetBillList(
            $bill_summary.client_id,
            $bill_summary.bill_type,
            $bill_summary.from_date,
            $bill_summary.to_date,
            $bill_summary
          );
        }
      })
      .catch((error) => {
        this.__RemoveFAP();
        this.setState({
          apiCalled: false,
        });
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

  GetBillList(cli, type, from = null, to = "", bill_summary) {
    const billList = JSON.parse(bill_summary.InvoiceList);
    axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/BillSummary/getBillList?client_id=" +
          cli +
          "&bill_type=" +
          type +
          "&from_date=" +
          from +
          "&to_date=" +
          to +
          "&bill_summary_id=" +
          bill_summary.summary_id,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          const tempArry = response.data.bill_summary_list.map((item) => {

            const temp = {
              ...item,
              bill_date: item.bill_date !== 'null' ? this.reformatDate(item.bill_date) : "",
              isSelected: item.valid === 0,
              isDisabled: item.valid === 0,
            };
            if (billList.includes(item.id)) {
              temp.isSelected = true;
            }
            return temp;
          });
          this.props.func.HandleList(tempArry);
          if (bill_summary.HasEditPermission === false) {
            this.props.func.HandleFormMode("VIEW");
          }
          this.setState({
            apiCalled: false,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 429) {
            Auth.remove(this.props);
          }

          if (error.response.status === 403) {
            new APP.SERVICES.UAP().Initialize();
          }
        } else {
          new APP.SERVICES.NETWORK_FAILURE().SetError();
        }
      });
  }

  reformatDate(date){
    const [yyyy, mm, dd, ] = date.split('-');
    return `${dd}/${mm}/${yyyy}`;
  }

  /**
   * Add a new User entry Or Update existing user's entry
   * @Mode: [ADD, EDIT]
   */
  handleSubmitForm() {
    const FormMode = this.props.GlobalData.FormMode;
    if (this.props.GlobalData.Client === "") {
      this.__SetFA("error", "Please select a client");
      return false;
    }
    if (this.props.GlobalData.BillType === "") {
      this.__SetFA("error", "Please select a bill type");
      return false;
    }
    if (this.props.GlobalData.FromDate === null) {
      this.__SetFA("error", "Please select a from date");
      return false;
    }

    this.__SetFAP("general", "Loading", "top", "center");
    const payload = {
      bill_type: this.props.GlobalData.BillType,
      client_id: this.props.GlobalData.Client.id,
      from_date: this.convertDate(this.props.GlobalData.FromDate),
      to_date: this.props.GlobalData.ToDate
        ? this.convertDate(this.props.GlobalData.ToDate)
        : "",
      summary_code: this.props.GlobalData.SummaryCode,
      subject: this.props.GlobalData.Subject,
      invoiceList: [],
    };

    let total = 0;
    this.props.GlobalData.BillList.forEach((bill) => {
      if (bill.isSelected && !bill.isDisabled) {
        payload.invoiceList.push(bill.id);
        total += parseFloat(bill.due_amount);
      }
    });

    payload['total_due'] = total;

    if (FormMode === "EDIT") {
      payload["summary_id"] = this.props.GlobalData.BillId;
    }

    axios
      .post(APP.ENV.URL.API.ROOT + "/company/BillSummary/save", payload, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.__SetFA("success", response.data.message);
          this.props.func.HandleDataGridShouldReload(true);

          if (FormMode === "ADD") {
            this.props.func.ClearForm();
          } else {
            setTimeout(() => {
              this.handleCloseDialog();
            }, 1000);
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

  convertDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
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
        this.props.GlobalData.FormMode === "PRINT" ||
        this.props.GlobalData.FormMode === "VIEW"
      ) {
        this.GetBillSummary();
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
              ? "Add New Bill Summary"
              : this.props.GlobalData.FormMode === "EDIT"
              ? "Edit Bill Summary"
              : this.props.GlobalData.FormMode === "VIEW"
              ? "Bill Summary"
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GlobalData: state.BillSummary,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    func: {
      ClearForm: () => {
        dispatch(ResetForm());
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
      HandleClient: (payload) => {
        dispatch(HandleClient(payload));
      },
      HandleBillType: (payload) => {
        dispatch(HandleBillType(payload));
      },
      HandleFromDate: (payload) => {
        dispatch(HandleFromDate(payload));
      },
      HandleToDate: (payload) => {
        dispatch(HandleToDate(payload));
      },
      HandleSummaryCode: (payload) => {
        dispatch(HandleSummaryCode(payload));
      },
      HandleSubject: (payload) => {
        dispatch(HandleSubject(payload));
      },
      HandleList: (payload) => {
        dispatch(HandleList(payload));
      },

      HandleBillTypeList: (payload) => {
        dispatch(HandleBillTypeList(payload));
      },
    },
  };
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export { _Screen as Screen };
