import React from 'react';
import PropTypes from "prop-types";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {APP} from "../../../App/AppProvider";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
}));

const MyProgressBar = withStyles((theme) => ({
    colorPrimary: {
        background: APP.CONFIG.COLORS.PROGRESS_BAR.LINEAR.PRIMARY,
    },
    bar: {
        background: APP.CONFIG.COLORS.PROGRESS_BAR.LINEAR.BAR,
    }

}))(LinearProgress);

function SuspenseLoader(props) {
    const classes = useStyles();

    let title = props.title,
        height = props.height;

    title = title === "" || typeof title === "undefined" ? "Loading" : title;
    height = height === "" || typeof height === "undefined" ? "90vh" : height;


    return (
        <div className={classes.root} style={{height: height}}>
            <div>
                <div style={{width: "100%", marginBottom: "0px", textAlign: "center"}}>
                    {title}
                </div>

                <div style={{width: "100%", marginTop: "0px", textAlign: "center"}}>
                    <MyProgressBar style={{width: "100px", display: "inline-block", margin: 0}}/>
                </div>
            </div>
        </div>
    );
}

export default SuspenseLoader;

SuspenseLoader.propTypes = {
    title: PropTypes.string,
    height: PropTypes.string,
}