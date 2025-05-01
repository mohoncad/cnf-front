import React, { useState } from "react";
import {connect} from 'react-redux';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {APP} from "../../../App/AppProvider";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import {
    HandleBranchList, HandleCode, HandleDataGridShouldReload,
    HandleFormMode,
    HandleFormOpen,
    HandleAddress,
    HandleEmail,
    HandlePhone,
    HandleStatus,
    HandleName,
} from "../../../Global/Data/Actions/Private/Suppliers/SuppliersForm.Action";
import UserRole from "../../../Pages/Private/UAP/UserRole/UserRole";
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
import BarAlert from "../../../Components/Common/BarAlert/BarAlert";
import Branches from "../../../Pages/Private/Branches/Branches";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
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
        flexDirection: "column"
    }
}));


const MaterialCheckbox = withStyles({
    root: {
        color: APP.CONFIG.COLORS.PRIMARY,
        '&$checked': {
            color: APP.CONFIG.COLORS.PRIMARY,
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


const Screen = (props) => {
    const classes = useStyles();
    const [code, setCode] = useState('')
    // const auth_user = new APP.SERVICES.SessionUser().GetProfile();
    if(props.GlobalData.Code !== undefined && code === "") {
        setCode(props.GlobalData.Code)
    }
    
    function handleCode(e) {
        props.func.HandleCode(e.target.value)
    }
    function handleName(e) {
      props.func.HandleName(e.target.value)        
    }
    function handlePhone(e) {
       props.func.HandlePhone(e.target.value)       
    }
    function handleEmail(e) {
       props.func.HandleEmail(e.target.value)       
    }
    function handleStatus(e) {
        props.func.HandleStatus(e.target.checked)  
    }    
    function handleAddress(e) {
       props.func.HandleAddress(e.target.value)       
    }
  
  


    const FormMode = props.GlobalData.FormMode;

    const HasEditPermission = props.GlobalData.HasEditPermission;
    const FormDisabled = (FormMode === 'VIEW' || (FormMode === 'EDIT' && HasEditPermission === false));
    // const MasterFlagDisabled = (FormMode === 'ADD' && Number(auth_user.IsMasterUser) === 0) || FormDisabled || (FormMode === 'EDIT' && MasterFlagEditPermission === false);


    return (
        <React.Fragment>

            {FormMode === 'VIEW' && HasEditPermission !== false && (
                <BarAlert type={"info"} message={"Edit this settings"} style={{cursor: "pointer"}}
                          onClick={() => props.func.HandleFormMode('EDIT')}/>
            )}

            <div style={{padding: "10px", marginTop: "20px"}}>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                            <Paper variant={"outlined"} square={false} style={{padding: "20px"}}>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth={true}
                                            variant={"outlined"}
                                            size={"small"}
                                            label="Supplier Code"
                                            className={classes.TextField}
                                            value={code}
                                            disabled={true}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            fullWidth={true}
                                            variant={"outlined"}
                                            size={"small"}
                                            label="Supplier Name"
                                            className={classes.TextField}
                                            onChange={handleName}
                                            value={props.GlobalData.Name}
                                            disabled={FormDisabled}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            fullWidth={true}
                                            variant={"outlined"}
                                            size={"small"}
                                            label="Phone"
                                            className={classes.TextField}
                                            onChange={handlePhone}
                                            value={props.GlobalData.Phone}
                                            disabled={FormDisabled}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            fullWidth={true}
                                            variant={"outlined"}
                                            size={"small"}
                                            label="Email"
                                            className={classes.TextField}
                                            onChange={handleEmail}
                                            value={props.GlobalData.Email}
                                            disabled={FormDisabled}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            fullWidth={true}
                                            variant={"outlined"}
                                            size={"small"}
                                            label="Address"
                                            className={classes.TextField}
                                            onChange={handleAddress}
                                            value={props.GlobalData.Address}
                                            disabled={FormDisabled}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                            control={
                                                <MaterialCheckbox
                                                checked={props.GlobalData.Status}
                                                disabled={FormDisabled}
                                                onChange={handleStatus}/>
                                            }
                                            label="Status"
                                        />
                                    </Grid>
                                </Grid>
                               
                                

                            </Paper>
                        </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
};


const mapStateToProps = state => {
    return {
        GlobalData: state.SuppliersForm,
    }
};

const mapDispatchToProps = dispatch => {
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
            HandleCode: (payload) => {
                dispatch(HandleCode(payload));
            },
            HandleEmail: (payload) => {
                dispatch(HandleEmail(payload));
            },
            HandleName: (payload) => {
                dispatch(HandleName(payload));
            },
            HandlePhone: (payload) => {
                dispatch(HandlePhone(payload));
            },
            HandleAddress: (payload) => {
                dispatch(HandleAddress(payload));
            },
            HandleStatus: (payload) => {
                dispatch(HandleStatus(payload));
            },
        }
    }
};

const _Screen = connect(mapStateToProps, mapDispatchToProps)(Screen);

export {_Screen as Screen};
