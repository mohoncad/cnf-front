import React, { Component } from "react";
import { batch, connect } from "react-redux";
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
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
  HandleCode,
  HandleDataGridShouldReload,
  HandleFormMode,
  HandleFormOpen,
  HandleAddress,
  HandleEmail,
  HandlePhone,
  HandleStatus,
  HandleName,
  HandleBillId,
  ResetForm,
  HandleDocumentList,
  HandleChargeCategory,
  HandleChargeHead,
  HandleClient,
  HandleClientAddress,
  HandleBillCode,
  HandleDate,
  HandleClientBank,
  HandleSupplier,
  HandleDescription,
  HandleNote,
  HandleIsPaid,
  HandleDocList,
  HandleInvoiceNo,
  HandleLCNo,
  HandleMAWB,
  HandleHAWB,
  HandleCurrency,
  HandleCurrencyRate,
  HandleInvoiceValue,
  HandleGrossWeight,
  HandleNetWeight,
  HandleUnit,
  HandleQuantity,
  HandleCarrier,
  HandlePort,
  HandleCommodity,
  HandleAValue,
  HandleInvoiceDate,
  HandleLCDate,
  HandleBENo,
  HandleBEDate,
  HandleMAWBDate,
  HandleHAWBDate,
  HandleParticulars,
  HandleParticularTotalAmount,
  HandleParticularDueAmount,
  HandleParticularPaidAmount,
  HandleAttachment,
  HandleFetchAttachment,
  HandleCurrencyList,
  HandlePortList,
  HandleUnitList,
  HandleBankList,
  HandleClientList,
  HandleSupplierList,
} from "../../../Global/Data/Actions/Private/ImportBill/ImportBill.Action";

import {
  HandleName as HandleCompanyName,
  HandlePhone as HandleCompanyPhone,
  HandleEmail as HandleCompanyEmail,
  HandleSite as HandleCompanySite,
  HandleAddress as HandleCompanyAddress,
  HandleLogo,
} from "../../../Global/Data/Actions/Private/Company/Company.Action";
import * as Form from "./Screen.Form";
import * as ViewForm from "./Screen.ViewForm";
import moment from "moment";

