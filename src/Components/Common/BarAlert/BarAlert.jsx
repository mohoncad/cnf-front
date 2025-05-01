import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    AlertPaper: {
        display: "block",
        width: "100% !important",
        borderRadius: "0",
        padding: "0",
        textAlign: "center !important",
        '& > *': {
            padding: "4px"
        },
        userSelect: "none",
        msUserSelect: "none",
    }
}));

function BarAlert(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <MuiAlert
                className={classes.AlertPaper}
                elevation={0}
                variant="filled"
                severity={props.type}
                icon={false}
                onClick={props.onClick}
                style={props.style}>
                {props.message}
            </MuiAlert>
        </React.Fragment>
    );
}

BarAlert.propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired,
    message: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.object
};

export default BarAlert;