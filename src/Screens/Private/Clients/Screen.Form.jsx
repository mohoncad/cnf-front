import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { APP } from "../../../App/AppProvider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  HandleBranchList,
  HandleCode,
  HandleDataGridShouldReload,
  HandleGroup,
  HandleFormMode,
  HandleFormOpen,
  HandleName,
  HandleCodePrefix,
  HandleMobile,
  HandleRegistration,
  HandleVatDoc,
  HandleQuotationDoc,
} from "../../../Global/Data/Actions/Private/ClientsForm/ClientsForm.Action";
import BarAlert from "../../../Components/Common/BarAlert/BarAlert";
import PromptDialog from "../../../Components/Common/PromptDialog/PromptDialog";

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

const Screen = (props) => {
  const classes = useStyles();

  const [promptDialogTitle, setPromptDialogTitle] = React.useState("");
  const [promptDialogMessage, setPromptDialogMessage] = React.useState("");
  const [promptDialogShow, setPromptDialogShow] = React.useState(false);

  const VatCopyPdf = (e) => {
    e.persist();
    props.onVatChange(e);
  };
  const QuotationDoc = (e) => {
    e.preventDefault();
    props.onQuoteChange(e);
  };

  function removeAll() {
    setPromptDialogTitle("Delete Attachment(s)");
    setPromptDialogMessage("Are you sure you want to delete attachment(s)");
    setPromptDialogShow(true);
  }

  function PDClose() {
    setPromptDialogShow(false);
  }
  function PDRunAction() {
    props.onVatChange();
    props.onQuoteChange();
  }

  const FormMode = props.GlobalData.FormMode;

  const HasEditPermission = props.GlobalData.HasEditPermission;

  const FormDisabled =
    FormMode === "VIEW" || (FormMode === "EDIT" && HasEditPermission === false);

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
          <Grid item xs={12} sm={6}>
            <Paper
              variant={"outlined"}
              square={false}
              style={{ padding: "20px" }}
            >
              <h3 style={{ marginTop: 0 }}>Personal Information</h3>

              <br />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Client Code"
                    className={classes.TextField}
                    value={props.GlobalData.Code}
                    disabled
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.FormControl}
                  >
                    <InputLabel>Client Group</InputLabel>
                    <Select
                      value={props.GlobalData.ClientGroupID}
                      onChange={props.onClientGroupChange}
                      label="Client Group"
                      disabled={FormDisabled}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {props.GlobalData.GroupList.map((item) => (
                        <MenuItem value={item.id} key={item.id + item.Name}>
                          {item.Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Clients Name"
                    className={classes.TextField}
                    value={props.GlobalData.Name}
                    onChange={props.onNameChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Client's Code Prefix (3 Char)"
                    className={classes.TextField}
                    value={props.GlobalData.CodePrefix}
                    onChange={props.onCodePrefixChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Mailing Address"
                    className={classes.TextField}
                    value={props.GlobalData.MailingAddress}
                    onChange={props.onMailingChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Fax"
                    className={classes.TextField}
                    value={props.GlobalData.Fax}
                    onChange={props.onFaxChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Phone"
                    className={classes.TextField}
                    value={props.GlobalData.Phone}
                    onChange={props.onPhoneChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Mobile"
                    className={classes.TextField}
                    value={props.GlobalData.Mobile}
                    onChange={props.onMobileChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Email"
                    className={classes.TextField}
                    value={props.GlobalData.Email}
                    onChange={props.onEmailChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Web"
                    className={classes.TextField}
                    value={props.GlobalData.Web}
                    onChange={props.onWebChange}
                    disabled={FormDisabled}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              variant={"outlined"}
              square={false}
              style={{ padding: "20px" }}
            >
              <h3 style={{ marginTop: 0 }}>Others</h3>

              <br />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="IRC"
                    className={classes.TextField}
                    value={props.GlobalData.IRC}
                    onChange={props.onIrcChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="ERC"
                    className={classes.TextField}
                    value={props.GlobalData.ERC}
                    onChange={props.onErcChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="BIN/VAT"
                    className={classes.TextField}
                    value={props.GlobalData.BIN}
                    onChange={props.onBinChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="TIN"
                    className={classes.TextField}
                    value={props.GlobalData.TIN}
                    onChange={props.onTinChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Bond License"
                    className={classes.TextField}
                    value={props.GlobalData.BondLisc}
                    onChange={props.onBondLisChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="BOI Reg."
                    className={classes.TextField}
                    value={props.GlobalData.BOI}
                    onChange={props.onBoiChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Gen. Bond"
                    className={classes.TextField}
                    value={props.GlobalData.GenBond}
                    onChange={props.onGenBondChange}
                    disabled={FormDisabled}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth={true}
                    variant={"outlined"}
                    size={"small"}
                    label="Note"
                    className={classes.TextField}
                    value={props.GlobalData.Note}
                    onChange={props.onNoteChange}
                    disabled={FormDisabled}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Paper
              variant={"outlined"}
              square={false}
              style={{ padding: "20px" }}
            >
              <h3 style={{ marginTop: 0 }}>Documents</h3>
              <br />
              {props.GlobalData.FormMode === "EDIT" ||
              props.GlobalData.FormMode === "VIEW" ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>

                    Attachment(s):{" "}
                    </Grid>
                  <Grid item xs={12} md={12}>
                    <a
                      href={props.GlobalData.VatDoc}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {props.GlobalData.VatDoc}
                    </a>
                    <br />
                    <a
                      href={props.GlobalData.QuotationDoc}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {props.GlobalData.QuotationDoc}
                    </a>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {props.GlobalData.FormMode === "EDIT" && (
                      <Button
                        className={classes.addButton}
                        variant="contained"
                        color="secondary"
                        onClick={removeAll}
                      >
                        Delete Attachments
                      </Button>
                    )}
                  </Grid>
                </Grid>
              ) : (
                ""
              )}
              <br />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <div className={classes.inputField}>
                    <label>VAT Reg. Copy (*pdf file)</label>
                    <Button
                      variant="contained"
                      component="label"
                      disabled={FormDisabled}
                    >
                      Upload File
                      <input
                        accept=".pdf"
                        type="file"
                        hidden
                        onChange={VatCopyPdf}
                      />
                    </Button>
                    {
                      // props.GlobalData.VatDoc ? <p>{props.GlobalData.VatDoc}</p> : ""
                    }
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={classes.inputField}>
                    <label>Quotation (*.doc file)</label>

                    <Button
                      variant="contained"
                      component="label"
                      disabled={FormDisabled}
                    >
                      Upload File
                      <input
                        type="file"
                        hidden
                        accept=".doc"
                        onChange={QuotationDoc}
                      />
                    </Button>
                    {
                      // props.GlobalData.QuotationDoc ? <p>{props.GlobalData.QuotationDoc}</p> : ""
                    }
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {promptDialogShow && (
          <PromptDialog
            title={promptDialogTitle}
            message={promptDialogMessage}
            onConfirm={PDRunAction}
            onClose={PDClose}
          />
        )}
      </div>
    </React.Fragment>
  );
};

Screen.propTypes = {
  onCodeChange: PropTypes.func,
  onNameChange: PropTypes.func,
  onMailingChange: PropTypes.func,
  onPhoneChange: PropTypes.func,
  onEmailChange: PropTypes.func,
  onClientGroupChange: PropTypes.func,
  onCodePrefixChange: PropTypes.func,
  onFaxChange: PropTypes.func,
  onMobileChange: PropTypes.func,
  onWebChange: PropTypes.func,
  onIrcChange: PropTypes.func,
  onBinChange: PropTypes.func,
  onBondLisChange: PropTypes.func,
  onGenBondChange: PropTypes.func,
  onErcChange: PropTypes.func,
  onTinChange: PropTypes.func,
  onBoiChange: PropTypes.func,
  onNoteChange: PropTypes.func,
  onQuoteChange: PropTypes.func,
  onVatChange: PropTypes.func,
  onGroupChange: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    GlobalData: state.ClientsForm,
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
      HandleGroup: (payload) => {
        dispatch(HandleGroup(payload));
      },
      HandleEmail: (payload) => {
        dispatch(HandleCode(payload));
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
      HandleVatDoc: (payload) => {
        dispatch(HandleVatDoc(payload));
      },
      HandleQuotationDoc: (payload) => {
        dispatch(HandleQuotationDoc(payload));
      },
    },
  };
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export { _Screen as Screen };
