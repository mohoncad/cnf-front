import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from 'react-redux';



const useStyles = makeStyles((theme) => ({
    SideBarProfileCard: {
        display: "block",
        textAlign: "center",
        padding: "10px",
        marginTop: "20px",
    },
    link: {
        textDecoration: "none",
        cursor: "pointer",
        color: "inherit",
    },
    FullName: {
        display: "block",
        margin: "10px 10px 0 10px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#474747",
    },
    Designation: {
        display: "block",
        fontSize: "13px",
        fontWeight: "bold",
        color: "#7c7c7c",
    },
}));

/**
 * SideBar Profile Screen, shown in the desktop sidebar only
 * @param props
 * @returns {*}
 * @constructor
 */
function Screen(props) {
    const classes = useStyles();

    const ProfilePhoto = (props.data.ProfilePhoto !== null && props.data.ProfilePhoto !== "") ? props.data.ProfilePhoto : "";
    const FullName = props.data.FullName;

    return (
        <React.Fragment>
            <div className={classes.SideBarProfileCard}>
                <Avatar style={{display: "inline-block", height: 55, width: 55, margin: 0}} alt={""} src={ProfilePhoto}/>
                <div className={classes.FullName}>
                    {FullName}
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.SessionUser,
    }
};

const __Screen = connect(mapStateToProps)(Screen);

export {__Screen as Screen};
