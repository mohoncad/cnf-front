import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {APP} from "../../../App/AppProvider";
import * as PermissionDenied from "../../../Screens/Common/PermissionDenied/PermissionDenied";

class ModuleAccessible extends Component {
    constructor(props) {
        super(props);

        const Permissions = new APP.SERVICES.UAP().GetModulePermissions(APP.CONFIG.MODULE[this.props.ModuleIndex]);
        this.state = {
            ModuleAccess: Permissions === true || Permissions.ModuleAccess,
        };
    }

    render() {

        if(Number(this.state.ModuleAccess) === 1) {
            return (
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <PermissionDenied.Screen />
            </React.Fragment>
        );
    }
}

ModuleAccessible.propTypes = {
    ModuleIndex: PropTypes.number.isRequired,
};

export default ModuleAccessible;
