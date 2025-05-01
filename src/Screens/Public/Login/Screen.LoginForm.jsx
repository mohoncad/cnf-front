import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {APP} from "../../../App/AppProvider";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
    root: {
        width: 350,
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
                    <h2 style={{margin: 0}}>C&F Login</h2>
                    <br/>

                    <form onSubmit={props.onSubmitForm}>
                        <div className={classes.hint}>
                            You must login first to continue!
                        </div>

                        <TextField
                            className={classes.TextField}
                            fullWidth={true}
                            size={"small"}
                            type={"email"}
                            label={"Email *"}
                            variant={"outlined"}
                            name={"Email"}
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

                        <br/>
                        <br/>

                        <TextField
                            className={classes.TextField}
                            fullWidth={true}
                            size={"small"}
                            type={"password"}
                            label={"Password *"}
                            variant={"outlined"}
                            name={"Password"}
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

                        <div style={{margin: "10px 0 10px 0", fontSize: "14px"}}>
                            <Link to={APP.ROUTES.PUBLIC.RECOVER_PASSWORD} className={classes.link}>
                                Forgotten Password?
                            </Link>
                        </div>

                        <Button
                            fullWidth={true}
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            disableElevation={true}
                            style={{background: APP.CONFIG.COLORS.PRIMARY}}>
                            Login
                        </Button>

                        <div style={{margin: "10px 0 0 0", fontSize: "14px", textAlign: "center"}}>
                            <Link to={APP.ROUTES.PUBLIC.REGISTER} className={classes.link}>
                                Create an account
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

Screen.propTypes = {
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
};

export {Screen};