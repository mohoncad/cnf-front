import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },

    Snackbar: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: "400px",
        },
    },

    AlertPaper: {
        width: "100% !important",
    }
}));


const Alert = (props) => {
    const classes = useStyles();
    return <MuiAlert className={classes.AlertPaper} elevation={6} variant="filled" {...props} />;
}

const Action = (props) => (
    <IconButton
        style={{color: "#ffffff"}}
        size="small"
        onClick={props.onClick}>
        <CloseIcon style={{fontSize: "20px"}}/>
    </IconButton>
);

export default function FloatingAlert(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.show);

    let verticalAlign = props.verticalAlign,
        horizontalAlign = props.horizontalAlign,
        duration = props.duration,
        message = props.message,
        type = props.type;

    //Default value setup
    verticalAlign = (verticalAlign === '') ? 'top' : verticalAlign;
    horizontalAlign = (horizontalAlign === '') ? 'right' : horizontalAlign;
    duration = (duration === 0) ? 3000 : Number(duration);
    message = (message === '') ? 'Alert!' : message;
    type = (type === '') ? 'general!' : type;



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            className={classes.Snackbar}
            open={open}
            anchorOrigin={{
                vertical: verticalAlign,
                horizontal: horizontalAlign,
            }}
            disableWindowBlurListener={true}
            autoHideDuration={duration}
            onClose={handleClose}
            action={(
                <Action onClick={handleClose}/>
            )}
            message={message}>
            {type !== 'general' && type !== '' && (
                <Alert onClose={handleClose} severity={props.type}>
                    {message}
                </Alert>
            )}
        </Snackbar>
    );
}


FloatingAlert.propTypes = {
    show: PropTypes.bool,
    type: PropTypes.oneOf(['error', 'success', 'warning', 'info', 'general']),
    message: PropTypes.string.isRequired,
    duration: PropTypes.number,
    verticalAlign: PropTypes.oneOf(['top', 'bottom', '']),
    horizontalAlign: PropTypes.oneOf(['center', 'left', 'right', '']),
};

FloatingAlert.defaultProps = {
    show: false,
    type: "general",
    message: "Alert!",
    duration: 3000,
    verticalAlign: "top",
    horizontalAlign: "right",
};
