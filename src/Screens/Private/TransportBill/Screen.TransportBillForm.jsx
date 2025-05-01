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
  HandleChargeHead,
  ResetForm,
  HandleHasEditPermission,
  HandleTransportId,
  HandleDataGridShouldReload,
  HandleFormMode,
  HandleFormOpen,
  HandleClientAddress,
  HandleAWBNo,
  HandleBEDate,
  HandleBENo,
  HandleClient,
  HandleBillCode,
  HandleBillDate,
  HandleDeliverNo,
  HandleDeliverDate,
  HandleTransportNo,
  HandleTransportDate,
  HandleLCNo,
  HandleLCDate,
  HandleHoldingNo,
  HandleHoldingDate,
  HandleJobNo,
  HandleJobDate,
  HandleUnit,
  HandleQuantity,
  HandleDescription,
  HandleTransportType,
  HandleVehicleNo,
  HandleDriverName,
  HandleFrom,
  HandleTo,
  HandleParticulars,
  HandleParticularTotalAmount,
  HandleParticularPaidAmount,
  HandleParticularDueAmount,
  HandleUnitList,
  HandleTransportList,
  HandleLocationList,
} from "../../../Global/Data/Actions/Private/TransportBill/TransportBill.Action";
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
const noLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxwSGGfwg7rhSagWK4LfDiAqhLq70ljOTKzg&usqp=CAU";
const Auth = APP.SERVICES.AUTH;
const unitList = axios.get(APP.ENV.URL.API.ROOT + "/company/unit/free_list", {
  headers: {
    Authorization: `Bearer ${Auth.getToken()}`,
  },
});

