import React from "react";
import {connect} from 'react-redux';
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import {Link} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import {APP} from "../../../App/AppProvider";

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        cursor: "pointer",
        color: "inherit",
    },
}));




/**
 * Avatar shown at the right side of the toolbar (Profile Avatar: Both for mobile and desktop)
 * @returns {*}
 * @constructor
 */
function NavigationAvatarScreen(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const ProfilePhoto = (props.data.ProfilePhoto !== null && props.data.ProfilePhoto !== "") ? props.data.ProfilePhoto : "";

    return (
        <React.Fragment>
            <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <Avatar
                    style={{height: 30, width: 30, margin: 0}}
                    alt=""
                    src={ProfilePhoto}/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link className={classes.link} to={APP.ROUTES.PRIVATE.MY_PROFILE}>
                    <MenuItem onClick={handleClose}>My Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>Change Password</MenuItem>
                <Link className={classes.link} to={APP.ROUTES.PRIVATE.LOGOUT}>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Link>
            </Menu>
        </React.Fragment>
    );
}

NavigationAvatarScreen.propTypes = {

};


const mapStateToProps = (state) => {
    return {
        data: state.SessionUser,
    }
};

const Screen = connect(mapStateToProps)(NavigationAvatarScreen);

export {Screen};
