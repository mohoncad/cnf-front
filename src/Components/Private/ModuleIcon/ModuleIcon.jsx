import React from 'react';
import PropTypes from "prop-types";
import {APP} from "../../../App/AppProvider";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from '@material-ui/icons/People';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Apartment from '@material-ui/icons/Apartment';
import Extension from '@material-ui/icons/Extension';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import Person from '@material-ui/icons/Person';
import LocalShipping from '@material-ui/icons/LocalShipping';
import ImportContacts from '@material-ui/icons/ImportContacts';
import Receipt from '@material-ui/icons/Receipt';
import GetApp from '@material-ui/icons/GetApp';
import Publish from '@material-ui/icons/Publish';
import MoveToInbox from '@material-ui/icons/MoveToInbox';   
import Business from '@material-ui/icons/Business';   
import PaymentIcon from '@material-ui/icons/Payment'; 
function ModuleIcon({Code}) {
    switch (Code) {
        case APP.CONFIG.MODULE[1] : return <VpnKeyIcon />;
        case APP.CONFIG.MODULE[2] : return <PeopleIcon />;
        case APP.CONFIG.MODULE[3] : return <HomeWorkIcon />;
        case APP.CONFIG.MODULE[4] : return <AcUnitIcon />;
        case APP.CONFIG.MODULE[5] : return <LocalAtmIcon />;
        case APP.CONFIG.MODULE[6] : return <DashboardIcon />;
        case APP.CONFIG.MODULE[7] : return <PeopleAlt />;
        case APP.CONFIG.MODULE[8] : return <AttachMoney />;
        case APP.CONFIG.MODULE[9] : return <Extension />;
        case APP.CONFIG.MODULE[10] : return <Apartment />;
        case APP.CONFIG.MODULE[11] : return <Person />;
        case APP.CONFIG.MODULE[12] : return <LocalShipping />;
        case APP.CONFIG.MODULE[13] : return <ImportContacts />;
        case APP.CONFIG.MODULE[14] : return <Publish />;
        case APP.CONFIG.MODULE[15] : return <GetApp />;
        case APP.CONFIG.MODULE[16] : return <MoveToInbox />;
        case APP.CONFIG.MODULE[17] : return <Receipt />;
        case APP.CONFIG.MODULE[18] : return <Business />;
        case APP.CONFIG.MODULE[19] : return <PaymentIcon />;
        default : return <></>;
    }
}

ModuleIcon.propTypes = {
    Code: PropTypes.string.isRequired,
};

export default ModuleIcon;
