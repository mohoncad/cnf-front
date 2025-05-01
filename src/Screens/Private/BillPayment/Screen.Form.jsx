import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { APP } from "../../../App/AppProvider";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import Tooltip from "@material-ui/core/Tooltip";
import {
  HandleDataGridShouldReload,
  HandleFormMode,
  HandleFormOpen,
  HandlePaymentCode,
  HandleClient,
  HandlePaymentDate,
  HandlePaymentType,
  HandleClientWiseBillSummaryList,
  HandleSummaryBillList,
  HandleSummaryBill,
  HandleBillSourceList,
  HandleTotalAmount,
  HandleLessAmount,
  HandlePaidAmount,
  HandleBillSource
} from "../../../Global/Data/Actions/Private/BillPayment/BillPayment.Action";
import BarAlert from "../../../Components/Common/BarAlert/BarAlert";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "date-fns";
import axios from "axios";
import moment from "moment";

const Auth = APP.SERVICES.AUTH;

const BillSourceList = [
  { Name: "Client", id: 0 },
  { Name: "Summary Bill", id: 1 },
];

const PaymentTypeList = [
  { Name: "Cash", id: 0 },
  { Name: "Bank", id: 1 },
];

const useStyles = makeStyles((theme) => ({
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
  TextArea: {
    width: "100%",
  },
  AutoComplete: {
    "& .MuiInputBase-root": {
      padding: "0",
    },
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

  uploadItem: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "10px",
    marginBottom: "5px",
  },
}));

const decimalFix = (num, decPoint) => {
  return num.toFixed(decPoint);
};
const stringToNum = (str, decPoint) => {
  return decimalFix(parseFloat(str), decPoint);
};

