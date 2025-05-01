import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { APP } from "../../../App/AppProvider";

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

function Screen(props) {
  const classes = useStyles();

  const handleIsActive = () => {
    props.onChangeRoleIsActive(!props.RoleIsActive);
  };

  const handleUserRoleSubmit = (e) => {
    e.preventDefault();
    props.onSave();
  };
  const Permissions = new APP.SERVICES.UAP().GetModulePermissions(
    APP.CONFIG.MODULE[5]
  );
  const AddPermission = Number(Permissions.Add) === 1;
  const EditPermission = Number(Permissions.Edit) === 1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} variant={"elevation"} elevation={1}>
        <form onSubmit={handleUserRoleSubmit}>
          {!props.viewMode ? (
            <h3 style={{ margin: 0 }}>
              {!props.EditMode ? "Add New Bank" : "Edit Bank"}
            </h3>
          ) : (
            ""
          )}

          <div style={{ marginTop: "10px" }}>
            <TextField
              disabled={props.SaveInProgress}
              fullWidth={true}
              label="Name"
              multiline
              required
              rows={2}
              rowsMax={4}
              variant={"outlined"}
              size={"small"}
              className={classes.TextField}
              value={props.Name}
              onChange={props.onNameChange}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              disabled={props.SaveInProgress}
              fullWidth={true}
              label="Branch Name"
              multiline
              rows={2}
              rowsMax={4}
              variant={"outlined"}
              size={"small"}
              className={classes.TextField}
              value={props.BranchName}
              onChange={props.onBranchChange}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              disabled={props.SaveInProgress}
              fullWidth={true}
              label="Account Type"
              multiline
              rows={2}
              rowsMax={4}
              variant={"outlined"}
              size={"small"}
              className={classes.TextField}
              value={props.AccType}
              onChange={props.onAccTypeChange}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              disabled={props.SaveInProgress}
              fullWidth={true}
              label="Account Name"
              multiline
              rows={2}
              rowsMax={4}
              variant={"outlined"}
              size={"small"}
              className={classes.TextField}
              value={props.AccName}
              onChange={props.onAccNameChange}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              disabled={props.SaveInProgress}
              fullWidth={true}
              label="Account Number"
              multiline
              rows={2}
              rowsMax={4}
              variant={"outlined"}
              size={"small"}
              className={classes.TextField}
              value={props.AccNumber}
              onChange={props.onAccNumberChange}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            {!props.viewMode &&
              (props.EditMode
                ? EditPermission && (
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
                  )
                : AddPermission && (
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
                  ))}
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
}

Screen.propTypes = {
  Data: PropTypes.object,
  SaveInProgress: PropTypes.bool,
  EditMode: PropTypes.bool,
  viewMode: PropTypes.bool,
  EditUserRoleID: PropTypes.number,
  onChangeEditMode: PropTypes.func,
  onChangeEditUserRoleID: PropTypes.func,
  onCodeChange: PropTypes.func,
  onNameChange: PropTypes.func,
  onBranchChange: PropTypes.func,
  onAccTypeChange: PropTypes.func,
  onAccNameChange: PropTypes.func,
  onAccNumberChange: PropTypes.func,
  onSave: PropTypes.func,
};

export { Screen };
