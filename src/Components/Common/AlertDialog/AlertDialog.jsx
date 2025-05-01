import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    AlertDialog: {
        Width: 500
    },
}));

export default function AlertDialog(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(props.open);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                className={classes.AlertDialog}
                fullWidth={true}
                maxWidth={"xs"}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                transitionDuration={1}
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AlertDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
};

AlertDialog.defaultProps = {
    open: false,
    title: "Alert!",
};