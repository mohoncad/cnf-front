import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },

    AlertPaper: {
        width: "100% !important",
    },
    Snackbar: {
        minWidth: 100
    },
}));

const Alert = (props) => {
    const classes = useStyles();
    return <MuiAlert className={classes.AlertPaper} elevation={6} variant="filled" {...props} icon={false}/>;
}

const Action = (props) => (
    <IconButton
        style={{color: "#ffffff"}}
        size="small"
        onClick={props.onClick}>
        <CloseIcon style={{fontSize: "20px"}}/>
    </IconButton>
);

export default function FloatingProgressbar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.show);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Snackbar
            className={classes.Snackbar}
            ContentProps={{
                classes: {
                    root: classes.Snackbar
                }
            }}
            open={open}
            anchorOrigin={{
                vertical: props.verticalAlign,
                horizontal: props.horizontalAlign,
            }}
            disableWindowBlurListener={true}
            onClose={handleClose}
            action={
                <Action onClick={handleClose}/>
            }
            message={(
                <React.Fragment>
                    <CircularProgress
                        style={{display: "inline-block", verticalAlign: "middle", marginRight: "10px", color: "#ffffff"}}
                        size={17}
                    />
                    <div style={{display: "inline-block", verticalAlign: "middle"}}>
                        {props.message}
                    </div>
                </React.Fragment>
            )}>
            {/* {props.type !== 'general' && props.type !== '' && (
                <Alert onClose={handleClose} severity={props.type}>
                    <div>
                        <CircularProgress
                            style={{display: "inline-block", verticalAlign: "middle", marginRight: "10px", color: "#ffffff"}}
                            size={17}
                        />
                        <div style={{display: "inline-block", verticalAlign: "middle"}}>
                            {props.message}
                        </div>
                    </div>
                </Alert>
            )} */}
        </Snackbar>
    );
}


FloatingProgressbar.propTypes = {
    show: PropTypes.bool,
    type: PropTypes.oneOf(['error', 'success', 'warning', 'info', 'general']),
    message: PropTypes.string.isRequired,
    verticalAlign: PropTypes.oneOf(['top', 'bottom']),
    horizontalAlign: PropTypes.oneOf(['center', 'left', 'right']),
};

FloatingProgressbar.defaultProps = {
    show: false,
    type: "general",
    message: "Loading",
    verticalAlign: "top",
    horizontalAlign: "right",
};