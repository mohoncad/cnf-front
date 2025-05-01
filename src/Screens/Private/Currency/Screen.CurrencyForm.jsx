import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
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

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    props.onSave();
  };
  const Permissions = new APP.SERVICES.UAP().GetModulePermissions(
    APP.CONFIG.MODULE[8]
  );
  const AddPermission = Number(Permissions.Add) === 1;
  const EditPermission = Number(Permissions.Edit) === 1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} variant={"elevation"} elevation={1}>
        <form onSubmit={handleCurrencySubmit}>
          {!props.viewMode ? (
            <h3 style={{ margin: 0 }}>
              {!props.EditMode ? "Add Currency" : "Edit Currency"}
            </h3>
          ) : (
            ""
          )}

          <div style={{ marginTop: "10px" }}>
            <TextField
              disabled={props.SaveInProgress}
              fullWidth={true}
              label={"Currency Name"}
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
              label={"Currency Rate"}
              variant={"outlined"}
              size={"small"}
              className={classes.TextField}
              value={props.Rate}
              onChange={props.onRateChange}
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
  SaveInProgress: PropTypes.bool,
  Name: PropTypes.string,
  Rate: PropTypes.string,
  EditMode: PropTypes.bool,
  EditCurrencyId: PropTypes.number,

  onNameChange: PropTypes.func,
  onRateChange: PropTypes.func,
  onChangeEditMode: PropTypes.func,
  onSave: PropTypes.func,
};

export { Screen };