const chargeHead = axios.get(
  APP.ENV.URL.API.ROOT + "/company/transport/getChargeHeadDropDown",
  {
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  }
);
// const transportType = axios.get(
//   APP.ENV.URL.API.ROOT + "/company/transport/getTransportTypeDropDown",
//   {
//     headers: {
//       Authorization: `Bearer ${Auth.getToken()}`,
//     },
//   }
// );
// const locationList = axios.get(
//   APP.ENV.URL.API.ROOT + "/company/transport/getLocationDropDown",
//   {
//     headers: {
//       Authorization: `Bearer ${Auth.getToken()}`,
//     },
//   }
// );

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
    this.GetTransportDetail = this.GetTransportDetail.bind(this);

    this.keyDownHandler = this.keyDownHandler.bind(this);

    this.handleAddHead = this.handleAddHead.bind(this);
    this.handleRemoveHead = this.handleRemoveHead.bind(this);
    this.GetUnit = this.GetUnit.bind(this);
    this.GetAllInfo = this.GetAllInfo.bind(this);
    this.onAddTransportType = this.onAddTransportType.bind(this);
    this.onRemoveTransportType = this.onRemoveTransportType.bind(this);
    this.onAddLocation = this.onAddLocation.bind(this);
    this.onRemoveLocation = this.onRemoveLocation.bind(this);
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

  handleUpdateFormMode(FormMode) {
    this.props.func.HandleFormMode(FormMode);
    // this.setState({ FormMode },() => {});
  }
  ValidateEmail(email) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  ValidatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phone));
  }

  /**
   *
   */
  GetTransportDetail() {
    this.__SetFAP("general", "Loading", "top", "center");
    this.setState({
      apiCalled: true,
    });
    axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/transport/detail?bill_id=" +
          this.props.GlobalData.TransportId,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        this.__RemoveFAP();

        if (response.data.success) {
          let $transport = response.data.transport;

          batch(() => {
            this.props.func.HandleTransportId($transport.bill_id);
            this.props.func.HandleClient(
              this.props.GlobalData.ClientList[
                this.props.GlobalData.ClientList.map((e) => e.id).indexOf(
                  $transport.client_id
                )
              ]);
            const addres =
              this.props.GlobalData.ClientList[
                this.props.GlobalData.ClientList.map((e) => e.id).indexOf(
                  $transport.client_id
                )
              ].MailingAddess;

            this.props.func.HandleClientAddress(addres);
            this.props.func.HandleAWBNo($transport.awb_no);

            if ($transport.be_date !== "") {
              this.props.func.HandleBEDate(
                moment($transport.be_date, "DD-MM-YYYY")
              );
            } else {
              this.props.func.HandleBEDate(null);
            }

            this.props.func.HandleBENo($transport.be_no);
            this.props.func.HandleBillCode($transport.bill_code);

            if ($transport.bill_date !== "") {
              this.props.func.HandleBillDate(
                moment($transport.bill_date, "YYYY-MM-DD")
              );
            } else {
              this.props.func.HandleBillDate(null);
            }

            this.props.func.HandleDeliverNo($transport.delivery_challan_no);

            if ($transport.delivery_challan_date !== "") {
              this.props.func.HandleDeliverDate(
                moment($transport.delivery_challan_date, "DD-MM-YYYY")
              );
            } else {
              this.props.func.HandleDeliverDate(null);
            }
            this.props.func.HandleTransportNo($transport.transport_challan_no);

            if ($transport.transport_challan_date !== "") {
              this.props.func.HandleTransportDate(
                moment($transport.transport_challan_date, "DD-MM-YYYY")
              );
            } else {
              this.props.func.HandleTransportDate(null);
            }
            this.props.func.HandleLCNo($transport.lc_no);

            if ($transport.lc_date !== "") {
              this.props.func.HandleLCDate(
                moment($transport.lc_date, "DD-MM-YYYY")
              );
            } else {
              this.props.func.HandleLCDate(null);
            }
            this.props.func.HandleHoldingNo($transport.holding_no);

            if ($transport.holding_date !== "") {
              this.props.func.HandleHoldingDate(
                moment($transport.holding_date, "DD-MM-YYYY")
              );
            } else {
              this.props.func.HandleHoldingDate(null);
            }
            this.props.func.HandleJobNo($transport.job_no);
            if ($transport.job_date !== "") {
              this.props.func.HandleJobDate(
                moment($transport.job_date, "DD-MM-YYYY")
              );
            } else {
              this.props.func.HandleJobDate(null);
            }
            this.props.func.HandleUnit(
              $transport.unit_id === 0 ? null :
              this.props.GlobalData.UnitList[
                this.props.GlobalData.UnitList.map((e) => e.id).indexOf(
                  $transport.unit_id
                )
              ]
            );
            this.props.func.HandleQuantity($transport.quantity);
            this.props.func.HandleDescription($transport.description);

            this.props.func.HandleTransportType(this.props.GlobalData.TransportTypeList[
                this.props.GlobalData.TransportTypeList.map((e) => e.vehicle_name).indexOf(
                  $transport.transport_type
                )
              ]);

            this.props.func.HandleVehicleNo($transport.vehicle_reg_no);
            this.props.func.HandleDriverName($transport.driver_name);
            this.props.func.HandleFrom(this.props.GlobalData.LocationList[
              this.props.GlobalData.LocationList.map((e) => e.location_name).indexOf(
                $transport.from_place
              )
            ]);

            this.props.func.HandleTo(this.props.GlobalData.LocationList[
              this.props.GlobalData.LocationList.map((e) => e.location_name).indexOf(
                $transport.to_place
              )
            ]);
            this.props.func.HandleParticulars(
              JSON.parse($transport.particulars_charges)
            );
            this.props.func.HandleParticularTotalAmount(
              $transport.total_amount
            );
            this.props.func.HandleParticularPaidAmount($transport.paid_amount);
            this.props.func.HandleParticularDueAmount($transport.due_amount);

            if ($transport.HasEditPermission === false) {
              this.props.func.HandleFormMode("VIEW");
            }
            this.setState({
              apiCalled: false,
            });
          });
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
    if (FormMode === "ADD" || FormMode === "EDIT") { 
      if (this.props.GlobalData.BillInfo.BillCode === "") {
        this.__SetFA("error", "Bill Code is required");
        return false;
      }
  
      if (this.props.GlobalData.BillInfo.BillDate === null) {
        this.__SetFA("error", "Bill Date is required");
        return false;
      }
    }


    this.__SetFAP("general", "Loading", "top", "center");
    const payload = {
      bill_date: this.convertDate(this.props.GlobalData.BillInfo.BillDate),
      bill_code: this.props.GlobalData.BillInfo.BillCode,
      client_id: this.props.GlobalData.BillInfo.Client.id,
      client_address: this.props.GlobalData.BillInfo.ClientAddress,
      delivery_challan_no: this.props.GlobalData.BillInfo.DeliveryChallanNo,
      delivery_challan_date: this.convertDate(
        this.props.GlobalData.BillInfo.DeliveryDate
      ),
      transport_challan_no: this.props.GlobalData.BillInfo.TransportChallanNo,
      transport_challan_date: this.convertDate(
        this.props.GlobalData.BillInfo.TransportDate
      ),
      lc_no: this.props.GlobalData.BillInfo.lc_no,
      lc_date: this.convertDate(this.props.GlobalData.BillInfo.lc_date),
      be_no: this.props.GlobalData.BillInfo.be_no,
      be_date: this.convertDate(this.props.GlobalData.BillInfo.be_date),
      holding_no: this.props.GlobalData.BillInfo.holding_no,
      holding_date: this.convertDate(
        this.props.GlobalData.BillInfo.holding_date
      ),
      job_no: this.props.GlobalData.BillInfo.job_no,
      job_date: this.convertDate(this.props.GlobalData.BillInfo.job_date),
      awb_no: this.props.GlobalData.BillInfo.awb_no,
      unit_id: this.props.GlobalData.BillInfo.unit_id ? this.props.GlobalData.BillInfo.unit_id.id : 0,
      quantity: this.props.GlobalData.BillInfo.quantity,
      description: this.props.GlobalData.BillInfo.description,
      transport_type: this.props.GlobalData.BillInfo.transport_type ? this.props.GlobalData.BillInfo.transport_type.vehicle_name : null,
      vehicle_reg_no: this.props.GlobalData.BillInfo.vehicle_reg_no,
      driver_name: this.props.GlobalData.BillInfo.driver_name,
      from_place: this.props.GlobalData.BillInfo.from ? this.props.GlobalData.BillInfo.from.location_name : null,
      to_place: this.props.GlobalData.BillInfo.to ? this.props.GlobalData.BillInfo.to.location_name : null,
      particulars_charges: JSON.stringify(
        this.props.GlobalData.Particulars.particulars_charges
      ),
      total_amount: this.props.GlobalData.Particulars.totalAmount,
      paid_amount: this.props.GlobalData.Particulars.paidAmount,
      due_amount: this.props.GlobalData.Particulars.dueAmount,
    };
    if (FormMode === "EDIT") {
      payload["bill_id"] = this.props.GlobalData.TransportId;
    }

    axios
      .post(APP.ENV.URL.API.ROOT + "/company/transport/save", payload, {
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
  onAddTransportType(value) {
    const payload = {
      vehicle_name: value,
    };
    axios
      .post(
        APP.ENV.URL.API.ROOT + "/company/transport/addTransportTypeDropDown",
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
          this.props.func.HandleTransportList(response.data.vehicle_dropdown);
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
  onRemoveTransportType(id){
    axios
      .delete(
        APP.ENV.URL.API.ROOT + "/company/transport/deleteTransportTypeDropDown",
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
          this.props.func.HandleTransportList(response.data.transport_type);
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

  onAddLocation(value){
    const payload = {
      location_name: value,
    };
    axios
      .post(
        APP.ENV.URL.API.ROOT + "/company/transport/addLocationDropDown",
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
          this.props.func.HandleLocationList(response.data.location_dropdown);
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
  onRemoveLocation(id){
    axios
    .delete(
      APP.ENV.URL.API.ROOT + "/company/transport/deleteLocationDropDown",
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
        this.props.func.HandleLocationList(response.data.location);
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
    Promise.all([unitList, chargeHead, company])
      .then((res) => {
        const [unit, chargeHead, company] = res;

        batch(() => {
          if (unit.data.success) {
            this.props.func.HandleUnitList(unit.data.units);
          }
          if (chargeHead.data.success) {
            this.props.func.HandleChargeHead(
              chargeHead.data.charge_heads_dropdown_list
            );
          }
          // if (transportType.data.success) {
          //   this.props.func.HandleTransportList(
          //     transportType.data.transport_type_dropdown_list
          //   );
          // }

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

         
          this.__RemoveFAP();
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
  componentWillMount() {
    this.GetAllInfo();
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
        this.GetTransportDetail();
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
              ? "Add New Transport Bill"
              : this.props.GlobalData.FormMode === "EDIT"
              ? "Edit Transport Bill"
              : this.props.GlobalData.FormMode === "VIEW"
              ? "Transport Bill"
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
              onAddHead={this.handleAddHead}
              onRemoveHead={this.handleRemoveHead}
              onUnitListReloadCommand={this.GetUnit}
              onAddTransportType={this.onAddTransportType}
              onRemoveTransportType={this.onRemoveTransportType}
              onAddLocation={this.onAddLocation}
              onRemoveLocation={this.onRemoveLocation}
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
    GlobalData: state.TransportBill,
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
      HandleUnitList: (payload) => {
        dispatch(HandleUnitList(payload));
      },
      HandleFormOpen: (payload) => {
        dispatch(HandleFormOpen(payload));
      },
      HandleTransportList: (payload) => {
        dispatch(HandleTransportList(payload));
      },
      HandleLocationList: (payload) => {
        dispatch(HandleLocationList(payload));
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
      HandleChargeHead: (payload) => {
        dispatch(HandleChargeHead(payload));
      },
      HandleTransportId: (payload) => {
        dispatch(HandleTransportId(payload));
      },
      HandleAWBNo: (payload) => {
        dispatch(HandleAWBNo(payload));
      },
      HandleBEDate: (payload) => {
        dispatch(HandleBEDate(payload));
      },
      HandleBENo: (payload) => {
        dispatch(HandleBENo(payload));
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
      HandleBillDate: (payload) => {
        dispatch(HandleBillDate(payload));
      },
      HandleDeliverNo: (payload) => {
        dispatch(HandleDeliverNo(payload));
      },
      HandleDeliverDate: (payload) => {
        dispatch(HandleDeliverDate(payload));
      },
      HandleTransportNo: (payload) => {
        dispatch(HandleTransportNo(payload));
      },
      HandleTransportDate: (payload) => {
        dispatch(HandleTransportDate(payload));
      },
      HandleLCNo: (payload) => {
        dispatch(HandleLCNo(payload));
      },
      HandleLCDate: (payload) => {
        dispatch(HandleLCDate(payload));
      },
      HandleHoldingNo: (payload) => {
        dispatch(HandleHoldingNo(payload));
      },
      HandleHoldingDate: (payload) => {
        dispatch(HandleHoldingDate(payload));
      },
      HandleJobNo: (payload) => {
        dispatch(HandleJobNo(payload));
      },
      HandleJobDate: (payload) => {
        dispatch(HandleJobDate(payload));
      },
      HandleUnit: (payload) => {
        dispatch(HandleUnit(payload));
      },
      HandleQuantity: (payload) => {
        dispatch(HandleQuantity(payload));
      },
      HandleDescription: (payload) => {
        dispatch(HandleDescription(payload));
      },
      HandleTransportType: (payload) => {
        dispatch(HandleTransportType(payload));
      },
      HandleVehicleNo: (payload) => {
        dispatch(HandleVehicleNo(payload));
      },
      HandleDriverName: (payload) => {
        dispatch(HandleDriverName(payload));
      },
      HandleFrom: (payload) => {
        dispatch(HandleFrom(payload));
      },
      HandleTo: (payload) => {
        dispatch(HandleTo(payload));
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
