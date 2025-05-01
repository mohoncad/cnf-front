import React from "react";
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
import Select from "@material-ui/core/Select";
import {
  // HandleBranchList,
  // HandleCode,
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
} from "../../../Global/Data/Actions/Private/BillSummary/BillSummary.Action";
import BarAlert from "../../../Components/Common/BarAlert/BarAlert";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

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

const Screen = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [client, setClient] = React.useState("");
  const [billType, setBillType] = React.useState("");
  const [fromDate, setFromDate] = React.useState(props.GlobalData.FromDate);
  const [toDate, setToDate] = React.useState(props.GlobalData.ToDate);

  const auth_user = new APP.SERVICES.SessionUser().GetProfile();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleClient(e, value) {
    props.func.HandleClient(value);
    setClient(value);

    props.func.HandleSubject(value?.Name);

    if (
      props.GlobalData.BillType !== "" &&
      props.GlobalData.FromDate !== null
    ) {
      GetBillList(value, billType, fromDate, toDate === null ? "" : toDate);
    } else if (props.GlobalData.BillType !== "") {
      createCode(value, billType);
    }
  }
  function handleBillType(e) {
    props.func.HandleBillType(e.target.value);
    setBillType(e.target.value);

    if (props.GlobalData.Client !== "" && props.GlobalData.FromDate !== null) {
      GetBillList(
        client,
        e.target.value,
        fromDate,
        toDate === null ? "" : toDate
      );
    } else if (props.GlobalData.Client !== "") {
      createCode(client, e.target.value);
    }
  }
  function handleFromDate(e) {
    props.func.HandleFromDate(e);
    const date = convertDate(e);
    setFromDate(date);

    if(props.GlobalData.FormMode === "EDIT") {
      GetBillList(props.GlobalData.Client, props.GlobalData.BillType, date, toDate === null ? "" : toDate);
    } else {
      if (props.GlobalData.Client !== "" && props.GlobalData.BillType !== "") {
        GetBillList(client, billType, date, toDate === null ? "" : toDate);
      }
    }
  }
  function handleToDate(e) {
    props.func.HandleToDate(e);
    const date = convertDate(e);
    setToDate(date);
    
    if(props.GlobalData.FormMode === "EDIT") {
      GetBillList(props.GlobalData.Client, props.GlobalData.BillType, convertDate(props.GlobalData.FromDate),  date === null ? "" : date);
    } else {
      if (
        props.GlobalData.Client !== "" &&
        props.GlobalData.BillType !== "" &&
        props.GlobalData.FromDate
      ) {
        GetBillList(client, billType, fromDate, date === null ? "" : date);
      }
    }
   
  }

  async function createCode(client, billtype) {
    await axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/BillSummary/getUpdatedCode?client_id=" +
          client.id + "&billtype=" + billtype,
        {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          let code = "";
          if (client && billtype) {
            switch (billtype) {
              case "Import":
                code = `SUM_IMB_${client.CodePrefix}${response.data.billSummary_newCode}`;
                break;
              case "Export":
                code = `SUM_EXB_${client.CodePrefix}${response.data.billSummary_newCode}`;
                break;
              case "Transport":
                code = `SUM_TPB_${client.CodePrefix}${response.data.billSummary_newCode}`;
                break;
              default:
                code = "";
                break;
            }
          }
          props.func.HandleSummaryCode(code);
        }
      });
  }
  function handleSummaryCode(e) {
    props.func.HandleSummaryCode(e.target.value);
  }
  function handleSubject(e) {
    props.func.HandleSubject(e.target.value);
  }
  function convertDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }
  function GetBillList(cli, type, from = null, to = "") {
    axios
      .get(
        APP.ENV.URL.API.ROOT +
          "/company/BillSummary/getBillList?client_id=" +
          cli.id +
          "&bill_type=" +
          type +
          "&from_date=" +
          from +
          "&to_date=" +
          to,
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
              bill_date:
                item.bill_date !== "null" ? reformatDate(item.bill_date) : "",
              isSelected: item.valid === 0,
              isDisabled: item.valid === 0,
            };
            return temp;
          });
          props.func.HandleList(tempArry);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
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
  const reformatDate = (date) => {
    const [yyyy, mm, dd] = date.split("-");
    return `${dd}/${mm}/${yyyy}`;
  };

  const handleSelectAll = (event) => {
    const tempArry = props.GlobalData.BillList.map((item) => {
      const temp = {
        ...item,
        isSelected: event.target.checked,
      };
      if (item.isDisabled) temp.isSelected = true;

      return temp;
    });
    props.func.HandleList(tempArry);
  };

  function handleSingle(row) {
    const tempArry = props.GlobalData.BillList.map((bill) => {
      if (bill.bill_code === row.bill_code) {
        bill.isSelected = !bill.isSelected;
      }
      return bill;
    });
    props.func.HandleList(tempArry);
  }

  const FormMode = props.GlobalData.FormMode;

  const HasEditPermission = props.GlobalData.HasEditPermission;
  const FormDisabled = FormMode === "VIEW" || FormMode === "EDIT";
  // const MasterFlagDisabled = (FormMode === 'ADD' && Number(auth_user.IsMasterUser) === 0) || FormDisabled || (FormMode === 'EDIT' && MasterFlagEditPermission === false);

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

      <div style={{ padding: "15px", marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={2}>
            <FormControl
              required
              variant="outlined"
              className={classes.FormControl}
              disabled={FormDisabled}
            >
              <Autocomplete
              disabled={FormDisabled}

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
          <Grid item xs={6} md={2}>
            <FormControl
              required
              variant="outlined"
              className={classes.FormControl}
            >
              <InputLabel>Bill Type</InputLabel>
              <Select
                value={props.GlobalData.BillType}
                onChange={handleBillType}
                label="Bill Type"
                disabled={FormDisabled}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {props.GlobalData.BillTypeList.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
                label="From Date"
                value={props.GlobalData.FromDate}
                onChange={handleFromDate}
                required
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
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
                label="To Date"
                value={props.GlobalData.ToDate}
                onChange={handleToDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={6} md={2}>
            <TextField
              fullWidth={true}
              variant={"outlined"}
              size={"small"}
              label="Summary Code"
              className={classes.TextField}
              value={props.GlobalData.SummaryCode}
              onChange={handleSummaryCode}
              required
              disabled={FormDisabled}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              fullWidth={true}
              variant={"outlined"}
              size={"small"}
              label="Subject"
              className={classes.TextField}
              value={props.GlobalData.Subject}
              onChange={handleSubject}
              required
              // disabled={FormMode === 'VIEW' || FormMode === 'EDIT'}
            />
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        style={{ width: "5%" }}
                        color="primary"
                        onChange={handleSelectAll}
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </TableCell>

                    <TableCell>Bill Code</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Advance</TableCell>
                    <TableCell>Due</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.GlobalData.BillList.map((row) => (
                    <TableRow key={row.bill_code}>
                      <TableCell>
                        <Checkbox
                          style={{ width: "5%" }}
                          checked={row.isSelected}
                          color="primary"
                          disabled={row.isDisabled}
                          onChange={() => handleSingle(row)}
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.bill_code}
                      </TableCell>
                      <TableCell align="left">{row.bill_date}</TableCell>
                      <TableCell align="left">{row.total_amount}</TableCell>
                      <TableCell align="left">{row.paid_amount}</TableCell>
                      <TableCell align="left">{row.due_amount}</TableCell>
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
    GlobalData: state.BillSummary,
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
      HandleList: (payload) => {
        dispatch(HandleList(payload));
      },
      HandleDataGridShouldReload: (value) => {
        dispatch(HandleDataGridShouldReload(value));
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
    },
  };
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export { _Screen as Screen };
