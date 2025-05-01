import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { APP } from "../../../App/AppProvider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";
import {
  HandleBranchList,
  HandleDataGridShouldReload,
  HandleFormMode,
  HandleFormOpen,
  HandleParticulars,
  HandleParticularPaidAmount,
  HandleParticularDueAmount,
  HandleParticularTotalAmount,
  HandlePrintType,
} from "../../../Global/Data/Actions/Private/ImportBill/ImportBill.Action";
import moment from "moment";
import "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  title: {
    display: "flex",
    justifyContent: "center",
  },
  border: {
    border: "1px solid black",
  },
  container: {
    marginBlock: "10px",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginInline: "10px",
  },
  printTitle: {
    padding: 0,
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
  },
  headerLeftTableData: {
    width: "50%",
    paddingRight: "10px",
    paddingTop: "10px",
    verticalAlign: "top",
  },
  headerRightTableData: {
    width: "50%",
    paddingRight: "10px",
    paddingLeft: "10px",
    verticalAlign: "top",
  },
  billLabelContainer: {
    width: "80px",
    padding: "10px",
    verticalAlign: "top",
  },
  billLabel: {
    fontFamily: "Arial",
    fontSize: "22px",
    border: " 2px solid #000000",
    padding: "3px",
    paddingLeft: " 25px",
    paddingRight: "25px",
  },
  avalue: {
    width: "85px",
    textAlign: "left",
    verticalAlign: "top",
  },
  dateSibling: {
    width: "70px",
    textAlign: "left",
  },
  date: {
    width: "150px",
  },
  tableHead: {
    width: "17%",
    textAlign: "left",
  },
  tableHead2: {
    width: "5%",
    textAlign: "left",
  },
  blankRow: {
    height: "30px",
  },
  particulars_table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
    height: "550px",
    minHeight: "550px",
  },
  tableBorder: {
    border: "2px solid #000000",
  },
  company_name: {
    display: "block",
    fontSize: "30px",
    fontWeight: "bold",
    margin: "0",
  },
}));

