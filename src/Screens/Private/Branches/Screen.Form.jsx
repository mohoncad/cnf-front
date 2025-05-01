import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { APP } from "../../../App/AppProvider";
import Button from "@material-ui/core/Button";

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    padding: "12px",
    marginBottom: theme.spacing(2),
  },
  TextField: {
    "& .MuiOutlinedInput-root": {
      color: "#000000",
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
}));

const Screen = (props) => {
  const classes = useStyles();
  const AddPermission =
  Number(
    new APP.SERVICES.UAP().GetModulePermissions(APP.CONFIG.MODULE[3])
      .Add
  ) === 1;
  const EditPermission =
  Number(
    new APP.SERVICES.UAP().GetModulePermissions(APP.CONFIG.MODULE[3])
      .Edit
  ) === 1;
  const handleBranchSubmit = (e) => {
    e.preventDefault();
    props.onSave();
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} variant={"elevation"} elevation={1}>
        <form onSubmit={handleBranchSubmit}>
          {!props.viewMode ? (
            <h3 style={{ margin: 0 }}>
              {!props.EditMode ? "Add Branch" : "Edit Branch"}
            </h3>
          ) : (
            ""
          )}
          <div style={{ marginTop: "10px" }}>
            <TextField
              fullWidth={true}
              label="Code"
              variant={"outlined"}
              size={"small"}
              className={classes.TextField}
              InputProps={{
                readOnly: true,
              }}
              disabled={props.FormMode === "EDIT" || props.FormMode === "VIEW"}
              value={props.Code}
              onChange={props.onCodeChange}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              required
              fullWidth={true}
              label="Branch Name"
              variant={"outlined"}
              size={"small"}
              className={classes.TextField}
              disabled={props.FormMode === "VIEW"}
              value={props.Name}
              onChange={props.onNameChange}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              fullWidth={true}
              label="Address"
              variant={"outlined"}
              size={"small"}
              className={classes.TextField}
              multiline={true}
              rows={2}
              rowsMax={4}
              disabled={props.FormMode === "VIEW"}
              value={props.Address}
              onChange={props.onAddressChange}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              fullWidth={true}
              label="Email Address"
              variant={"outlined"}
              size={"small"}
              className={classes.TextField}
              disabled={props.FormMode === "VIEW"}
              value={props.Email}
              onChange={props.onEmailChange}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              fullWidth={true}
              label="Contact Number"
              variant={"outlined"}
              size={"small"}
              className={classes.TextField}
              disabled={props.FormMode === "VIEW"}
              value={props.Contact}
              onChange={props.onContactChange}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            {!props.viewMode && ( 
              props.EditMode ? (EditPermission && (
              <Button
                disabled={props.SaveInProgress}
                style={
                  {
                    // background: APP.CONFIG.COLORS.ACTION_BTN.SUCCESS,
                    // color: APP.CONFIG.COLORS.WHITE,
                  }
                }
                type={"submit"}
                variant={"contained"}
                disableElevation={true}
                size={"small"}
              >
                Save
              </Button>
              )) : (AddPermission && (
                <Button
                  disabled={props.SaveInProgress}
                  style={
                    {
                      // background: APP.CONFIG.COLORS.ACTION_BTN.SUCCESS,
                      // color: APP.CONFIG.COLORS.WHITE,
                    }
                  }
                  type={"submit"}
                  variant={"contained"}
                  disableElevation={true}
                  size={"small"}
                >
                  Save
                </Button>))
            )}
            {props.EditMode && (
              <Button
                style={{
                  // background: APP.CONFIG.COLORS.ACTION_BTN.DANGER,
                  // color: APP.CONFIG.COLORS.WHITE,
                  marginLeft: "5px",
                }}
                type={"button"}
                variant={"contained"}
                disableElevation={true}
                size={"small"}
                onClick={() => props.onChangeEditMode(false)}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Paper>
    </div>
  );
};

Screen.propTypes = {
  SaveInProgress: PropTypes.bool,
  Name: PropTypes.string,
  Code: PropTypes.string,
  Address: PropTypes.string,
  Email: PropTypes.string,
  Contact: PropTypes.string,
  EditMode: PropTypes.bool,
  EditBranchId: PropTypes.number,

  onNameChange: PropTypes.func,
  onCodeChange: PropTypes.func,
  onAddressChange: PropTypes.func,
  onEmailChange: PropTypes.func,
  onContactChange: PropTypes.func,
  onChangeEditMode: PropTypes.func,
  onSave: PropTypes.func,
};

export { Screen };
