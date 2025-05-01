import {React, useEffect} from "react";
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
import UserRole from "../../../Pages/Private/UAP/UserRole/UserRole";
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
import Branches from "../../../Pages/Private/Branches/Branches";

import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import Converter from "number-to-words";
import "date-fns";
import companyLogo from "../../../Static/Company_logo.png";

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
    width: "70px",
    textAlign: "left",
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
  const [voucherTotal, setVoucherTotal] = React.useState(0);

  const [hasActualAmount, setActualAmountPermission] = React.useState(
    Number(
      new APP.SERVICES.UAP().GetModulePermissions(APP.CONFIG.MODULE[14])
        .ActualAmountView
    ) === 1
  );
  const [hasCustomerAmount, setCustomerAmountPermission] = React.useState(
    Number(
      new APP.SERVICES.UAP().GetModulePermissions(APP.CONFIG.MODULE[14])
        .CustomerAmountView
    ) === 1
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onPrint = (type, mode) => {
    window.open(`report/${props.GlobalData.BillID}/${type}/export`);
  };

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

  
  useEffect(() => {
    if (props.GlobalData.Particulars.particulars_charges.length > 1) {
      setVoucherTotal(
        props.GlobalData.Particulars.particulars_charges.reduce(
          (val, element) => val + parseFloat(element.actual_amount),
          0
        )
      );
    }
  }, [setVoucherTotal, props, voucherTotal]);
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
              {moment(props.GlobalData.BillInfo.Date).format("DD/MM/YYYY")}{" "}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Bank Name</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            {props.GlobalData.BillInfo.ClientBank && props.GlobalData.BillInfo.ClientBank.Name}
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Supplier</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.BillInfo.Supplier && props.GlobalData.BillInfo.Supplier.Name}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Client</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.BillInfo.Client && props.GlobalData.BillInfo.Client.Name}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Client Address</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.ClientAddress}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Description of Goods</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.Description}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Bill Note</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.BillInfo.Note}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Enclosed Documents</p>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={6} className={classes.border}>
                <strong>Document Name</strong>
              </Grid>
              <Grid item xs={6} className={classes.border}>
                <strong>Document Type</strong>
              </Grid>
              {props.GlobalData.BillInfo.DocList.map((item) => {
                return (
                  <>
                    <Grid item xs={6} className={classes.border}>
                      <p>{item.doc_name}</p>
                    </Grid>
                    <Grid item xs={6} className={classes.border}>
                      <p>{item.doc_type}</p>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Registration</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>Admin</p>
          </Grid>
        </Grid>

        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} className={classes.border}>
            <div className={classes.title}>
              <h3>Job Information</h3>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={2} className={classes.border}>
            <p>LC No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.lc_no}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>LC Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.JobDetails.lc_date !== null
                ? moment(props.GlobalData.JobDetails.lc_date).format(
                    "DD/MM/YYYY"
                  )
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>BE No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.be_no}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>BE Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.JobDetails.be_date !== null
                ? moment(props.GlobalData.JobDetails.be_date).format(
                    "DD/MM/YYYY"
                  )
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Invoice No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.invoice_no}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Invoice Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.JobDetails.invoice_date !== null
                ? moment(props.GlobalData.JobDetails.invoice_date).format(
                    "DD/MM/YYYY"
                  )
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Currency</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.JobDetails.currency_id && props.GlobalData.JobDetails.currency_id.Name}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Currency Rate</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.currency_rate}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Invoice Value</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.invoice_value}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Gross Weight</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.gross_weight}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Net Weight</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.net_weight}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Unit</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {" "}
              {props.GlobalData.JobDetails.unit_id && props.GlobalData.JobDetails.unit_id.Name}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Quantity</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.quantity}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Carrier</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.carrier}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Port</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {" "}
              {props.GlobalData.JobDetails.port_id && props.GlobalData.JobDetails.port_id.Name}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Commodity</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.commodity}</p>
          </Grid>

          <Grid item xs={2} className={classes.border}>
            <p>Assessable Value</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.a_value}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>MAWB No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.mawb_no}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>MAWB Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.JobDetails.mawb_date !== null
                ? moment(props.GlobalData.JobDetails.mawb_date).format(
                    "DD/MM/YYYY"
                  )
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>HAWB No</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>{props.GlobalData.JobDetails.hawb_no}</p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>HAWB Date</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            <p>
              {props.GlobalData.JobDetails.hawb_date !== null
                ? moment(props.GlobalData.JobDetails.hawb_date).format(
                    "DD/MM/YYYY"
                  )
                : ""}
            </p>
          </Grid>
          <Grid item xs={2} className={classes.border}>
            <p>Particulars of Charges</p>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={3} className={classes.border}>
                <strong>Category</strong>
              </Grid>
              <Grid item xs={5} className={classes.border}>
                <strong>Head</strong>
              </Grid>
              {hasActualAmount && (
                <Grid item xs={2} className={classes.border}>
                  <strong>Voucher Amount</strong>
                </Grid>
              )}

              {hasCustomerAmount && (
                <Grid item xs={2} className={classes.border}>
                  <strong> Customer Amount</strong>
                </Grid>
              )}
              {props.GlobalData.Particulars.particulars_charges.map((item) => {
                return (
                  <>
                    <Grid item xs={3} className={classes.border}>
                      <p>{item.category_name}</p>
                    </Grid>
                    <Grid item xs={5} className={classes.border}>
                      <p>{item.head_name}</p>
                    </Grid>
                    {hasActualAmount && (
                      <Grid item xs={2} className={classes.border}>
                        <p>{item.actual_amount}</p>
                      </Grid>
                    )}
                    {hasCustomerAmount && (
                      <Grid item xs={2} className={classes.border}>
                        <p>{item.customer_amount}</p>
                      </Grid>
                    )}
                  </>
                );
              })}
            </Grid>
          </Grid>
          {hasCustomerAmount ? (
            <>
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
            </>
          ) : (
            <>
              <Grid item xs={2} className={classes.border}>
                <p>Total Amount</p>
              </Grid>
              <Grid item xs={10} className={classes.border}>
                <p>{voucherTotal}</p>
              </Grid>
            </>
          )}
          <Grid item xs={2} className={classes.border}>
            <p>Attachments</p>
          </Grid>
          <Grid item xs={10} className={classes.border}>
            {props.GlobalData.FetchAttachment.map((item) => {
              return <p><a href={item} target="_blank" rel="noopener noreferrer">{item}</a></p>
            })}
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
              onClick={() => onPrint("VOUCHER")}
            >
              Print VB
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => onPrint("CUSTOMER_BILL")}
            >
              Print CB
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    GlobalData: state.ImportBill,
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
