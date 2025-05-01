import React from "react";
import BarAlert from "../../../Components/Common/BarAlert/BarAlert";
import {connect} from 'react-redux';
import PropTypes from "prop-types";

/**
 * System License alert at the main page of the navigation screen
 * @param props
 * @returns {*}
 * @constructor
 */
function SystemLicenseAlertScreen(props) {
    const LicenseType = props.LicenseType;
    const ActiveDays = props.ActiveDays;
    const AlertDays = props.AlertDays;

    let ShowAlert = ActiveDays <= AlertDays || LicenseType === "DEMO";

    let type = "";
    type = LicenseType === "DEMO" ? "warning": type;
    type = (ActiveDays <= (AlertDays / 2)) ? "error" : (ActiveDays <= AlertDays) ? "warning" : type;
    type = (LicenseType === "EXTENDED") ? "info" : type;



    let message = "";
    message = (ActiveDays === 1) ? (ActiveDays + " day") : (ActiveDays + " days");
    message = ((LicenseType === "DEMO") ? "Demo" : "License") + " Remaining - " + message + ((LicenseType === "EXTENDED") ? " (Extended)" : "");

    message = (LicenseType === "DEMO_EXPIRED") ? "Demo Expired" : (LicenseType === "EXPIRED") ? "License Expired" : message;

    return (
        <React.Fragment>
            {ShowAlert && (
                <BarAlert type={type} message={message}/>
            )}
        </React.Fragment>
    );
}

SystemLicenseAlertScreen.propTypes = {
    LicenseType: PropTypes.oneOf(['DEMO', 'ACTIVE', 'EXTENDED', 'DEMO_EXPIRED', 'EXPIRED']).isRequired,
    ActiveDays: PropTypes.number.isRequired,
    AlertDays: PropTypes.number.isRequired,
};


function Screen(props) {
    const LicenseType = props.data.license_status;
    const LicenseActiveDays = props.data.active_days;
    const LicenseAlertDays = props.data.license_alert_days;

    return (
        <SystemLicenseAlertScreen LicenseType={LicenseType} ActiveDays={LicenseActiveDays} AlertDays={LicenseAlertDays} />
    )
}

const mapStateToProps = state => {
    return {
        data: state.SYSTEM_LICENSE.LICENSE_INFO,
    }
};


const __Screen = connect(mapStateToProps)(Screen);

export {__Screen as Screen};
