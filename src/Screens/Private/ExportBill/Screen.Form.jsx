import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { APP } from "../../../App/AppProvider";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  HandleBranchList,
  HandleDataGridShouldReload,
  HandleFormMode,
  HandleFormOpen,
  HandleClient,
  HandleClientAddress,
  HandleBillCode,
  HandleDate,
  HandleClientBank,
  HandleSupplier,
  HandleDescription,
  HandleNote,
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
} from "../../../Global/Data/Actions/Private/ImportBill/ImportBill.Action";
import UserRole from "../../../Pages/Private/UAP/UserRole/UserRole";
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
import BarAlert from "../../../Components/Common/BarAlert/BarAlert";
import Branches from "../../../Pages/Private/Branches/Branches";
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
import PromptDialog from "../../../Components/Common/PromptDialog/PromptDialog";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Unit from "../../../Pages/Private/Unit/Unit";
import Currency from "../../../Pages/Private/Currency/Currency";
import Port from "../../../Pages/Private/Port/Port";
import Banks from "../../../Pages/Private/Banks/Banks";
import Suppliers from "../../../Pages/Private/Suppliers/Suppliers";
import axios from "axios";
const Auth = APP.SERVICES.AUTH;

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
}));

const decimalFix = (num, decPoint) => {
  return num.toFixed(decPoint);
};
const stringToNum = (str, decPoint) => {
  return decimalFix(parseFloat(str), decPoint);
};

