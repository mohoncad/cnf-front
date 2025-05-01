import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {APP} from "../../../App/AppProvider";


const useStyles = makeStyles({
    root: {
        width: 400,
        margin: 15,
        padding: 10,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    link: {
        color: 'green',
        textDecoration: 'none',
    },
    hint: {
        fontSize: "14px",
        color: "grey",
        marginBottom: "20px"
    },

    TextField: {
        "& .MuiOutlinedInput-root": {},
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: ""
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: ""
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: APP.CONFIG.COLORS.PRIMARY,
        }
    },

    TextFieldLabel: {
        "&.focused": {
            color: APP.CONFIG.COLORS.PRIMARY,
        },
        "&.shrink": {}
    }
});

const Screen = (props) => {
    const classes = useStyles();



    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>

            <Card className={classes.root}>
                <CardContent>
                    <h2 style={{margin: 0}}>C&F Registration</h2>
                    <br/>

                    <form onSubmit={props.onSubmitForm}>
                        <div className={classes.hint}>
                            Please fill all the required* fields to continue!
                        </div>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    className={classes.TextField}
                                    fullWidth={true}
                                    size={"small"}
                                    type={"text"}
                                    label={"Full Name *"}
                                    variant={"outlined"}
                                    value={props.FullName}
                                    onChange={props.onChangeFullName}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.TextFieldLabel,
                                            focused: "focused",
                                            shrink: "shrink",
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    className={classes.TextField}
                                    fullWidth={true}
                                    size={"small"}
                                    type={"text"}
                                    label={"Company Name *"}
                                    variant={"outlined"}
                                    value={props.CompanyName}
                                    onChange={props.onChangeCompanyName}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.TextFieldLabel,
                                            focused: "focused",
                                            shrink: "shrink",
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.TextField}
                                    fullWidth={true}
                                    size={"small"}
                                    type={"text"}
                                    label={"Company Size *"}
                                    variant={"outlined"}
                                    value={props.CompanySize}
                                    onChange={props.onChangeCompanySize}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.TextFieldLabel,
                                            focused: "focused",
                                            shrink: "shrink",
                                        }
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.TextField}
                                    fullWidth={true}
                                    size={"small"}
                                    type={"text"}
                                    label={"Contact Number *"}
                                    variant={"outlined"}
                                    value={props.ContactNumber}
                                    onChange={props.onChangeContactNumber}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.TextFieldLabel,
                                            focused: "focused",
                                            shrink: "shrink",
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.TextField}
                                    fullWidth={true}
                                    size={"small"}
                                    type={"email"}
                                    label={"Email *"}
                                    variant={"outlined"}
                                    value={props.Email}
                                    onChange={props.onChangeEmail}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.TextFieldLabel,
                                            focused: "focused",
                                            shrink: "shrink",
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    className={classes.TextField}
                                    fullWidth={true}
                                    size={"small"}
                                    type={"password"}
                                    label={"Password *"}
                                    variant={"outlined"}
                                    value={props.Password}
                                    onChange={props.onChangePassword}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.TextFieldLabel,
                                            focused: "focused",
                                            shrink: "shrink",
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Button
                                    fullWidth={true}
                                    type={"submit"}
                                    variant={"contained"}
                                    color={"primary"}
                                    disableElevation={true}
                                    style={{background: APP.CONFIG.COLORS.PRIMARY}}>
                                    Register
                                </Button>
                            </Grid>

                        </Grid>

                        <div style={{margin: "10px 0 0 0", fontSize: "14px"}}>
                            <Link to={APP.ROUTES.PUBLIC.LOGIN} className={classes.link}>
                                Login instead?
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

Screen.propTypes = {
    FullName: PropTypes.string.isRequired,
    CompanyName: PropTypes.string.isRequired,
    CompanySize: PropTypes.string.isRequired,
    ContactNumber: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    onChangeFullName: PropTypes.func.isRequired,
    onChangeCompanyName: PropTypes.func.isRequired,
    onChangeCompanySize: PropTypes.func.isRequired,
    onChangeContactNumber: PropTypes.func.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
};

export {Screen};