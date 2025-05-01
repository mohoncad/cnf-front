import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {APP} from "../../../../App/AppProvider";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        padding: "12px",
        marginBottom: theme.spacing(2),
    },
    TextField: {
        "& .MuiOutlinedInput-root": {

        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: ""
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: ""
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: APP.CONFIG.COLORS.PRIMARY,
        }
    }
}));


const ActiveCheckbox = withStyles({
    root: {
        color: APP.CONFIG.COLORS.PRIMARY,
        '&$checked': {
            color: APP.CONFIG.COLORS.PRIMARY,
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


function Screen(props) {
    const classes = useStyles();

    const handleIsActive = () => {
        props.onChangeRoleIsActive(!props.RoleIsActive);
    };


    const handleUserRoleSubmit = (e) => {
        e.preventDefault();
        props.onUserRoleSubmit();
    };


    return (
        <div className={classes.root}>
            <Paper className={classes.paper} variant={"elevation"} elevation={1}>
                <form onSubmit={handleUserRoleSubmit}>
                    <h3 style={{margin: 0}}>
                        {!props.EditMode ? "Add New Role" : "Edit Role"}
                    </h3>
                    <div style={{marginTop: "10px"}}>
                        <TextField
                            disabled={props.SaveInProgress}
                            fullWidth={true}
                            label={"Role"}
                            variant={"outlined"}
                            size={"small"}
                            className={classes.TextField}
                            value={props.RoleName}
                            onChange={props.onChangeRoleName}
                        />
                    </div>

                    <div style={{marginTop: "10px"}}>
                        <TextField
                            disabled={props.SaveInProgress}
                            fullWidth={true}
                            label="Role description"
                            multiline
                            rows={2}
                            rowsMax={4}
                            variant={"outlined"}
                            size={"small"}
                            className={classes.TextField}
                            value={props.RoleDescription}
                            onChange={props.onChangeRoleDescription}/>
                    </div>

                    <div>
                        <FormControlLabel
                            control={<ActiveCheckbox checked={props.RoleIsActive} onChange={handleIsActive} disabled={props.SaveInProgress} />}
                            label="Active"
                        />
                    </div>

                    <div style={{marginTop: "10px"}}>
                        <Button
                            disabled={props.SaveInProgress}
                            style={{
                                background: APP.CONFIG.COLORS.ACTION_BTN.SUCCESS,
                                color: APP.CONFIG.COLORS.WHITE,
                            }}
                            type={"submit"}
                            variant={"contained"}
                            disableElevation={true}
                            size={"small"}>
                            Save
                        </Button>
                        {props.EditMode && (
                            <Button
                                style={{
                                    background: APP.CONFIG.COLORS.ACTION_BTN.DANGER,
                                    color: APP.CONFIG.COLORS.WHITE,
                                    marginLeft: "5px"
                                }}
                                type={"button"}
                                variant={"contained"}
                                disableElevation={true}
                                size={"small"}
                                onClick={() => props.onChangeEditMode(false)}>
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
    SaveInProgress: PropTypes.bool.isRequired,
    RoleName: PropTypes.string.isRequired,
    RoleDescription: PropTypes.string.isRequired,
    RoleIsActive: PropTypes.bool.isRequired,
    EditMode: PropTypes.bool.isRequired,
    EditUserRoleID: PropTypes.number.isRequired,

    onChangeRoleName: PropTypes.func.isRequired,
    onChangeRoleDescription: PropTypes.func.isRequired,
    onChangeRoleIsActive: PropTypes.func.isRequired,
    onChangeEditMode: PropTypes.func.isRequired,
    onChangeEditUserRoleID: PropTypes.func.isRequired,
    onUserRoleSubmit: PropTypes.func.isRequired,
};

export {Screen};