const Auth = APP.SERVICES.AUTH;
const noLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwSGGfwg7rhSagWK4LfDiAqhLq70ljOTKzg&usqp=CAU";

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

      apiCalled: false,
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
    // this.GetDocumentList = this.GetDocumentList.bind(this);

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.handleAddDoc = this.handleAddDoc.bind(this);
    this.handleRemoveDoc = this.handleRemoveDoc.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleRemoveCategory = this.handleRemoveCategory.bind(this);
    this.handleAddHead = this.handleAddHead.bind(this);
    this.handleRemoveHead = this.handleRemoveHead.bind(this);
    this.GetAllInfo = this.GetAllInfo.bind(this);
    this.GetUnit = this.GetUnit.bind(this);
    this.GetCurrency = this.GetCurrency.bind(this);
    this.GetPort = this.GetPort.bind(this);
    this.GetBank = this.GetBank.bind(this);
    this.GetSupplier = this.GetSupplier.bind(this);
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
    // this.setState({ FormMode },() => {});
  }

  async GetBillDetails() {
    this.setState({
      apiCalled: true,
    });
    // this.__SetFAP("general", "Loading", "top", "center");

    try {
      const response = await axios.get(
        APP.ENV.URL.API.ROOT +
          "/company/import/detail?id=" +
          this.props.GlobalData.BillID,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      );

      if (response.data.success) {
        let $billDetail = response.data.import_bill_list;

        batch(() => {
          this.props.func.HandleIsPaid($billDetail.full_paid === 1);
          this.props.func.HandleBillCode($billDetail.bill_code);
          this.props.func.HandleDate(
            moment($billDetail.bill_date, "YYYY-MM-DD")
          );
          this.props.func.HandleClientBank(this.props.GlobalData.BankList[
              this.props.GlobalData.BankList.map((e) => e.id).indexOf(
                $billDetail.client_bank_name
              )
            ]);
          this.props.func.HandleSupplier(this.props.GlobalData.SupplierList[
            this.props.GlobalData.SupplierList.map((e) => e.id).indexOf(
              $billDetail.supplier_id
            )
          ]);
          this.props.func.HandleClient(
            this.props.GlobalData.ClientList[
              this.props.GlobalData.ClientList.map((e) => e.id).indexOf(
                $billDetail.client_id
              )
            ]);
          this.props.func.HandleClientAddress($billDetail.client_address);
          this.props.func.HandleDescription($billDetail.goods_description);
          this.props.func.HandleNote($billDetail.bill_note);
          this.props.func.HandleDocList(
            $billDetail.enc_docs === "enc_docs"
              ? []
              : JSON.parse($billDetail.enc_docs)
          );
          this.props.func.HandleLCNo($billDetail.lc_no);
          if ($billDetail.lc_date !== "null") {
            this.props.func.HandleLCDate(
              moment($billDetail.lc_date, "DD-MM-YYYY")
            );
          } else {
            this.props.func.HandleLCDate(null);
          }
          this.props.func.HandleBENo($billDetail.be_no);

          if ($billDetail.be_date !== "null") {
            this.props.func.HandleBEDate(
              moment($billDetail.be_date, "DD-MM-YYYY")
            );
          } else {
            this.props.func.HandleBEDate(null);
          }

          this.props.func.HandleInvoiceNo($billDetail.invoice_no);

          if ($billDetail.invoice_date !== "null") {
            this.props.func.HandleInvoiceDate(
              moment($billDetail.invoice_date, "DD-MM-YYYY")
            );
          } else {
            this.props.func.HandleInvoiceDate(null);
          }

          this.props.func.HandleCurrency(
            $billDetail.currency_id === 0 ? null :
            this.props.GlobalData.CurrencyList[
              this.props.GlobalData.CurrencyList.map((e) => e.id).indexOf(
                $billDetail.currency_id
              )
            ]
          );
          this.props.func.HandleCurrencyRate($billDetail.currency_rate);
          this.props.func.HandleInvoiceValue($billDetail.invoice_value);
          this.props.func.HandleGrossWeight($billDetail.gross_weight);
          this.props.func.HandleNetWeight($billDetail.net_weight);
          this.props.func.HandleUnit(
            $billDetail.unit_id === 0 ? null :
            this.props.GlobalData.UnitList[
              this.props.GlobalData.UnitList.map((e) => e.id).indexOf(
                $billDetail.unit_id
              )
            ]
          );
          this.props.func.HandleQuantity($billDetail.quantity);
          this.props.func.HandleCarrier($billDetail.carrier);
          this.props.func.HandlePort(
            $billDetail.port_id === 0 ? null :
            this.props.GlobalData.PortList[
              this.props.GlobalData.PortList.map((e) => e.id).indexOf(
                $billDetail.port_id
              )
            ]
          );
          this.props.func.HandleCommodity($billDetail.commodity);
          this.props.func.HandleAValue($billDetail.a_value);
          this.props.func.HandleMAWB($billDetail.mawb_no);

          if ($billDetail.mawb_date !== "null") {
            this.props.func.HandleMAWBDate(
              moment($billDetail.mawb_date, "DD-MM-YYYY")
            );
          } else {
            this.props.func.HandleMAWBDate(null);
          }

          this.props.func.HandleHAWB($billDetail.hawb_no);
          if ($billDetail.hawb_date !== "null") {
            this.props.func.HandleHAWBDate(
              moment($billDetail.hawb_date, "DD-MM-YYYY")
            );
          } else {
            this.props.func.HandleHAWBDate(null);
          }

          this.props.func.HandleParticulars(
            $billDetail.particulars_charges === "particulars_charges"
              ? []
              : JSON.parse($billDetail.particulars_charges)
          );
          this.props.func.HandleParticularTotalAmount($billDetail.total_amount);
          this.props.func.HandleParticularPaidAmount($billDetail.paid_amount);
          this.props.func.HandleParticularDueAmount($billDetail.due_amount);
          this.props.func.HandleFetchAttachment(
            $billDetail.attachments === "attachments"
              ? []
              : JSON.parse($billDetail.attachments)
          );
          this.props.func.HandleHasEditPermission(
            $billDetail.HasEditPermission
          );

          if ($billDetail.HasEditPermission === false) {
            this.props.func.HandleFormMode("VIEW");
          }
        });

        this.setState({
          apiCalled: false,
        });
        this.__RemoveFAP();
      }
    } catch (error) {
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
    }
  }
  /**
   * Add a new User entry Or Update existing user's entry
   * @Mode: [ADD, EDIT]
   */
  async handleSubmitForm() {
    const FormMode = this.props.GlobalData.FormMode;
    if (FormMode === "ADD" || FormMode === "EDIT") {
      if (this.props.GlobalData.BillInfo.Client === "") {
        this.__SetFA("error", "Client is required");
        return false;
      }
      if (this.props.GlobalData.BillInfo.Date === null) {
        this.__SetFA("error", "Bill date is required");
        return false;
      }
      if (this.props.GlobalData.BillInfo.ClientBank === "") {
        this.__SetFA("error", "Client Bank is required");
        return false;
      }
      if (this.props.GlobalData.BillInfo.Supplier === "") {
        this.__SetFA("error", "Supplier is required");
        return false;
      }
      if (this.props.GlobalData.JobDetails.a_value === "") {
        this.__SetFA("error", "Assesable value is required");
        return false;
      }
    }

    this.__SetFAP("general", "Loading", "top", "center");
    
    const formData = new FormData();
    if (FormMode === "EDIT") {
      formData.append("id", this.props.GlobalData.BillID);
    }
    formData.append("bill_type", "Import");
    formData.append(
      "bill_date",
      this.convertDate(this.props.GlobalData.BillInfo.Date)
    );
    formData.append("bill_code", this.props.GlobalData.BillInfo.BillCode);
    formData.append("client_id", this.props.GlobalData.BillInfo.Client.id);
    formData.append(
      "client_address",
      this.props.GlobalData.BillInfo.ClientAddress
    );
    formData.append("supplier_id", this.props.GlobalData.BillInfo.Supplier ? this.props.GlobalData.BillInfo.Supplier.id : null);
    formData.append(
      "client_bank_name",
      this.props.GlobalData.BillInfo.ClientBank ? this.props.GlobalData.BillInfo.ClientBank.id : null
    );
    formData.append(
      "goods_description",
      this.props.GlobalData.BillInfo.Description
    );
    formData.append("bill_note", this.props.GlobalData.BillInfo.Note);
    formData.append(
      "enc_docs",
      JSON.stringify(this.props.GlobalData.BillInfo.DocList)
    );

    formData.append("invoice_no", this.props.GlobalData.JobDetails.invoice_no);
    formData.append(
      "invoice_date",
      this.convertDate(this.props.GlobalData.JobDetails.invoice_date)
    );
    formData.append("lc_no", this.props.GlobalData.JobDetails.lc_no);
    formData.append(
      "lc_date",
      this.convertDate(this.props.GlobalData.JobDetails.lc_date)
    );
    formData.append("be_no", this.props.GlobalData.JobDetails.be_no);
    formData.append(
      "be_date",
      this.convertDate(this.props.GlobalData.JobDetails.be_date)
    );
    formData.append("mawb_no", this.props.GlobalData.JobDetails.mawb_no);
    formData.append(
      "mawb_date",
      this.convertDate(this.props.GlobalData.JobDetails.mawb_date)
    );
    formData.append("hawb_no", this.props.GlobalData.JobDetails.hawb_no);
    formData.append(
      "hawb_date",
      this.convertDate(this.props.GlobalData.JobDetails.hawb_date)
    );
    formData.append(
      "currency_id",
      this.props.GlobalData.JobDetails.currency_id ? this.props.GlobalData.JobDetails.currency_id.id : 0
    );
    formData.append(
      "currency_rate",
      this.props.GlobalData.JobDetails.currency_rate
    );
    formData.append(
      "invoice_value",
      this.props.GlobalData.JobDetails.invoice_value
    );
    formData.append(
      "gross_weight",
      this.props.GlobalData.JobDetails.gross_weight
    );
    formData.append("net_weight", this.props.GlobalData.JobDetails.net_weight);
    formData.append("unit_id", this.props.GlobalData.JobDetails.unit_id ? this.props.GlobalData.JobDetails.unit_id.id : 0);
    formData.append("quantity", this.props.GlobalData.JobDetails.quantity);
    formData.append("carrier", this.props.GlobalData.JobDetails.carrier);
    formData.append("port_id", 
    this.props.GlobalData.JobDetails.port_id ? this.props.GlobalData.JobDetails.port_id.id : 0);
    formData.append("commodity", this.props.GlobalData.JobDetails.commodity);
    formData.append("a_value", this.props.GlobalData.JobDetails.a_value);

    formData.append(
      "particulars_charges",
      JSON.stringify(this.props.GlobalData.Particulars.particulars_charges)
    );
    formData.append(
      "total_amount",
      this.props.GlobalData.Particulars.totalAmount
    );
    formData.append(
      "paid_amount",
      this.props.GlobalData.Particulars.paidAmount
    );
    formData.append("due_amount", this.props.GlobalData.Particulars.dueAmount);
    this.props.GlobalData.Attachment.map((item) =>
      formData.append("attachment[]", item)
    );

    await axios
      .post(APP.ENV.URL.API.ROOT + "/company/import/save", formData, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.__SetFA("success", response.data.message);
          
          this.props.func.HandleDataGridShouldReload(true);
          if (FormMode === "ADD") {
            setTimeout(() => {
              this.props.func.ClearForm();
            }, 1000);
            // this.props.func.HandleFormOpen(true);
            // this.props.func.HandleFormMode("ADD");
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
          if (error.response.status === 500) {
            this.__SetFA("error", "Please check your data");
          }
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
    if (date === null) return null;
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }

  handleAddDoc(value) {
    const payload = {
      doc_name: value,
    };
    axios
      .post(
        APP.ENV.URL.API.ROOT + "/company/import/addDocumentDropDown",
        payload,
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
          this.props.func.HandleDocumentList(response.data.document_dropdown);
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
  handleRemoveDoc(id) {
    axios
      .delete(APP.ENV.URL.API.ROOT + "/company/import/deleteDocumentDropDown", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        data: {
          id: id,
        },
      })
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.__SetFA("success", response.data.message);
          this.props.func.HandleDocumentList(response.data.document_dropdown);
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

  handleAddCategory(value) {
    const payload = {
      category_name: value,
    };
    axios
      .post(
        APP.ENV.URL.API.ROOT + "/company/import/addChargeCategoryDropDown",
        payload,
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
          this.props.func.HandleChargeCategory(response.data.charge_category);
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
  handleRemoveCategory(id) {
    axios
      .delete(
        APP.ENV.URL.API.ROOT + "/company/import/deleteChargeCategoryDropDown",
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
          data: {
            id: id,
          },
        }
      )
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.__SetFA("success", response.data.message);
          this.props.func.HandleChargeCategory(response.data.charge_category);
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

  handleAddHead(value) {
    const payload = {
      head_name: value,
    };
    axios
      .post(
        APP.ENV.URL.API.ROOT + "/company/import/addChargeHeadDropDown",
        payload,
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
          this.props.func.HandleChargeHead(response.data.charge_head);
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
  handleRemoveHead(id) {
    axios
      .delete(
        APP.ENV.URL.API.ROOT + "/company/import/deleteChargeHeadDropDown",
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
          data: {
            id: id,
          },
        }
      )
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          this.__SetFA("success", response.data.message);
          this.props.func.HandleChargeHead(response.data.charge_head);
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

  async GetUnit() {
    this.__SetFAP("general", "Loading", "top", "center");
    await axios
      .get(APP.ENV.URL.API.ROOT + "/company/unit/free_list", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          this.props.func.HandleUnitList(res.data.units);
        }
        this.__RemoveFAP();
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
  async GetPort() {
    this.__SetFAP("general", "Loading", "top", "center");
    await axios
      .get(APP.ENV.URL.API.ROOT + "/company/ports", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((port) => {
        if (port.data.success) {
          this.props.func.HandlePortList(port.data.ports);
        }
        this.__RemoveFAP();
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
  async GetCurrency() {
    this.__SetFAP("general", "Loading", "top", "center");
    await axios
      .get(APP.ENV.URL.API.ROOT + "/company/currency/free_list", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((currency) => {
        if (currency.data.success) {
          this.props.func.HandleCurrencyList(currency.data.currencies);
        }
        this.__RemoveFAP();
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
  async GetBank() {
    this.__SetFAP("general", "Loading", "top", "center");
    await axios
      .get(APP.ENV.URL.API.ROOT + "/company/banks/free_list", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((bank) => {
        if (bank.data.success) {
          this.props.func.HandleBankList(bank.data.bank_list);
        }
        this.__RemoveFAP();
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
  async GetSupplier() {
    this.__SetFAP("general", "Loading", "top", "center");
    await axios
      .get(APP.ENV.URL.API.ROOT + "/company/suppliers/free_list", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      })
      .then((suuplier) => {
        if (suuplier.data.success) {
          this.props.func.HandleSupplierList(
            suuplier.data.supplier_list
          );
        }
        this.__RemoveFAP();
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
  GetAllInfo() {
    this.__SetFAP("general", "Loading", "top", "center");
    const company_id = new APP.SERVICES.SessionUser(this.props).GetProfile()
      .CompanyID;
    const company = axios.get(
      APP.ENV.URL.API.ROOT + "/company/detail?id=" + company_id,
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    const docList = axios.get(
      APP.ENV.URL.API.ROOT + "/company/import/getDocumentDropDown",
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    const bankList = axios.get(
      APP.ENV.URL.API.ROOT + "/company/banks/free_list",
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    const currencyList = axios.get(
      APP.ENV.URL.API.ROOT + "/company/currency/free_list",
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    const portList = axios.get(APP.ENV.URL.API.ROOT + "/company/ports", {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    const unitList = axios.get(
      APP.ENV.URL.API.ROOT + "/company/unit/free_list",
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    const chargeCate = axios.get(
      APP.ENV.URL.API.ROOT + "/company/import/getChargeCategoryDropDown",
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    const chargeHead = axios.get(
      APP.ENV.URL.API.ROOT + "/company/import/getChargeHeadDropDown",
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    const client = axios.get(
      APP.ENV.URL.API.ROOT + "/company/clients/free_list",
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    const supply = axios.get(
      APP.ENV.URL.API.ROOT + "/company/suppliers/free_list",
      {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      }
    );

    Promise.all([
      docList,
      bankList,
      currencyList,
      portList,
      unitList,
      chargeCate,
      chargeHead,
      company,
      client,
      supply,
    ])
      .then((res) => {
        const [
          doc,
          bank,
          currency,
          port,
          unit,
          chargeCat,
          chargeHead,
          company,
          tempClientList,
          tempSupplyList,
        ] = res;
        batch(() => {
          if (doc.data.success) {
            this.props.func.HandleDocumentList(doc.data.document_dropdown_list);
          }
          if (bank.data.success) {
            this.props.func.HandleBankList(bank.data.bank_list);
          }
          if (currency.data.success) {
            this.props.func.HandleCurrencyList(currency.data.currencies);
          }
          if (port.data.success) {
            this.props.func.HandlePortList(port.data.ports);
          }
          if (unit.data.success) {
            this.props.func.HandleUnitList(unit.data.units);
          }

          if (chargeCat.data.success) {
            this.props.func.HandleChargeCategory(
              chargeCat.data.charge_categories_dropdown_list
            );
          }
          if (chargeHead.data.success) {
            this.props.func.HandleChargeHead(
              chargeHead.data.charge_heads_dropdown_list
            );
          }
          if (company.data.success) {
            this.props.func.HandleCompanyName(company.data.company.Name);
            this.props.func.HandleCompanyPhone(
              company.data.company.ContactNumber
            );
            this.props.func.HandleCompanyEmail(company.data.company.Email);
            this.props.func.HandleCompanySite(company.data.company.WebAddress);
            this.props.func.HandleCompanyAddress(company.data.company.Address1);
            this.props.func.HandleCompanyLogo(
              company.data.company.Logo ? company.data.company.Logo : noLogo
            );
          }

          if (tempClientList.data.success) {
            this.props.func.HandleClientList(tempClientList.data.client_list);
          }

          if (tempSupplyList.data.success) {
            this.props.func.HandleSupplierList(
              tempSupplyList.data.supplier_list
            );
          }

          if (
            this.props.GlobalData.FormMode === "EDIT" ||
            this.props.GlobalData.FormMode === "VIEW" ||
            this.props.GlobalData.FormMode === "PRINT"
          ) {
            this.GetBillDetails();
          } else {
            this.__RemoveFAP();
          }
        });
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

  componentDidMount() {
    this.GetAllInfo();
    document.addEventListener("keydown", this.keyDownHandler);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.GlobalData.FormOpen !== this.props.GlobalData.FormOpen &&
      this.props.GlobalData.FormOpen === true
    ) {
      if (
        this.props.GlobalData.FormMode === "EDIT" ||
        this.props.GlobalData.FormMode === "VIEW" ||
        this.props.GlobalData.FormMode === "PRINT"
      ) {
        this.GetAllInfo();
        // this.GetBillDetails();
      }
      if (
        this.props.GlobalData.FormMode === "ADD" ||
        this.props.GlobalData.FormMode === "EDIT" ||
        this.props.GlobalData.FormMode === "VIEW" ||
        this.props.GlobalData.FormMode === "PRINT"
      ) {
        this.GetAllInfo();
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
              ? "Add New Import Bill"
              : this.props.GlobalData.FormMode === "EDIT"
              ? "Edit Import Bill"
              : this.props.GlobalData.FormMode === "VIEW"
              ? "Import Bill"
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
          {this.props.GlobalData.FormMode === "VIEW" ||
          this.props.GlobalData.FormMode === "PRINT" ? (
            !this.state.apiCalled ? (
              <ViewForm.Screen onEdit={this.handleUpdateFormMode} />
            ) : (
              ""
            )
          ) : (
            <Form.Screen
              onAddDocList={this.handleAddDoc}
              onRemoveDocList={this.handleRemoveDoc}
              onAddCategory={this.handleAddCategory}
              onRemoveCategory={this.handleRemoveCategory}
              onAddHead={this.handleAddHead}
              onRemoveHead={this.handleRemoveHead}
              onUnitListReloadCommand={this.GetUnit}
              onCurrencyListReloadCommand={this.GetCurrency}
              onBankListReloadCommand={this.GetBank}
              onSupplierListReloadCommand={this.GetSupplier}
              onPortListReloadCommand={this.GetPort}
              
            />
          )}
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
    GlobalData: state.ImportBill,
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
      HandleHasEditPermission: (value) => {
        dispatch(HandleHasEditPermission(value));
      },
      HandleIsPaid: (payload) => {
        dispatch(HandleIsPaid(payload));
      },
      HandleBillId: (payload) => {
        dispatch(HandleBillId(payload));
      },
      HandleDocumentList: (payload) => {
        dispatch(HandleDocumentList(payload));
      },
      HandleBankList: (payload) => {
        dispatch(HandleBankList(payload));
      },
      HandleCurrencyList: (payload) => {
        dispatch(HandleCurrencyList(payload));
      },
      HandlePortList: (payload) => {
        dispatch(HandlePortList(payload));
      },
      HandleClientList: (payload) => {
        dispatch(HandleClientList(payload));
      },
      HandleSupplierList: (payload) => {
        dispatch(HandleSupplierList(payload));
      },
      HandleUnitList: (payload) => {
        dispatch(HandleUnitList(payload));
      },
      HandleChargeCategory: (payload) => {
        dispatch(HandleChargeCategory(payload));
      },
      HandleChargeHead: (payload) => {
        dispatch(HandleChargeHead(payload));
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
      HandleClient: (payload) => {
        dispatch(HandleClient(payload));
      },
      HandleClientAddress: (payload) => {
        dispatch(HandleClientAddress(payload));
      },
      HandleBillCode: (payload) => {
        dispatch(HandleBillCode(payload));
      },
      HandleDate: (payload) => {
        dispatch(HandleDate(payload));
      },
      HandleClientBank: (payload) => {
        dispatch(HandleClientBank(payload));
      },
      HandleSupplier: (payload) => {
        dispatch(HandleSupplier(payload));
      },
      HandleDescription: (payload) => {
        dispatch(HandleDescription(payload));
      },
      HandleNote: (payload) => {
        dispatch(HandleNote(payload));
      },
      HandleDocList: (payload) => {
        dispatch(HandleDocList(payload));
      },
      HandleInvoiceNo: (payload) => {
        dispatch(HandleInvoiceNo(payload));
      },
      HandleInvoiceDate: (payload) => {
        dispatch(HandleInvoiceDate(payload));
      },
      HandleLCNo: (payload) => {
        dispatch(HandleLCNo(payload));
      },
      HandleLCDate: (payload) => {
        dispatch(HandleLCDate(payload));
      },
      HandleBENo: (payload) => {
        dispatch(HandleBENo(payload));
      },
      HandleBEDate: (payload) => {
        dispatch(HandleBEDate(payload));
      },
      HandleMAWB: (payload) => {
        dispatch(HandleMAWB(payload));
      },
      HandleMAWBDate: (payload) => {
        dispatch(HandleMAWBDate(payload));
      },
      HandleHAWB: (payload) => {
        dispatch(HandleHAWB(payload));
      },
      HandleHAWBDate: (payload) => {
        dispatch(HandleHAWBDate(payload));
      },
      HandleCurrency: (payload) => {
        dispatch(HandleCurrency(payload));
      },
      HandleCurrencyRate: (payload) => {
        dispatch(HandleCurrencyRate(payload));
      },

      HandleInvoiceValue: (payload) => {
        dispatch(HandleInvoiceValue(payload));
      },
      HandleGrossWeight: (payload) => {
        dispatch(HandleGrossWeight(payload));
      },
      HandleNetWeight: (payload) => {
        dispatch(HandleNetWeight(payload));
      },
      HandleUnit: (payload) => {
        dispatch(HandleUnit(payload));
      },
      HandleQuantity: (payload) => {
        dispatch(HandleQuantity(payload));
      },
      HandleCarrier: (payload) => {
        dispatch(HandleCarrier(payload));
      },
      HandlePort: (payload) => {
        dispatch(HandlePort(payload));
      },
      HandleCommodity: (payload) => {
        dispatch(HandleCommodity(payload));
      },
      HandleAValue: (payload) => {
        dispatch(HandleAValue(payload));
      },
      HandleParticulars: (payload) => {
        dispatch(HandleParticulars(payload));
      },
      HandleParticularTotalAmount: (payload) => {
        dispatch(HandleParticularTotalAmount(payload));
      },
      HandleParticularPaidAmount: (payload) => {
        dispatch(HandleParticularPaidAmount(payload));
      },
      HandleParticularDueAmount: (payload) => {
        dispatch(HandleParticularDueAmount(payload));
      },
      HandleAttachment: (payload) => {
        dispatch(HandleAttachment(payload));
      },
      HandleFetchAttachment: (payload) => {
        dispatch(HandleFetchAttachment(payload));
      },

      HandleCompanyName: (value) => {
        dispatch(HandleCompanyName(value));
      },
      HandleCompanyPhone: (value) => {
        dispatch(HandleCompanyPhone(value));
      },
      HandleCompanyEmail: (value) => {
        dispatch(HandleCompanyEmail(value));
      },
      HandleCompanySite: (value) => {
        dispatch(HandleCompanySite(value));
      },
      HandleCompanyAddress: (value) => {
        dispatch(HandleCompanyAddress(value));
      },
      HandleCompanyLogo: (value) => {
        dispatch(HandleLogo(value));
      },
    },
  };
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export { _Screen as Screen };
