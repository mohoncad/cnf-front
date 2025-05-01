import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import * as RolePermissionForm from '../../../Screens/Private/UAP/RolePermissions/Screen.RolePermissions';
import Button from "@material-ui/core/Button";
import {APP} from "../../../App/AppProvider";
import axios from "axios";
import {Auth} from "../../../Vendor/Service/Providers/Auth/Service.Auth";

class RolePermissions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Modules: [],
        };

        this.handleUpdateModules = this.handleUpdateModules.bind(this);
    }


    LoadModules() {
        axios({
            method: "get",
            url: APP.ENV.URL.API.ROOT + "/uap_module_list?role_id=" + this.props.RoleID,
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then(({data}) => {

            if (data.success === true) {

                this.setState({
                    Modules: data.module_list,
                });

            } else {


            }

        }).catch((error) => {

            if(error.response) {
                if (error.response.status === 401) {
                    Auth.remove(this.props);
                }
            } else {
                new APP.SERVICES.NETWORK_FAILURE().SetError();
            }

        });
    }




    handleUpdateModules($module_code, $PermissionKey, $Permission) {

        function replaceRegularPermission(Modules, Code, PermissionKey, Permission) {

            Modules.map(function (Module, index) {

                if(Module.Permissions === null) {
                    Module.Permissions = {};
                }

                if(Module.Code === Code) {

                    Module.Permissions[PermissionKey] = Permission;
                }

                if(Module.ChildModules.length > 0) {
                    replaceRegularPermission(Module.ChildModules, Code, PermissionKey, Permission);
                }
            });

            return Modules;

        }



        let $UpdatedModules = replaceRegularPermission(this.state.Modules, $module_code, $PermissionKey, $Permission);

        this.setState({Modules: $UpdatedModules});
        this.props.onUpdateModulePermissionList($UpdatedModules);
    }


    componentDidMount() {
        this.LoadModules();
    }

    render() {
        return (
            <div>
                <h3>{this.props.RoleName}</h3>

                <RolePermissionForm.ModuleListScreen
                    Modules={this.state.Modules}
                    onPermissionsUpdate={this.handleUpdateModules}/>

                <br/>
            </div>
        );
    }
}

RolePermissions.propTypes = {
    RoleID: PropTypes.number.isRequired,
    RoleName: PropTypes.string.isRequired,
    onUpdateModulePermissionList: PropTypes.func.isRequired,
};

export default withRouter(RolePermissions);