const MaterialCheckbox = withStyles({
  root: {
    color: APP.CONFIG.COLORS.PRIMARY,
    "&$checked": {
      color: APP.CONFIG.COLORS.PRIMARY,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  FormMode: PropTypes.any.isRequired,
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function BillInfo(props) {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState();
  const [selectedDoc, setSelectedDoc] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState("");
  const [docTypeList, setDocTypeList] = React.useState(
    props.data.GlobalData.DocumentList
  );
  const [isDocSelected, setIsDocSelected] = React.useState(false);

  function handleClient(e, value) {
    const clientInfo = value;

    props.data.func.HandleClientAddress(
      clientInfo.MailingAddess ? clientInfo.MailingAddess : ""
    );
    createCode(clientInfo);
    props.data.func.HandleClient(value);
  }

  async function createCode(client) {
    await axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/export/getUpdatedCode?client_id=" +
          client.id,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          let code = `EXB_${client.CodePrefix}${response.data.exportbill_newCode}`;
          handleBillCode(code);
        }
      });
  }

  function handleClientAddress(e) {
    props.data.func.HandleClientAddress(e.target.value);
  }
  function handleBillCode(e) {
    props.data.func.HandleBillCode(e);
  }
  function handleDate(e) {
    props.data.func.HandleDate(e);
  }
  function handleClientBank(e, value) {
    props.data.func.HandleClientBank(value);
  }
  function handleSupplier(e, value) {
    props.data.func.HandleSupplier(value);
  }
  function handleDescription(e) {
    props.data.func.HandleDescription(e.target.value);
  }
  function handleNote(e) {
    props.data.func.HandleNote(e.target.value);
  }

  function onDocumentSelect(e, value) {
    if (value === null) {
      setIsDocSelected(true);
      setSelectedDoc(null);
    } else {
      setSelectedDoc(value);
      setIsDocSelected(false);
    }
  }
  function onRemoveDocList(e, value) {
    e.stopPropagation();
    setIsDocSelected(true);
    setSelectedDoc(null);
    props.onRemoveDocList(value.id);
  }

  function onTypeSelect(e) {
    setSelectedType(e.target.value);
    if (selectedDoc !== null && e.target.value !== "") {
      let tempArr = [...props.data.GlobalData.BillInfo.DocList];
      tempArr.push({
        doc_name: selectedDoc.doc_name,
        doc_type: e.target.value,
      });
      props.data.func.HandleDocList(tempArr);
      setSelectedType("");
      setSelectedDoc(null);
    } else {
      setIsDocSelected(true);
      setSelectedType("");
      setSelectedDoc(null);
    }
  }
  function onNewDocList(e) {
    if (e.keyCode === 13) {
      props.onAddDocList(e.target.value);
    }
  }

  function onDeleteAction(index) {
    let tempArr = [...props.data.GlobalData.BillInfo.DocList];
    tempArr.splice(index, 1);
    props.data.func.HandleDocList(tempArr);
  }

  function onDocNameChange(event, index) {
    let tempArr = [...props.data.GlobalData.BillInfo.DocList];
    tempArr[index].doc_name = event.target.value;
    props.data.func.HandleDocList(tempArr);
  }

  function onTypeNameChange(event, index) {
    let tempArr = [...props.data.GlobalData.BillInfo.DocList];
    tempArr[index].doc_type = event.target.value;
    props.data.func.HandleDocList(tempArr);
  }
  return (
    <div role="tabpanel">
      <Box p={3}>
        <h3 style={{ marginTop: 0 }}>Bill Details</h3>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              variant={"outlined"}
              square={false}
              style={{ padding: "20px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.FormControl}
                    disabled={props.data.GlobalData.FormMode === "EDIT"}
                  >
                    <Autocomplete
                      value={props.data.GlobalData.BillInfo.Client}
                      onChange={(e, value) => handleClient(e, value)}
                      options={props.data.GlobalData.ClientList}
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
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Client Address"
                    className={classes.TextField}
                    value={props.data.GlobalData.BillInfo.ClientAddress}
                    onChange={handleClientAddress}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Bill Code"
                    className={classes.TextField}
                    value={props.data.GlobalData.BillInfo.BillCode}
                    // onChange={handleBillCode}
                    disabled
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.TextField}
                      disableToolbar
                      fullWidth={true}
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="bill-info-date"
                      label="Bill Date"
                      value={props.data.GlobalData.BillInfo.Date}
                      onChange={handleDate}
                      required
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={10} md={5}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.FormControl}
                  >
                    <Autocomplete
                      value={props.data.GlobalData.BillInfo.ClientBank}
                      onChange={(e, value) => handleClientBank(e, value)}
                      options={props.data.GlobalData.BankList}
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
                          label="Client Bank"
                          variant="outlined"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
                  <Tooltip
                    title="Manage and select bank from list view"
                    placement={"top"}
                  >
                    <IconButton
                      size={"medium"}
                      style={{
                        color: APP.CONFIG.COLORS.GREEN,
                        padding: "7px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        margin: 0,
                      }}
                      onClick={() => props.setBypassBankOpen(true)}
                    >
                      {/* disabled={UserRoleDisabled} */}
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={10} md={5}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.FormControl}
                  >
                    <Autocomplete
                      value={props.data.GlobalData.BillInfo.Supplier}
                      onChange={(e, value) => handleSupplier(e, value)}
                      options={props.data.GlobalData.SupplierList}
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
                          label="Supplier"
                          variant="outlined"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
                  <Tooltip
                    title="Manage and select supplier from list view"
                    placement={"top"}
                  >
                    <IconButton
                      size={"medium"}
                      style={{
                        color: APP.CONFIG.COLORS.GREEN,
                        padding: "7px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        margin: 0,
                      }}
                      onClick={() => props.setBypassSupplierOpen(true)}
                    >
                      {/* disabled={UserRoleDisabled} */}
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    className={classes.TextArea}
                    label="Enter Description of goods"
                    multiline
                    rows={3}
                    onChange={handleDescription}
                    value={props.data.GlobalData.BillInfo.Description}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    className={classes.TextArea}
                    label="Enter note"
                    multiline
                    rows={3}
                    onChange={handleNote}
                    value={props.data.GlobalData.BillInfo.Note}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              variant={"outlined"}
              square={false}
              style={{ padding: "20px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.FormControl}
                    error={isDocSelected}
                  >
                    <Autocomplete
                      value={selectedDoc}
                      onChange={(e, value) => onDocumentSelect(e, value)}
                      options={props.data.GlobalData.DocumentList}
                      getOptionLabel={(option) => option.doc_name}
                      renderOption={(option) => (
                        <React.Fragment>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <span>{option.doc_name}</span>
                            <IconButton
                              onClick={(e) => onRemoveDocList(e, option)}
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          className={classes.AutoComplete}
                          {...params}
                          onKeyUp={onNewDocList}
                          label="Select Document"
                          variant="outlined"
                        />
                      )}
                    />
                    {isDocSelected ? (
                      <FormHelperText>Required</FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl
                    variant="outlined"
                    className={classes.FormControl}
                  >
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={selectedType}
                      onChange={onTypeSelect}
                      label="Type"
                      // disabled={FormDisabled}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Photo Copy">Photo Copy</MenuItem>
                      <MenuItem value="Original">Original</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Docs</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.data.GlobalData.BillInfo.DocList.map(
                          (row, index) => (
                            <TableRow key={row.doc_name}>
                              <TableCell component="th" scope="row">
                                <TextField
                                  fullWidth={true}
                                  variant={"outlined"}
                                  size={"small"}
                                  label="Document"
                                  className={classes.TextField}
                                  value={row.doc_name}
                                  onChange={(e) => onDocNameChange(e, index)}
                                />
                              </TableCell>
                              <TableCell align="left">
                                <TextField
                                  fullWidth={true}
                                  variant={"outlined"}
                                  size={"small"}
                                  label="Type"
                                  className={classes.TextField}
                                  value={row.doc_type}
                                  onChange={(e) => onTypeNameChange(e, index)}
                                />
                              </TableCell>
                              <TableCell align="left">
                                <Tooltip
                                  title={"Delete"}
                                  placement={"top"}
                                  enterDelay={500}
                                >
                                  <IconButton
                                    size={"small"}
                                    // disabled={HasMasterSupplierRestriction || DeleteDisabled}
                                    className={classes.TableDeleteActionButton}
                                    onClick={() => onDeleteAction(index)}
                                  >
                                    <DeleteIcon fontSize={"small"} />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

BillInfo.propTypes = {
  // FormMode: PropTypes.any.isRequired,
  data: PropTypes.any,
  onAddDocList: PropTypes.func,
  onRemoveDocList: PropTypes.func,
  setBypassBankOpen: PropTypes.func,
  setBypassSupplierOpen: PropTypes.func,
};

function JobDetails(props) {
  const classes = useStyles();

  function handleInvoiceNo(e) {
    props.data.func.HandleInvoiceNo(e.target.value);
  }
  function handleInvoiceDate(e) {
    props.data.func.HandleInvoiceDate(e);
  }
  function handleLCNo(e) {
    props.data.func.HandleLCNo(e.target.value);
  }
  function handleLCDate(e) {
    props.data.func.HandleLCDate(e);
  }
  function handleBENo(e) {
    props.data.func.HandleBENo(e.target.value);
  }
  function handleBEDate(e) {
    props.data.func.HandleBEDate(e);
  }

  function handleMAWB(e) {
    props.data.func.HandleMAWB(e.target.value);
  }
  function handleMAWBDate(e) {
    props.data.func.HandleMAWBDate(e);
  }

  function handleHAWB(e) {
    props.data.func.HandleHAWB(e.target.value);
  }
  function handleHAWBDate(e) {
    props.data.func.HandleHAWBDate(e);
  }

  function handleCurrency(e, value) {
    if (value) {
      props.data.func.HandleCurrency(value);
      props.data.func.HandleCurrencyRate(stringToNum(value.CurrencyRate, 4));
    } else {
      props.data.func.HandleCurrency(null);
      props.data.func.HandleCurrencyRate("");
    }
  }
  function handleCurrencyRate(e) {
    props.data.func.HandleCurrencyRate(e.target.value);
  }
  function handleCurrencyRateBlur(e) {
    if(e.target.value !== "") {
      props.data.func.HandleCurrencyRate(stringToNum(e.target.value, 4));
    }
  }
  function handleInvoiceValue(e) {
    props.data.func.HandleInvoiceValue(e.target.value);
  }
  function handleGrossWeight(e) {
    props.data.func.HandleGrossWeight(e.target.value);
  }
  function handleNetWeight(e) {
    props.data.func.HandleNetWeight(e.target.value);
  }
  function handleUnit(e, value) {
    props.data.func.HandleUnit(value);
  }
  function handleQuantity(e) {
    props.data.func.HandleQuantity(e.target.value);
  }
  function handleQuantityBlur(e) {
    if(e.target.value !== "") {
      props.data.func.HandleQuantity(stringToNum(e.target.value, 2));
    }
  }
  function handleCarrier(e) {
    props.data.func.HandleCarrier(e.target.value);
  }
  function handlePort(e, value) {
    props.data.func.HandlePort(value);
  }
  function handleCommodity(e) {
    props.data.func.HandleCommodity(e.target.value);
  }
  function handleAValue(e) {
    props.data.func.HandleAValue(e.target.value);
  }

  return (
    <div role="tabpanel">
      <Box p={3}>
        <h3 style={{ marginTop: 0 }}>Job Details</h3>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              variant={"outlined"}
              square={false}
              style={{ padding: "20px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Invoice No"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.invoice_no}
                    onChange={handleInvoiceNo}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.TextField}
                      disableToolbar
                      fullWidth={true}
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="invoice-date-picker"
                      label="Invoice Date"
                      value={props.data.GlobalData.JobDetails.invoice_date}
                      onChange={handleInvoiceDate}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="LC No"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.lc_no}
                    onChange={handleLCNo}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.TextField}
                      disableToolbar
                      fullWidth={true}
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="lc-date-picker"
                      label="LC Date"
                      value={props.data.GlobalData.JobDetails.lc_date}
                      onChange={handleLCDate}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="B/E No"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.be_no}
                    onChange={handleBENo}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.TextField}
                      disableToolbar
                      fullWidth={true}
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="be-date-picker"
                      label="B/E Date"
                      value={props.data.GlobalData.JobDetails.be_date}
                      onChange={handleBEDate}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="MAWB #"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.mawb_no}
                    onChange={handleMAWB}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.TextField}
                      disableToolbar
                      fullWidth={true}
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="mawb-date-picker"
                      label="MAWB Date"
                      value={props.data.GlobalData.JobDetails.mawb_date}
                      onChange={handleMAWBDate}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="HAWB #"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.hawb_no}
                    onChange={handleHAWB}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.TextField}
                      disableToolbar
                      fullWidth={true}
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="hawb-date-picker"
                      label="HAWB Date"
                      value={props.data.GlobalData.JobDetails.hawb_date}
                      onChange={handleHAWBDate}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              variant={"outlined"}
              square={false}
              style={{ padding: "20px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={10} md={3}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.FormControl}
                  >
                    <Autocomplete
                      value={props.data.GlobalData.JobDetails.currency_id}
                      onChange={(e, value) => handleCurrency(e, value)}
                      options={props.data.GlobalData.CurrencyList}
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
                          label="Select Currency"
                          variant="outlined"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
                  <Tooltip
                    title="Manage and select currency from list view"
                    placement={"top"}
                  >
                    <IconButton
                      size={"medium"}
                      style={{
                        color: APP.CONFIG.COLORS.GREEN,
                        padding: "7px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        margin: 0,
                      }}
                      onClick={() => props.setBypassCurrencyOpen(true)}
                    >
                      {/* disabled={UserRoleDisabled} */}
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Currency Rate"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.currency_rate}
                    onChange={handleCurrencyRate}
                    onBlur={handleCurrencyRateBlur}
                    // disabled
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Invoice Value"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.invoice_value}
                    onChange={handleInvoiceValue}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Gross Weigth (KG)"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.gross_weight}
                    onChange={handleGrossWeight}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Net Weigth (KG)"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.net_weight}
                    onChange={handleNetWeight}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid item xs={10} md={5}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.FormControl}
                  >
                    <Autocomplete
                      value={props.data.GlobalData.JobDetails.unit_id}
                      onChange={(e, value) => handleUnit(e, value)}
                      options={props.data.GlobalData.UnitList}
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
                          label="Select Unit"
                          variant="outlined"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
                  <Tooltip
                    title="Manage and select unit from list view"
                    placement={"top"}
                  >
                    <IconButton
                      size={"medium"}
                      style={{
                        color: APP.CONFIG.COLORS.GREEN,
                        padding: "7px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        margin: 0,
                      }}
                      onClick={() => props.setBypassUnitOpen(true)}
                    >
                      {/* disabled={UserRoleDisabled} */}
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Quantity"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.quantity}
                    onChange={handleQuantity}
                    onBlur={handleQuantityBlur}

                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Carrier"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.carrier}
                    onChange={handleCarrier}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid item xs={10} md={5}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.FormControl}
                  >
                    <Autocomplete
                      value={props.data.GlobalData.JobDetails.port_id}
                      onChange={(e, value) => handlePort(e, value)}
                      options={props.data.GlobalData.PortList}
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
                          label="Select Port"
                          variant="outlined"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2} sm={1} style={{ textAlign: "right" }}>
                  <Tooltip
                    title="Manage and select port from list view"
                    placement={"top"}
                  >
                    <IconButton
                      size={"medium"}
                      style={{
                        color: APP.CONFIG.COLORS.GREEN,
                        padding: "7px",
                        display: "inline-block",
                        verticalAlign: "middle",
                        margin: 0,
                      }}
                      onClick={() => props.setBypassPortOpen(true)}
                    >
                      {/* disabled={UserRoleDisabled} */}
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Commodity"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.commodity}
                    onChange={handleCommodity}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    required
                    label="Assesable Value"
                    className={classes.TextField}
                    value={props.data.GlobalData.JobDetails.a_value}
                    onChange={handleAValue}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

JobDetails.propTypes = {
  data: PropTypes.any,
  setBypassUnitOpen: PropTypes.func,
  setBypassCurrencyOpen: PropTypes.func,
  setBypassPortOpen: PropTypes.func,
};
function Particulars(props) {
  const { value, index, ...other } = props;
  const classes = useStyles();

  const [chargeCategory, setChargeCategory] = React.useState(null);
  const [chargeHead, setChargeHead] = React.useState(null);
  const [voucherAmount, setVoucherAmount] = React.useState(0.0);
  const [customerAmount, setCustomerAmount] = React.useState(0.0);
  const [assessAmount, setAssessAmount] = React.useState(
    props.data.GlobalData.JobDetails.a_value
  );
  const [commission, setCommission] = React.useState(0.0);
  const [isTarget, setTarget] = React.useState(false);
  const [isCategorySelected, setIsCategorySelected] = React.useState(false);
  const [isHeadSelected, setIsHeadSelected] = React.useState(false);

  const [hasActualAmount, setActualAmountPermission] = React.useState(
    Number(
      new APP.SERVICES.UAP().GetModulePermissions(APP.CONFIG.MODULE[15])
        .ActualAmountView
    ) === 1
  );
  const [hasCustomerAmount, setCustomerAmountPermission] = React.useState(
    Number(
      new APP.SERVICES.UAP().GetModulePermissions(APP.CONFIG.MODULE[15])
        .CustomerAmountView
    ) === 1
  );

  const handleCheckChange = (event) => {
    setTarget(event.target.checked);
    // reset();
  };
  const handleChargeCategory = (e, value) => {
    if (value === null) {
      setIsCategorySelected(true);
      setChargeCategory(null);
    } else {
      setIsCategorySelected(false);
      setChargeCategory(value);
    }
  };
  function onNewCategory(e) {
    if (e.keyCode === 13) {
      props.onAddCategory(e.target.value);
    }
  }
  function onRemoveCategory(e, value) {
    e.stopPropagation();
    setChargeCategory(null);
    setIsCategorySelected(true);
    props.onRemoveCategory(value.id);
  }
  const handleChargeHead = (e, value) => {
    if (value === null) {
      setIsHeadSelected(true);
      setChargeHead(null);
    } else {
      setIsHeadSelected(false);
      setChargeHead(value);
    }
  };
  function onNewHead(e) {
    if (e.keyCode === 13) {
      props.onAddHead(e.target.value);
    }
  }
  function onRemoveHead(e, value) {
    e.stopPropagation();
    setChargeHead(null);
    setIsHeadSelected(true);
    props.onRemoveHead(value.id);
  }

  const handleVoucher = (event) => {
    setVoucherAmount(event.target.value);
  };
  const handleCustomerAmount = (event) => {
    setCustomerAmount(event.target.value);
  };
  const handleAssesAmount = (event) => {
    setAssessAmount(parseFloat(event.target.value));
  };
  const handleCommission = (event) => {
    const percent = parseFloat((assessAmount / 100) * event.target.value);
    setCommission(event.target.value);
    setCustomerAmount(stringToNum(percent, 2));
  };

  const addToParticulars = () => {
    if (chargeCategory === null) {
      setIsCategorySelected(true);
      return;
    }
    if (chargeHead === null) {
      setIsHeadSelected(true);
      return;
    }
    let tempArray = [...props.data.GlobalData.Particulars.particulars_charges];
    let payload = {
      category_name: chargeCategory.category_name,
      head_name: chargeHead.head_name,
      actual_amount: voucherAmount,
      customer_amount: customerAmount,
    };
    if (isTarget) {
      if (commission !== 0.0) {
        payload.head_name = `${payload.head_name} @${commission}%`;
      } else {
        payload.head_name = `${payload.head_name} @M/C%`;
      }
    }

    tempArray.push(payload);
    props.data.func.HandleParticulars(tempArray);
    reset();
    computeTotal(tempArray);
  };
  const reset = () => {
    setCustomerAmount(0.0);
    setVoucherAmount(0.0);
    setCommission(0.0);
    setAssessAmount(props.data.GlobalData.JobDetails.a_value);
    // setChargeCategory(null);
    // setChargeHead(null);
    // setIsCategorySelected(false);
    // setIsHeadSelected(false);
  };
  const onDeleteAction = (index) => {
    let tempArray = [...props.data.GlobalData.Particulars.particulars_charges];
    tempArray.splice(index, 1);
    props.data.func.HandleParticulars(tempArray);
    reset();
    computeTotal(tempArray);
  };
  const computeTotal = (tempArray) => {
    const total = tempArray.reduce(
      (acc, currVal) => acc + parseFloat(currVal.customer_amount),
      0.0
    );
    props.data.func.HandleParticularTotalAmount(stringToNum(total, 2));
    calculate(total);
  };
  const calculate = (total) => {
    const paymentDue =
      parseFloat(total) -
      parseFloat(props.data.GlobalData.Particulars.paidAmount);
    props.data.func.HandleParticularPaidAmount(
      props.data.GlobalData.Particulars.paidAmount
    );
    if (paymentDue < 0) {
      props.data.func.HandleParticularDueAmount(0.0);
    } else {
      props.data.func.HandleParticularDueAmount(stringToNum(paymentDue, 2));
    }
  };
  const payAmount = (e) => {
    const due = e.target.value === "" ? 0 : e.target.value;
    const paymentDue =
      parseFloat(props.data.GlobalData.Particulars.totalAmount) -
      parseFloat(due);
    props.data.func.HandleParticularPaidAmount(e.target.value);
    if (paymentDue < 0) {
      props.data.func.HandleParticularDueAmount(0.0);
    } else {
      props.data.func.HandleParticularDueAmount(stringToNum(paymentDue, 2));
    }
  };

  const editActualAmount = (e, index) => {
    let data = [...props.data.GlobalData.Particulars.particulars_charges];
    data[index].actual_amount = e.target.value;

    props.data.func.HandleParticulars(data);
    computeTotal(data);
  };
  const editCustomerAmount = (e, index) => {
    let data = [...props.data.GlobalData.Particulars.particulars_charges];
    data[index].customer_amount = e.target.value;

    props.data.func.HandleParticulars(data);
    computeTotal(data);
  };

  const handleBlurVouc = (e, index) => {
    let data = [...props.data.GlobalData.Particulars.particulars_charges];
    data[index].actual_amount = stringToNum(e.target.value, 2);
    props.data.func.HandleParticulars(data);
    computeTotal(data);
  };
  const handleBlurCust = (e, index) => {
    let data = [...props.data.GlobalData.Particulars.particulars_charges];
    data[index].customer_amount = stringToNum(e.target.value, 2);
    props.data.func.HandleParticulars(data);
    computeTotal(data);
  };

  return (
    <div role="tabpanel">
      <Box p={3}>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper
              variant={"outlined"}
              square={false}
              style={{ padding: "20px" }}
            >
              <h3 style={{ marginTop: 0 }}>Add Particulars</h3>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.FormControl}
                    error={isCategorySelected}
                  >
                    <Autocomplete
                      value={chargeCategory}
                      onChange={(e, value) => handleChargeCategory(e, value)}
                      options={props.data.GlobalData.ChargeCategory}
                      getOptionLabel={(option) => option.category_name}
                      renderOption={(option) => (
                        <React.Fragment>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <span>{option.category_name}</span>
                            <IconButton
                              onClick={(e) => onRemoveCategory(e, option)}
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          className={classes.AutoComplete}
                          {...params}
                          onKeyUp={onNewCategory}
                          label="Charge Category"
                          variant="outlined"
                        />
                      )}
                    />
                    {isCategorySelected ? (
                      <FormHelperText>Required</FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.FormControl}
                    error={isHeadSelected}
                  >
                    <Autocomplete
                      value={chargeHead}
                      onChange={(e, value) => handleChargeHead(e, value)}
                      options={props.data.GlobalData.ChargeHead}
                      getOptionLabel={(option) => option.head_name}
                      renderOption={(option) => (
                        <React.Fragment>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <span>{option.head_name}</span>
                            <IconButton
                              onClick={(e) => onRemoveHead(e, option)}
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          className={classes.AutoComplete}
                          {...params}
                          onKeyUp={onNewHead}
                          label="Charge Head"
                          variant="outlined"
                        />
                      )}
                    />
                    {isHeadSelected ? (
                      <FormHelperText>Required</FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    onChange={handleCheckChange}
                    control={<Checkbox name="checkedA" />}
                    label="Target Assesable Value for Commission"
                  />
                </Grid>
                {!isTarget ? (
                  <>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth={true}
                        variant={"outlined"}
                        size={"small"}
                        label="Voucher Amount"
                        className={classes.TextField}
                        value={voucherAmount}
                        onChange={handleVoucher}
                        disabled={!hasActualAmount}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth={true}
                        variant={"outlined"}
                        size={"small"}
                        label="Customer Amount"
                        className={classes.TextField}
                        value={customerAmount}
                        onChange={handleCustomerAmount}
                        disabled={!hasCustomerAmount}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth={true}
                        variant={"outlined"}
                        size={"small"}
                        label="Current Assessable Amount"
                        className={classes.TextField}
                        value={assessAmount}
                        onChange={handleAssesAmount}
                        // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth={true}
                        variant={"outlined"}
                        size={"small"}
                        label="Commission %"
                        className={classes.TextField}
                        value={commission}
                        onChange={handleCommission}
                        // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth={true}
                        variant={"outlined"}
                        size={"small"}
                        label="Customer Amount"
                        className={classes.TextField}
                        value={customerAmount}
                        onChange={handleCustomerAmount}

                        // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.addButton}
                  variant="contained"
                  color="primary"
                  onClick={addToParticulars}
                >
                  Add
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              variant={"outlined"}
              square={false}
              style={{ padding: "20px" }}
            >
              <h3 style={{ marginTop: 0 }}>Particulars of Charges</h3>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Category</TableCell>
                          <TableCell>Head</TableCell>
                          {hasActualAmount && (
                            <TableCell>Voucher Amount</TableCell>
                          )}
                          {hasCustomerAmount && (
                            <TableCell>Customer Amount</TableCell>
                          )}
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.data.GlobalData.Particulars.particulars_charges.map(
                          (row, index) => (
                            <TableRow key={`${row.category}-${index}`}>
                              <TableCell component="th" scope="row">
                                {row.category_name}
                              </TableCell>
                              <TableCell align="left">
                                {row.head_name}
                              </TableCell>
                              {hasActualAmount && (
                                <TableCell align="left">
                                  <TextField
                                    fullWidth={true}
                                    variant={"outlined"}
                                    size={"small"}
                                    className={classes.TextField}
                                    value={row.actual_amount}
                                    onBlur={(event) =>
                                      handleBlurVouc(event, index)
                                    }
                                    onChange={(event) =>
                                      editActualAmount(event, index)
                                    }
                                  />
                                </TableCell>
                              )}
                              {hasCustomerAmount && (
                                <TableCell align="left">
                                  <TextField
                                    fullWidth={true}
                                    variant={"outlined"}
                                    size={"small"}
                                    className={classes.TextField}
                                    value={row.customer_amount}
                                    onBlur={(event) =>
                                      handleBlurCust(event, index)
                                    }
                                    onChange={(event) =>
                                      editCustomerAmount(event, index)
                                    }
                                  />
                                </TableCell>
                              )}
                              <TableCell align="left">
                                <Tooltip
                                  title={"Delete"}
                                  placement={"top"}
                                  enterDelay={500}
                                >
                                  <IconButton
                                    size={"small"}
                                    // disabled={HasMasterSupplierRestriction || DeleteDisabled}
                                    className={classes.TableDeleteActionButton}
                                    onClick={() => onDeleteAction(index)}
                                  >
                                    <DeleteIcon fontSize={"small"} />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    variant={"outlined"}
                    square={false}
                    style={{ padding: "10px" }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <h3 style={{ marginTop: 0 }}>Payment</h3>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth={true}
                          variant={"outlined"}
                          size={"small"}
                          label="Total Customer Amount"
                          className={classes.TextField}
                          value={props.data.GlobalData.Particulars.totalAmount}
                          // onChange={props.onCodeChange}
                          readOnly
                          // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth={true}
                          variant={"outlined"}
                          size={"small"}
                          label="Advance Amount"
                          className={classes.TextField}
                          value={props.data.GlobalData.Particulars.paidAmount}
                          onChange={payAmount}
                          // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth={true}
                          variant={"outlined"}
                          size={"small"}
                          label="Due Amount"
                          className={classes.TextField}
                          value={props.data.GlobalData.Particulars.dueAmount}
                          // onChange={props.onCodeChange}
                          readOnly
                          // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

Particulars.propTypes = {
  // FormMode: PropTypes.any.isRequired,
  index: PropTypes.any,
  data: PropTypes.any,
  onAddCategory: PropTypes.func,
  onRemoveCategory: PropTypes.func,
  onAddHead: PropTypes.func,
  onRemoveHead: PropTypes.func,
};

function Attachments(props) {
  const { value, index, ...other } = props;
  const classes = useStyles();
  const [promptDialogTitle, setPromptDialogTitle] = React.useState("");
  const [promptDialogMessage, setPromptDialogMessage] = React.useState("");
  const [promptDialogShow, setPromptDialogShow] = React.useState(false);

  function handleFileUpload(e) {
    e.persist();
    const fileList = e.target.files;
    let temp = [...props.data.GlobalData.Attachment];
    for (let i = 0; i < fileList.length; i++) {
      temp.push(fileList[i]);
    }

    props.data.func.HandleAttachment(temp);
  }
  function removeFile(index) {
    let temp = [...props.data.GlobalData.Attachment];
    temp.splice(index, 1);
    props.data.func.HandleAttachment(temp);
  }

  function removeAll() {
    setPromptDialogTitle("Delete Attachment(s)");
    setPromptDialogMessage("Are you sure you want to delete attachment(s)");
    setPromptDialogShow(true);
  }
  function PDClose() {
    setPromptDialogShow(false);
  }

  function PDRunAction() {
    props.data.func.HandleFetchAttachment([]);
  }

  return (
    <div role="tabpanel">
      <Box p={3}>
        <br />
        {props.data.GlobalData.FormMode === "EDIT" ? (
          <Paper elevation={3} className={classes.uploadItem}>
            <Grid container spacing={2}>
              {props.data.GlobalData.FetchAttachment.map((item, i) => {
                return (
                  <Grid item xs={12} md={12} key={item}>
                    Attachment(s):{" "}
                    <a href={item} target="_blank" rel="noopener noreferrer">
                      {item}
                    </a>
                  </Grid>
                );
              })}
              <Grid item xs={12} md={12}>
                <Button
                  className={classes.addButton}
                  variant="contained"
                  color="secondary"
                  onClick={removeAll}
                >
                  Delete Attachments
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          ""
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <div className={classes.inputField}>
              <label>Add document files</label>
              <Button variant="contained" component="label">
                Upload File
                <input
                  accept=".pdf"
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileUpload}
                />
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {props.data.GlobalData.Attachment.length > 0
              ? props.data.GlobalData.Attachment.map((item, i) => {
                  return (
                    <Paper elevation={3} className={classes.uploadItem} key={i}>
                      <p>{item.name}</p>
                      <IconButton
                        aria-label="delete"
                        onClick={() => removeFile(i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  );
                })
              : ""}
          </Grid>
        </Grid>
      </Box>
      {promptDialogShow && (
        <PromptDialog
          title={promptDialogTitle}
          message={promptDialogMessage}
          onConfirm={PDRunAction}
          onClose={PDClose}
        />
      )}
    </div>
  );
}

Attachments.propTypes = {
  // FormMode: PropTypes.any.isRequired,
  index: PropTypes.any,
  data: PropTypes.any,
};

const Screen = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [BypassUnitOpen, setBypassUnitOpen] = React.useState(false);
  const [BypassPortOpen, setBypassPortOpen] = React.useState(false);
  const [BypassCurrencyOpen, setBypassCurrencyOpen] = React.useState(false);
  const [BypassBankOpen, setBypassBankOpen] = React.useState(false);
  const [BypassSupplierOpen, setBypassSupplierOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const FormMode = props.GlobalData.FormMode;

  const HasEditPermission = props.GlobalData.HasEditPermission;

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
      {FormMode === "VIEW" && HasEditPermission !== false && (
        <BarAlert
          type={"info"}
          message={"Edit this settings"}
          style={{ cursor: "pointer" }}
          onClick={() => props.func.HandleFormMode("EDIT")}
        />
      )}

      <div style={{ padding: "10px", marginTop: "20px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Paper variant={"outlined"} square={false}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Bill Info" />
                  <Tab label="Job Details" />
                  <Tab label="Particulars" />
                  <Tab label="Attachments" />
                </Tabs>
              </AppBar>
              <TabPanel FormMode={FormMode} value={value} index={0}>
                <BillInfo
                  data={props}
                  onAddDocList={props.onAddDocList}
                  onRemoveDocList={props.onRemoveDocList}
                  setBypassBankOpen={setBypassBankOpen}
                  setBypassSupplierOpen={setBypassSupplierOpen}
                />
              </TabPanel>
              <TabPanel FormMode={FormMode} value={value} index={1}>
                <JobDetails
                  data={props}
                  setBypassUnitOpen={setBypassUnitOpen}
                  setBypassCurrencyOpen={setBypassCurrencyOpen}
                  setBypassPortOpen={setBypassPortOpen}
                />
              </TabPanel>
              <TabPanel FormMode={FormMode} value={value} index={2}>
                <Particulars
                  data={props}
                  onAddCategory={props.onAddCategory}
                  onRemoveCategory={props.onRemoveCategory}
                  onAddHead={props.onAddHead}
                  onRemoveHead={props.onRemoveHead}
                />
              </TabPanel>
              <TabPanel FormMode={FormMode} value={value} index={3}>
                <Attachments data={props} />
              </TabPanel>
            </Paper>
            <p>
              <strong>ESC</strong> = Exit, <strong>CTRL+S</strong> = Save,
              <strong> CTRL+B</strong> = Bill Info, <strong>CTRL+J</strong> =
              Job Details, <strong>CTRL+P</strong> = Particulars,{" "}
              <strong>CTRL+U</strong> = Attachments
            </p>
          </Grid>
        </Grid>
      </div>

      <FullScreenDialog
        open={BypassUnitOpen}
        title={"Select unit"}
        onClose={() => {
          setBypassUnitOpen(false);
          props.onUnitListReloadCommand();
        }}
      >
        <div style={{ padding: "20px" }}>
          <Unit BypassMode={true} />
        </div>
      </FullScreenDialog>

      <FullScreenDialog
        open={BypassCurrencyOpen}
        title={"Select Currency"}
        onClose={() => {
          setBypassCurrencyOpen(false);
          props.onCurrencyListReloadCommand();
        }}
      >
        <div style={{ padding: "20px" }}>
          <Currency BypassMode={true} />
        </div>
      </FullScreenDialog>

      <FullScreenDialog
        open={BypassPortOpen}
        title={"Select port"}
        onClose={() => {
          setBypassPortOpen(false);
          props.onPortListReloadCommand();
        }}
      >
        <div style={{ padding: "20px" }}>
          <Port BypassMode={true} />
        </div>
      </FullScreenDialog>

      <FullScreenDialog
        open={BypassBankOpen}
        title={"Select Bank"}
        onClose={() => {
          setBypassBankOpen(false);
          props.onBankListReloadCommand();
        }}
      >
        <div style={{ padding: "20px" }}>
          <Banks BypassMode={true} />
        </div>
      </FullScreenDialog>

      <FullScreenDialog
        open={BypassSupplierOpen}
        title={"Select Supplier"}
        onClose={() => {
          setBypassSupplierOpen(false);
          props.onSupplierListReloadCommand();
        }}
      >
        <div style={{ padding: "20px" }}>
          <Suppliers BypassMode={true} />
        </div>
      </FullScreenDialog>
    </React.Fragment>
  );
};

Screen.propTypes = {
  onAddDocList: PropTypes.func,
  onRemoveDocList: PropTypes.func,
  onAddCategory: PropTypes.func,
  onRemoveCategory: PropTypes.func,
  onAddHead: PropTypes.func,
  onRemoveHead: PropTypes.func,
  onUnitListReloadCommand: PropTypes.func,
  onCurrencyListReloadCommand: PropTypes.func,
  onPortListReloadCommand: PropTypes.func,
  onBankListReloadCommand: PropTypes.func,
  onSupplierListReloadCommand: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    GlobalData: state.ImportBill,
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
    },
  };
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export { _Screen as Screen };