const Screen = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [client, setClient] = React.useState("");
  const [unit, setUnit] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onPrint = (type, mode) => {
    window.open(`transport/report/${props.GlobalData.TransportId}/${type}`);
  };

  const tempClient = props.GlobalData.BillInfo.Client;

  if (tempClient && client === "") {
    setClient(tempClient.Name);
  }

  const tempUnit = props.GlobalData.BillInfo.unit_id;
  if (tempUnit && unit === "") {
    setUnit(tempUnit.Name);
  }
  const FormMode = props.GlobalData.FormMode;

  const HasEditPermission = props.GlobalData.HasEditPermission;
  const FormDisabled =
    FormMode === "VIEW" || (FormMode === "EDIT" && HasEditPermission === false);
  // const MasterFlagDisabled = (FormMode === 'ADD' && Number(auth_user.IsMasterUser) === 0) || FormDisabled || (FormMode === 'EDIT' && MasterFlagEditPermission === false);
  function keyDownHandler(e) {
    if (e.keyCode === 66 && e.ctrlKey) {
      e.preventDefault();
      handleChange(e, 0);
    } else if (e.keyCode === 74 && e.ctrlKey) {
      e.preventDefault();
      handleChange(e, 1);
    } else if (e.keyCode === 80 && e.ctrlKey) {
      e.preventDefault();
      handleChange(e, 2);
    } else if (e.keyCode === 85 && e.ctrlKey) {
      e.preventDefault();
      handleChange(e, 3);
    }
  }

  document.addEventListener("keydown", keyDownHandler);
  return (
    <React.Fragment>
      <div style={{ padding: "10px", marginTop: "20px" }}>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} className={classes.border}>
            <div className={classes.title}>
              <h3>Bill Information</h3>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={2} className={classes.border}>
            <p>Created By</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>Admin</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Code</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.BillCode}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Bill Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.BillInfo.BillDate !== null
                ? moment(props.GlobalData.BillInfo.BillDate).format(
                    "DD/MM/YYYY"
                  )
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Client</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{client}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Delivery Challan No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.DeliveryChallanNo}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Delivery Challan Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.BillInfo.DeliveryDate !== null
                ? moment(props.GlobalData.BillInfo.DeliveryDate).format(
                    "DD/MM/YYYY"
                  )
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Transport Challan No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.TransportChallanNo}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Transport Challan Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.BillInfo.TransportDate !== null
                ? moment(props.GlobalData.BillInfo.TransportDate).format(
                    "DD/MM/YYYY"
                  )
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>LC No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.lc_no}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>LC Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.BillInfo.lc_date !== null
                ? moment(props.GlobalData.BillInfo.lc_date).format("DD/MM/YYYY")
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>BE No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.be_no}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>BE Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.BillInfo.be_date !== null
                ? moment(props.GlobalData.BillInfo.be_date).format("DD/MM/YYYY")
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Holding No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.holding_no}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Holding Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.BillInfo.holding_date !== null
                ? moment(props.GlobalData.BillInfo.holding_date).format(
                    "DD/MM/YYYY"
                  )
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Job No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.job_no}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Job Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.BillInfo.job_date !== null
                ? moment(props.GlobalData.BillInfo.job_date).format(
                    "DD/MM/YYYY"
                  )
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>AWB No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.awb_no}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Timestamp</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
          <p>
              {props.GlobalData.BillInfo.BillDate !== null
                ? moment(props.GlobalData.BillInfo.BillDate).format(
                    "DD/MM/YYYY"
                  )
                : ""}
            </p>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} className={classes.border}>
            <div className={classes.title}>
              <h3>Package & Transport Information</h3>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={2} className={classes.border}>
            <p>Package</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.BillInfo.quantity} {unit}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Unit </p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{unit}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Quantity</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.quantity}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Description</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.description}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Vehicle Name</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.transport_type ? props.GlobalData.BillInfo.transport_type.vehicle_name : ""}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Vehicle Reg. No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.vehicle_reg_no}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Driver Name </p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.driver_name}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>From</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.from ? props.GlobalData.BillInfo.from.location_name : ""}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>To</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.to ? props.GlobalData.BillInfo.to.location_name : ""}</p>
          </Grid>

          <Grid item xs={12} className={classes.border}>
            <div className={classes.title} style={{ textAlign: "center" }}>
              <h3>Particulars of Heads/Accounts</h3>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.border}>
            <Grid container spacing={2} className={classes.container}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={8} className={classes.border}>
                    <strong>Head</strong>
                  </Grid>
                  <Grid item xs={4} className={classes.border}>
                    <strong>Amount</strong>
                  </Grid>
                  {props.GlobalData.Particulars.particulars_charges.map(
                    (item) => {
                      return (
                        <>
                          <Grid item xs={8} className={classes.border}>
                            <p>{item.head_name}</p>
                          </Grid>
                          <Grid item xs={4} className={classes.border}>
                            <p>{item.amount}</p>
                          </Grid>
                        </>
                      );
                    }
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Total Amount</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.Particulars.totalAmount}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Advance Amount</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.Particulars.paidAmount}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Due Amount</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.Particulars.dueAmount}</p>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.buttons}>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => props.onEdit("EDIT")}
              color="primary"
            >
              Edit
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => onPrint("VOUCHER", "PRINT")}
            >
              Print VB
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    GlobalData: state.TransportBill,
    CompanyData: state.Company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    func: {
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
      HandleParticulars: (payload) => {
        dispatch(HandleParticulars(payload));
      },
      HandleParticularDueAmount: (payload) => {
        dispatch(HandleParticularDueAmount(payload));
      },
      HandleParticularPaidAmount: (payload) => {
        dispatch(HandleParticularPaidAmount(payload));
      },
      HandleParticularTotalAmount: (payload) => {
        dispatch(HandleParticularTotalAmount(payload));
      },
      HandlePrintType: (payload) => {
        dispatch(HandlePrintType(payload));
      },
    },
  };
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export { _Screen as Screen };
