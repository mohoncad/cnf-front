import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { APP } from "../../../App/AppProvider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
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
  HandleUnitList,
  HandleQuantity,
  HandleDescription,
  HandleTransportType,
  HandleTransportList,
  HandleVehicleNo,
  HandleDriverName,
  HandleFrom,
  HandleTo,
  HandleParticulars,
  HandleParticularTotalAmount,
  HandleParticularPaidAmount,
  HandleParticularDueAmount,
} from "../../../Global/Data/Actions/Private/TransportBill/TransportBill.Action";
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
import BarAlert from "../../../Components/Common/BarAlert/BarAlert";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Unit from "../../../Pages/Private/Unit/Unit";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "date-fns";
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
  AutoComplete: {
    "& .MuiInputBase-root": {
      padding: "0",
    },
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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function BillInfo(props) {
  const { value, index, ...other } = props;
  const classes = useStyles();

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
          "/company/transport/getUpdatedCode?client_id=" +
          client.id,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          let code = `TPB_${client.CodePrefix}${response.data.transportbill_newCode}`;
          handleBillCode(code);
        }
      });
  }
  const handleClientAddress = (e) => {
    props.data.func.HandleClientAddress(e.target.value);
  };
  const handleBillCode = (e) => {
    props.data.func.HandleBillCode(e);
  };
  const handleBillDate = (e) => {
    props.data.func.HandleBillDate(e);
  };
  const handleDeliveryNo = (e) => {
    if (e.target.value) {
      props.data.func.HandleDeliverNo(e.target.value);
    }
  };
  const handleDeliverDate = (e) => {
    props.data.func.HandleDeliverDate(e);
  };

  const handleTransportNo = (e) => {
    if (e.target.value) {
      props.data.func.HandleTransportNo(e.target.value);
    }
  };
  const handleTransportDate = (e) => {
    props.data.func.HandleTransportDate(e);
  };
  const handleLcNo = (e) => {
    if (e.target.value) {
      props.data.func.HandleLCNo(e.target.value);
    }
  };
  const handleLcDate = (e) => {
    props.data.func.HandleLCDate(e);
  };

  const handleBeNo = (e) => {
    if (e.target.value) {
      props.data.func.HandleBENo(e.target.value);
    }
  };
  const handleBeDate = (e) => {
    props.data.func.HandleBEDate(e);
  };

  const handleUnit = (e, value) => {
    props.data.func.HandleUnit(value);
  };

  const handleQuantity = (e) => {
    if (e.target.value) {
      props.data.func.HandleQuantity(e.target.value);
    }
  };
  const handleDescription = (e) => {
    if (e.target.value) {
      props.data.func.HandleDescription(e.target.value);
    }
  };
  const handleTransportType = (e, value) => {
    if (value) {
      props.data.func.HandleTransportType(value);
    }
  };
  const handleVehichleNo = (e) => {
    if (e.target.value) {
      props.data.func.HandleVehicleNo(e.target.value);
    }
  };
  const handleDriverName = (e) => {
    if (e.target.value) {
      props.data.func.HandleDriverName(e.target.value);
    }
  };
  const handleFrom = (e, value) => {
    if (value) {
      props.data.func.HandleFrom(value);
    }
  };
  const handleTo = (e, value) => {
    if (value) {
      props.data.func.HandleTo(value);
    }
  };
  const onRemoveLocation = (e, value) => {
    e.stopPropagation();
    props.onRemoveLocation(value.id);
  };
  const onAddLocation = (e, value) => {
    if (e.keyCode === 13) {
      props.onAddLocation(e.target.value);
    }
  };

  const handleHoldingNo = (e) => {
    if (e.target.value) {
      props.data.func.HandleHoldingNo(e.target.value);
    }
  };
  const handleHoldingDate = (e) => {
    props.data.func.HandleHoldingDate(e);
  };
  const handleJobNo = (e) => {
    if (e.target.value) {
      props.data.func.HandleJobNo(e.target.value);
    }
  };
  const handleJobDate = (e) => {
    props.data.func.HandleJobDate(e);
  };
  const handleAwbNo = (e) => {
    if (e.target.value) {
      props.data.func.HandleAWBNo(e.target.value);
    }
  };
  const onAddTransportType = (e) => {
    if (e.keyCode === 13) {
      props.onAddTransportType(e.target.value);
    }
  };

  const onRemoveTransportType = (e, value) => {
    e.stopPropagation();
    props.onRemoveTransportType(value.id);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <h3 style={{ marginTop: 0 }}>Bill Details</h3>
              <br />
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
                        id="combo-box-demo"
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
                      disabled
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
                        id="date-picker-inline"
                        label="Bill Date"
                        value={props.data.GlobalData.BillInfo.BillDate}
                        onChange={handleBillDate}
                        required
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
                      label="Delivery Challan No"
                      className={classes.TextField}
                      value={props.data.GlobalData.BillInfo.DeliveryChallanNo}
                      onChange={handleDeliveryNo}
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
                        id="date-picker-inline"
                        label="Delivery Challan Date"
                        value={props.data.GlobalData.BillInfo.DeliveryDate}
                        onChange={handleDeliverDate}
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
                      label="Transport Challan No"
                      className={classes.TextField}
                      value={props.data.GlobalData.BillInfo.TransportChallanNo}
                      onChange={handleTransportNo}
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
                        id="date-picker-inline"
                        label="Transport Challan Date"
                        value={props.data.GlobalData.BillInfo.TransportDate}
                        onChange={handleTransportDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth={true}
                          variant={"outlined"}
                          size={"small"}
                          label="LC No"
                          className={classes.TextField}
                          value={props.data.GlobalData.BillInfo.lc_no}
                          onChange={handleLcNo}
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
                            id="date-picker-inline"
                            label="LC Date"
                            value={props.data.GlobalData.BillInfo.lc_date}
                            onChange={handleLcDate}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth={true}
                          variant={"outlined"}
                          size={"small"}
                          label="B/E No"
                          className={classes.TextField}
                          value={props.data.GlobalData.BillInfo.be_no}
                          onChange={handleBeNo}
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
                            id="date-picker-inline"
                            label="B/E Date"
                            value={props.data.GlobalData.BillInfo.be_date}
                            onChange={handleBeDate}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth={true}
                          variant={"outlined"}
                          size={"small"}
                          label="Holding No"
                          className={classes.TextField}
                          value={props.data.GlobalData.BillInfo.holding_no}
                          onChange={handleHoldingNo}
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
                            id="date-picker-inline"
                            label="Holding Date"
                            value={props.data.GlobalData.BillInfo.holding_date}
                            onChange={handleHoldingDate}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth={true}
                          variant={"outlined"}
                          size={"small"}
                          label="Job No"
                          className={classes.TextField}
                          value={props.data.GlobalData.BillInfo.job_no}
                          onChange={handleJobNo}
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
                            id="date-picker-inline"
                            label="Job Date"
                            value={props.data.GlobalData.BillInfo.job_date}
                            onChange={handleJobDate}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth={true}
                      variant={"outlined"}
                      size={"small"}
                      label="AWB No"
                      className={classes.TextField}
                      value={props.data.GlobalData.BillInfo.awb_no}
                      onChange={handleAwbNo}
                      // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <h3 style={{ marginTop: 0 }}>Package & Transport Details</h3>
              <br />
              <Paper
                variant={"outlined"}
                square={false}
                style={{ padding: "20px" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={10} md={5}>
                    <FormControl
                      required
                      variant="outlined"
                      className={classes.FormControl}
                    >
                      <Autocomplete
                        value={props.data.GlobalData.BillInfo.unit_id}
                        onChange={(e, value) => handleUnit(e, value)}
                        id="combo-box-demo"
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
                      value={props.data.GlobalData.BillInfo.quantity}
                      onChange={handleQuantity}
                      // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      variant={"outlined"}
                      size={"small"}
                      label="Description"
                      className={classes.TextField}
                      value={props.data.GlobalData.BillInfo.description}
                      onChange={handleDescription}
                      // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      required
                      variant="outlined"
                      className={classes.FormControl}
                    >
                      <Autocomplete
                        value={props.data.GlobalData.BillInfo.transport_type}
                        onChange={(e, value) => handleTransportType(e, value)}
                        id="combo-box-demo"
                        options={props.data.GlobalData.TransportTypeList}
                        getOptionLabel={(option) => option.vehicle_name}
                        renderOption={(option) => {
                          return (
                            <React.Fragment>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <span>{option.vehicle_name}</span>
                                <IconButton
                                  onClick={(e) =>
                                    onRemoveTransportType(e, option)
                                  }
                                  aria-label="delete"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </div>
                            </React.Fragment>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            className={classes.AutoComplete}
                            {...params}
                            onKeyUp={onAddTransportType}
                            label="Transport Type"
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
                      label=" 
                      Vehicle Reg No"
                      className={classes.TextField}
                      value={props.data.GlobalData.BillInfo.vehicle_reg_no}
                      onChange={handleVehichleNo}
                      // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      variant={"outlined"}
                      size={"small"}
                      label="Driver Name"
                      className={classes.TextField}
                      value={props.data.GlobalData.BillInfo.driver_name}
                      onChange={handleDriverName}
                      // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      required
                      variant="outlined"
                      className={classes.FormControl}
                    >
                      <Autocomplete
                        value={props.data.GlobalData.BillInfo.from}
                        onChange={(e, value) => handleFrom(e, value)}
                        id="combo-box-demo"
                        options={props.data.GlobalData.LocationList}
                        getOptionLabel={(option) => option.location_name}
                        renderOption={(option) => (
                          <React.Fragment>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <span>{option.location_name}</span>
                              <IconButton
                                onClick={(e) => onRemoveLocation(e, option)}
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
                            onKeyUp={onAddLocation}
                            label="From"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      required
                      variant="outlined"
                      className={classes.FormControl}
                    >
                      <Autocomplete
                        value={props.data.GlobalData.BillInfo.to}
                        onChange={(e, value) => handleTo(e, value)}
                        id="combo-box-demo"
                        options={props.data.GlobalData.LocationList}
                        getOptionLabel={(option) => option.location_name}
                        renderOption={(option) => (
                          <React.Fragment>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <span>{option.location_name}</span>
                              <IconButton
                                onClick={(e) => onRemoveLocation(e, option)}
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
                            onKeyUp={onAddLocation}
                            label="To"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

BillInfo.propTypes = {
  // FormMode: PropTypes.any.isRequired,
  data: PropTypes.any,
  setBypassUnitOpen: PropTypes.func,
  onAddTransportType: PropTypes.func,
  onRemoveTransportType: PropTypes.func,
  onAddLocation: PropTypes.func,
  onRemoveLocation: PropTypes.func,
};

function Particulars(props) {
  const { value, index, ...other } = props;
  const classes = useStyles();
  const [chargeHead, setChargeHead] = React.useState(null);
  const [voucherAmount, setVoucherAmount] = React.useState(0.0);
  const [isHeadSelected, setIsHeadSelected] = React.useState(false);

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
  const onDeleteAction = (index) => {
    let tempArray = [...props.data.GlobalData.Particulars.particulars_charges];
    tempArray.splice(index, 1);
    props.data.func.HandleParticulars(tempArray);
    reset();
    computeTotal(tempArray);
  };
  const addToParticulars = () => {
    if (chargeHead === null) {
      setIsHeadSelected(true);
      return;
    }
    let tempArray = [...props.data.GlobalData.Particulars.particulars_charges];
    let payload = {
      head_name: chargeHead.head_name,
      amount: voucherAmount,
    };
    tempArray.push(payload);
    props.data.func.HandleParticulars(tempArray);
    reset();
    computeTotal(tempArray);
  };
  const reset = () => {
    setVoucherAmount(0.0);
    // setChargeHead(null);
    // setIsHeadSelected(false);
  };
  const computeTotal = (tempArray) => {
    const total = tempArray.reduce((acc, currVal) => {
      if (currVal.amount === "") {
        return acc + 0;
      }
      return acc + parseFloat(currVal.amount);
    }, 0.0);
    props.data.func.HandleParticularTotalAmount(stringToNum(total));
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
      props.data.func.HandleParticularDueAmount(stringToNum(paymentDue));
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
      props.data.func.HandleParticularDueAmount(stringToNum(paymentDue));
    }
  };

  const editAmount = (e, index) => {
    let data = [...props.data.GlobalData.Particulars.particulars_charges];
    data[index].amount = e.target.value;

    props.data.func.HandleParticulars(data);
    computeTotal(data);
  };

  const stringToNum = (str) => {
    return decimalFix(parseFloat(str));
  };
  const decimalFix = (num) => {
    return num.toFixed(2);
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
                    error={isHeadSelected}
                  >
                    <Autocomplete
                      value={chargeHead}
                      onChange={(e, value) => handleChargeHead(e, value)}
                      id="combo-box-demo"
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
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Amount"
                    className={classes.TextField}
                    value={voucherAmount}
                    onChange={handleVoucher}
                    // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
                  />
                </Grid>
                <Grid
                  style={{ display: "flex" }}
                  item
                  xs={12}
                  justify="flex-end"
                >
                  <Button
                    className={classes.addButton}
                    variant="contained"
                    color="primary"
                    onClick={addToParticulars}
                  >
                    Add
                  </Button>
                </Grid>
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
                          <TableCell>Head</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.data.GlobalData.Particulars.particulars_charges.map(
                          (row, index) => (
                            <TableRow key={`${row.head_name}-${index}`}>
                              <TableCell component="th" scope="row">
                                {row.head_name}
                              </TableCell>
                              <TableCell align="left">
                                <TextField
                                  fullWidth={true}
                                  variant={"outlined"}
                                  size={"small"}
                                  className={classes.TextField}
                                  value={row.amount}
                                  onChange={(event) => editAmount(event, index)}
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
  data: PropTypes.any,
  onAddHead: PropTypes.func,
  onRemoveHead: PropTypes.func,
};

const Screen = (props) => {
  const [value, setValue] = React.useState(0);
  const [BypassUnitOpen, setBypassUnitOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const FormMode = props.GlobalData.FormMode;

  const HasEditPermission = props.GlobalData.HasEditPermission;

  function keyDownHandler(e) {
    if (e.keyCode === 66 && e.ctrlKey) {
      e.preventDefault();
      handleChange(e, 0);
    } else if (e.keyCode === 80 && e.ctrlKey) {
      e.preventDefault();
      handleChange(e, 1);
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
                  <Tab label="Particulars" />
                </Tabs>
              </AppBar>
              <TabPanel FormMode={FormMode} value={value} index={0}>
                <BillInfo
                  data={props}
                  setBypassUnitOpen={setBypassUnitOpen}
                  onAddTransportType={props.onAddTransportType}
                  onRemoveTransportType={props.onRemoveTransportType}
                  onAddLocation={props.onAddLocation}
                  onRemoveLocation={props.onRemoveLocation}
                />
              </TabPanel>
              <TabPanel FormMode={FormMode} value={value} index={1}>
                <Particulars
                  data={props}
                  onAddHead={props.onAddHead}
                  onRemoveHead={props.onRemoveHead}
                />
              </TabPanel>
            </Paper>
            <p>
              <strong>ESC</strong> = Exit, <strong>CTRL+S</strong> = Save,
              <strong> CTRL+B</strong> = Bill Info, <strong>CTRL+P</strong> =
              Particulars,
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
    </React.Fragment>
  );
};
Screen.propTypes = {
  onAddHead: PropTypes.func,
  onRemoveHead: PropTypes.func,
  onUnitListReloadCommand: PropTypes.func,
  onAddTransportType: PropTypes.func,
  onRemoveTransportType: PropTypes.func,
  onAddLocation: PropTypes.func,
  onRemoveLocation: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    GlobalData: state.TransportBill,
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
      HandleUnitList: (payload) => {
        dispatch(HandleUnitList(payload));
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
      HandleTransportList: (payload) => {
        dispatch(HandleTransportList(payload));
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
    },
  };
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export { _Screen as Screen };