const Screen = (props) => {
  const classes = useStyles();
  const [billType, setBillType] = React.useState(false);
  const [client, setClient] = React.useState("");
  const [AddBillList, setAddBillList] = React.useState(
    props.GlobalData.BillPayment.BillListSource
  );
  const [BillList, setBillList] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(stringToNum("0", 2));
  const [paidAmount, setPaidAmount] = React.useState(stringToNum("0", 2));
  const [showExcess, setShowExcess] = React.useState(false);

  useEffect(() => {
    setAddBillList(props.GlobalData.BillPayment.BillListSource);
  }, [props, setAddBillList]);

  function handleBillSource(e, value) {
    if (value?.id === 1) {
      setBillType(true);
      callClientWiseSummaryBill(client);
    } else {
      setBillType(false);
      GetClientWise(client);
    }

    props.func.HandleBillSource(value);
    // handle bill source
  }

  function callClientWiseSummaryBill(billClient) {
    if (billClient === "") return;
    axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/BillPayment/getClientWiseBillSummary?client_id=" +
          billClient.id,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          props.func.HandleClientWiseBillSummaryList(
            response.data.client_wise_bill_summary
          );
        }
      });
  }

  function handleClient(e, value) {
    props.func.HandleClient(value);

    if (value !== null) {
      setClient(value);
      createCode(value, billType);
      GetClientWise(value);
      if (billType) {
        callClientWiseSummaryBill(value);
      }
    } else {
      setClient("");
      props.func.HandlePaymentCode("");
    }
  }

  function handlePaymentType(e, value) {
    props.func.HandlePaymentType(value);
  }

  function handlePaymentDate(e) {
    props.func.HandlePaymentDate(e);
  }

  function createCode(client, billtype) {
    axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/BillPayment/getUpdatedCode?client_id=" +
          client.id,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          let code = `CMPT_${client.CodePrefix}${response.data.billPayment_newCode}`;
          props.func.HandlePaymentCode(code);
        }
      });
  }
  function handleGetBill(e, value) {
    props.func.HandleSummaryBill(value);

    if (billType && value !== "") {
      GetSummaryWise(value);
    }
  }

  function GetSummaryWise(value) {
    if (value === null) {
      setBillList([]);
      return;
    }
    axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/BillPayment/getSummaryWiseBill?summary_id=" +
          value.summary_id +
          "&summary_code=" +
          value.summary_code,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          if (billType) {
            newBillAddition(response.data?.summary_wise_bill_list);
          } else {
            const list = response.data.summary_wise_bill_list.map((item) => {
              return {
                ...item,
                isSelected: false,
              };
            });
            setBillList(list);
          }
        }
      });
  }

  function newBillAddition(bill_list) {
    const lessAmount = document.getElementById("lessAmount").value;
    let amount = parseFloat(totalAmount);

    const newBill = bill_list.map((value) => {
      amount += parseFloat(value.due_amount);

      props.func.HandleTotalAmount(amount);
      props.func.HandlePaidAmount(amount - lessAmount);

      // toggleItemSelected(true, value.bill_code);

      return {
        ...value,
        bill_date: moment(value.bill_date).format("DD/MM/YYYY"),
      };
    });
    setAddBillList([...newBill]);
    props.func.HandleBillSourceList([...newBill]);

    setTotalAmount(amount);
    setPaidAmount(amount - lessAmount);
  }

  function GetClientWise(billClient) {
    axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/BillPayment/getClientWiseBill?client_id=" +
          billClient.id,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          const importList = response.data.client_wise_import_bill.map(
            (item) => {
              return {
                ...item,
                isSelected: false,
              };
            }
          );
          const exportList = response.data.client_wise_export_bill.map(
            (item) => {
              return {
                ...item,
                isSelected: false,
              };
            }
          );
          const transportList = response.data.client_wise_transport_bill.map(
            (item) => {
              return {
                ...item,
                isSelected: false,
              };
            }
          );

          setBillList([
            { bill_code: "title", title: "Import Bill" },
            ...importList,
            { bill_code: "title", title: "Export Bill" },
            ...exportList,
            { bill_code: "title", title: "Transport Bill" },
            ...transportList,
          ]);
        }
      });
  }

  function handleBill(e, value) {
    const lessAmount = document.getElementById("lessAmount").value;

    if (value === null || value?.bill_code === "title") return;

    const amount = parseFloat(totalAmount) + parseFloat(value.due_amount);
    setTotalAmount(amount);
    setPaidAmount(amount - lessAmount);

    props.func.HandleTotalAmount(amount);
    props.func.HandlePaidAmount(amount - lessAmount);

    e.target.value = "";
    toggleItemSelected(true, value.bill_code);

    if (value) {
      const listItem = {
        ...value,
        bill_date: moment(value.bill_date).format("DD/MM/YYYY"),
      };
      setAddBillList([...AddBillList, listItem]);
      props.func.HandleBillSourceList([...AddBillList, listItem]);
    }
  }

  function onDeleteAction(bill, deleteIndex) {
    const lessAmount = document.getElementById("lessAmount").value;
    const amount = parseFloat(totalAmount) - parseFloat(bill.total_amount);
    setTotalAmount(amount);
    setPaidAmount(amount - lessAmount);

    AddBillList.splice(deleteIndex, 1);
    setAddBillList([...AddBillList]);
    props.func.HandleBillSourceList([...AddBillList]);
    toggleItemSelected(false, bill.bill_code);
  }

  function toggleItemSelected(isSelected, billCode) {
    const billIndex = BillList.map((item) => item.bill_code).findIndex(
      (bill) => bill === billCode
    );
    const selectedBill = BillList[billIndex];
    selectedBill.isSelected = isSelected;
    BillList[billIndex] = selectedBill;
    setBillList(BillList);
  }

  function handleBillSubtraction(e) {
    setShowExcess(false);
    let pay = 0.0;
    let lessAmount = 0;
    if (e.target.value !== "") {
      lessAmount = parseFloat(stringToNum(e.target.value, 2));
      const val = totalAmount - stringToNum(e.target.value, 2);

      if (val > 0) {
        pay = parseFloat(stringToNum(`${val}`, 2));
      }
    } else {
      lessAmount = 0.0;
      pay = totalAmount - 0;
    }

    if (totalAmount < lessAmount) {
      warnExcessPayment(e);
      pay = totalAmount;
    }

    setPaidAmount(pay);
    props.func.HandlePaidAmount(pay);
    props.func.HandleLessAmount(lessAmount);
  }

  function warnExcessPayment(e) {
    e.target.value = "";
    setShowExcess(true);
  }

  const FormMode = props.GlobalData.FormMode;

  const HasEditPermission = props.GlobalData.HasEditPermission;
  const FormDisabled = FormMode === "VIEW";

  function keyDownHandler(e) {
    if (e.keyCode === 66 && e.ctrlKey) {
      e.preventDefault();
      // handleChange(e, 0);
    } else if (e.keyCode === 80 && e.ctrlKey) {
      e.preventDefault();
      // handleChange(e, 1);
    }
  }

  document.addEventListener("keydown", keyDownHandler);
  return (
    <React.Fragment>
      {FormMode === "VIEW" && HasEditPermission !== false && (
        <BarAlert
          type={"info"}
          message={"Edit this settings"}
          style={{ cursor: "pointer" }}
          onClick={() => props.func.HandleFormMode("EDIT")}
        />
      )}

      <div style={{ padding: "15px", marginTop: "20px" }}>
        <Grid container spacing={2}>
          {FormMode === "ADD" && (
            <>
              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth={true}
                  variant={"outlined"}
                  size={"small"}
                  label="Payment Code"
                  className={classes.TextField}
                  value={props.GlobalData.BillPayment.Code}
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.TextField}
                    disableToolbar
                    fullWidth={true}
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={props.GlobalData.BillPayment.PayDate}
                    onChange={handlePaymentDate}
                    required
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6} md={2}>
                <FormControl
                  required
                  variant="outlined"
                  className={classes.FormControl}
                  disabled={FormDisabled}
                >
                  <Autocomplete
                    value={props.GlobalData.Client}
                    onChange={(e, value) => handlePaymentType(e, value)}
                    options={PaymentTypeList}
                    getOptionLabel={(option) => option.Name}
                    renderOption={(option) => (
                      <React.Fragment>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <span>{option.Name}</span>
                        </div>
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        className={classes.AutoComplete}
                        {...params}
                        label="Payment Type"
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth={true}
                  variant={"outlined"}
                  size={"small"}
                  label="Total Amount"
                  className={classes.TextField}
                  value={totalAmount}
                  // onChange={handleSummaryCode}
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  id="lessAmount"
                  fullWidth={true}
                  variant={"outlined"}
                  size={"small"}
                  label="Less Amount"
                  className={classes.TextField}
                  onBlur={(e) => handleBillSubtraction(e)}
                  onChange={(e) => handleBillSubtraction(e)}
                />
                {showExcess && (
                  <p style={{ color: "red" }}>
                    Less amount is larger than total amount
                  </p>
                )}
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth={true}
                  variant={"outlined"}
                  size={"small"}
                  label="Payment Amount"
                  className={classes.TextField}
                  value={paidAmount}
                  // onChange={handleSummaryCode}
                  disabled
                />
              </Grid>

              {/* second section */}
              <Grid item xs={6} md={2}>
                <FormControl
                  required
                  variant="outlined"
                  className={classes.FormControl}
                  disabled={FormDisabled}
                >
                  <Autocomplete
                    value={props.GlobalData.Client}
                    onChange={(e, value) => handleBillSource(e, value)}
                    options={BillSourceList}
                    getOptionLabel={(option) => option.Name}
                    renderOption={(option) => (
                      <React.Fragment>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <span>{option.Name}</span>
                        </div>
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        className={classes.AutoComplete}
                        {...params}
                        label="Bill Source"
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6} md={billType ? 2 : 4}>
                <FormControl
                  required
                  variant="outlined"
                  className={classes.FormControl}
                  disabled={AddBillList.length > 0}
                >
                  <Autocomplete
                    disabled={AddBillList.length > 0}
                    value={props.GlobalData.Client}
                    onChange={(e, value) => handleClient(e, value)}
                    options={props.GlobalData.ClientList}
                    getOptionLabel={(option) => option.Name}
                    renderOption={(option) => (
                      <React.Fragment>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <span>{option.Name}</span>
                        </div>
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        className={classes.AutoComplete}
                        {...params}
                        label="Client"
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              {billType && (
                <Grid item xs={6} md={2}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.FormControl}
                    disabled={FormDisabled}
                  >
                    <Autocomplete
                      value={props.GlobalData.Client}
                      onChange={(e, value) => handleGetBill(e, value)}
                      options={props.GlobalData.ClientWiseBillSummaryList}
                      getOptionLabel={(option) => option.summary_code}
                      renderOption={(option) => (
                        <React.Fragment>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <span>{option.summary_code}</span>
                          </div>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          className={classes.AutoComplete}
                          {...params}
                          label="Summary Bill"
                          variant="outlined"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={6} md={6}>
                <FormControl
                  required
                  variant="outlined"
                  className={classes.FormControl}
                  disabled={FormDisabled}
                >
                  <Autocomplete
                    disabled={billType}
                    // value={billText}
                    onChange={(e, value) => handleBill(e, value)}
                    // options={props.GlobalData.SummaryBillList}
                    options={BillList}
                    getOptionLabel={(option) => option.bill_code}
                    getOptionDisabled={(option) =>
                      option.bill_code === "title" || option.isSelected
                    }
                    renderOption={(option) => (
                      <React.Fragment>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          {option.bill_code === "title" ? (
                            <span style={{ margin: "5px 0 5px 0" }}>
                              {option.title}
                            </span>
                          ) : (
                            <span>{`${option.bill_code} (Total: ${option.total_amount}, Advance: ${option.paid_amount}, Due: ${option.due_amount} )`}</span>
                          )}
                        </div>
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        className={classes.AutoComplete}
                        {...params}
                        label="Bill"
                        variant="outlined"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </>
          )}
          {FormMode === "VIEW" && (
            <>
              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth={true}
                  variant={"outlined"}
                  size={"small"}
                  label="Payment Code"
                  className={classes.TextField}
                  value={props.GlobalData.BillPayment.Code}
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.TextField}
                    disableToolbar
                    fullWidth={true}
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={props.GlobalData.BillPayment.PayDate}
                    disabled
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6} md={8}>
                <TextField
                  fullWidth={true}
                  variant={"outlined"}
                  size={"small"}
                  label="Client"
                  className={classes.TextField}
                  value={props.GlobalData.BillPayment.ViewClient}
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth={true}
                  variant={"outlined"}
                  size={"small"}
                  label="Payment Type"
                  className={classes.TextField}
                  value={props.GlobalData.BillPayment.ViewPayment}
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth={true}
                  variant={"outlined"}
                  size={"small"}
                  label="Total Amount"
                  className={classes.TextField}
                  value={props.GlobalData.BillPayment.TotalAmount}
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth={true}
                  variant={"outlined"}
                  size={"small"}
                  label="Less Amount"
                  value={props.GlobalData.BillPayment.LessAmount}
                  className={classes.TextField}
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth={true}
                  variant={"outlined"}
                  size={"small"}
                  label="Payment Amount"
                  className={classes.TextField}
                  value={props.GlobalData.BillPayment.PaymentAmount}
                  disabled
                />
              </Grid>
            </>
          )}
          {/* table section */}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>Bill Type</TableCell>
                    <TableCell>Bill Code</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Advance</TableCell>
                    <TableCell>Due</TableCell>
                    <TableCell>{FormMode === "VIEW" ? "Status" : ""}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {AddBillList.map((row, i) => (
                    <TableRow key={row.bill_code}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.bill_type ? row.bill_type : "Transport"}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.bill_code}
                      </TableCell>
                      <TableCell align="left">{row.bill_date}</TableCell>
                      <TableCell align="left">{row.total_amount}</TableCell>
                      <TableCell align="left">{row.paid_amount}</TableCell>
                      <TableCell align="left">{row.due_amount}</TableCell>
                      <TableCell align="left">
                        {FormMode === "VIEW" ? (
                          <span style={{ color: "green" }}>PAID</span>
                        ) : (
                          <Tooltip
                            title={"Delete"}
                            placement={"top"}
                            enterDelay={500}
                          >
                            <IconButton
                              size={"small"}
                              // disabled={HasMasterSupplierRestriction || DeleteDisabled}
                              className={classes.TableDeleteActionButton}
                              onClick={() => onDeleteAction(row, i)}
                            >
                              <DeleteIcon fontSize={"small"} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <p>
          <strong>ESC</strong> = Exit, <strong>CTRL+S</strong> = Save
        </p>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    GlobalData: state.BillPayment,
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
      HandlePaymentCode: (payload) => {
        dispatch(HandlePaymentCode(payload));
      },
      HandleClient: (payload) => {
        dispatch(HandleClient(payload));
      },
      HandlePaymentDate: (payload) => {
        dispatch(HandlePaymentDate(payload));
      },
      HandlePaymentType: (payload) => {
        dispatch(HandlePaymentType(payload));
      },
      HandleClientWiseBillSummaryList: (payload) => {
        dispatch(HandleClientWiseBillSummaryList(payload));
      },
      HandleSummaryBillList: (payload) => {
        dispatch(HandleSummaryBillList(payload));
      },
      HandleSummaryBill: (payload) => {
        dispatch(HandleSummaryBill(payload));
      },
      HandleBillSourceList: (payload) => {
        dispatch(HandleBillSourceList(payload));
      },
      HandleTotalAmount: (payload) => {
        dispatch(HandleTotalAmount(payload));
      },
      HandleLessAmount: (payload) => {
        dispatch(HandleLessAmount(payload));
      },
      HandlePaidAmount: (payload) => {
        dispatch(HandlePaidAmount(payload));
      },
      HandleBillSource: (payload) => {
        dispatch(HandleBillSource(payload));
      }
    },
  };
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export { _Screen as Screen };
