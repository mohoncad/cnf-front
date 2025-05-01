import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {APP} from "../../../App/AppProvider";
import {Fade} from '@material-ui/core';

const TopToolbarHeight = 55;
const BottomToolbarHeight = 50;

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: APP.CONFIG.COLORS.PRIMARY,
        boxShadow: "none",
        [theme.breakpoints.up('sm')]: {
            color: "#ffffff",
            zIndex: theme.zIndex.drawer + 1,
        },
        userSelect: "none",
        msUserSelect: "none",
    },

    BottomAppBar: {
        background: APP.CONFIG.COLORS.WHITE,
        borderTop: "1px solid #d9d9d9",
        [theme.breakpoints.up('sm')]: {
            color: "#ffffff",
            boxShadow: "none",
            zIndex: theme.zIndex.drawer + 1,
        },
        top: 'auto',
        bottom: 0,
    },
    Toolbar: {
        [theme.breakpoints.up('sm')]: {
            minHeight: TopToolbarHeight,
        }
    },
    BottomToolbar: {
        [theme.breakpoints.up('sm')]: {
            minHeight: BottomToolbarHeight,
        }
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

function FullScreenDialog(props) {
    const classes = useStyles();
    return (
        <div>
            <Dialog fullScreen open={props.open} onClose={props.onClose}
                    onExited={props.onExited} style={{zIndex: 1300}}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.Toolbar}>
                        <Typography variant="body1" className={classes.title}>
                            {props.title}
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {props.hasSubmitButton && (
                    <AppBar className={classes.BottomAppBar}>
                        <Toolbar className={classes.BottomToolbar}>
                            <div style={{textAlign: "right", display: "block", width: "100%"}}>
                                <Button color="inherit" disabled={props.submitButtonDisabled} onClick={props.onSubmit}
                                        style={{background: APP.CONFIG.COLORS.PRIMARY, color: "#eeeeee"}}>
                                    {props.submitButtonTitle}
                                </Button>
                            </div>
                        </Toolbar>
                    </AppBar>
                )}

                <div style={{marginTop: TopToolbarHeight, paddingBottom: BottomToolbarHeight}}>
                    {props.children}
                </div>
            </Dialog>
        </div>
    );
}

FullScreenDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    hasSubmitButton: PropTypes.bool,
    submitButtonTitle: PropTypes.string,
    submitButtonDisabled: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onExited: PropTypes.func,
};

export default FullScreenDialog;
