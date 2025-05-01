import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {Link, withRouter} from "react-router-dom";
import {APP} from "../../../App/AppProvider";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import FullScreenDialog from "../../../Components/Private/FullScreenDialog/FullScreenDialog";
import BranchLogin from "../../../Pages/Private/BranchLogin/BranchLogin";

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
function BranchSwitcherScreen(props) {
    const classes = useStyles();
    const [DialogOpen, setDialogOpen] = React.useState(false);

    const handleToggleDialog = () => {
        setDialogOpen(!DialogOpen);
    };

    const handleReloadComponent = () => {
        handleToggleDialog();

        const __current = props.history.location.pathname;
        props.history.push('/app/__');
        setTimeout(() => {
            props.history.replace(__current);
        }, 1);
    };

    return (
        <React.Fragment>
            <IconButton
                style={{color: "#ffffff"}}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleToggleDialog}>
                <HomeWorkIcon />
            </IconButton>

            <FullScreenDialog open={DialogOpen} title={"Select Branch"} onClose={handleToggleDialog}>
                <BranchLogin ChangerMode={true} onChange={handleReloadComponent}/>
            </FullScreenDialog>
        </React.Fragment>
    );
}

BranchSwitcherScreen.propTypes = {

};

const Screen = withRouter(BranchSwitcherScreen);

export {Screen};
