import React from "react";
import axios from "axios";
import {ENV} from "../../../../App/Environment/Env";
import {Auth} from "../Auth/Service.Auth";
import {APP} from "../../../../App/AppProvider";

import {Store} from "../../../../Global/Data/Store";
import {
    SET_UAP_MODULES,
    SetUAPModulesLoading,
    SetUAPModulesLoaded
} from "../../../../Global/Data/Actions/Private/UAP/UAP.Action";

class UAP_Service extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * @constructor
     */
    IsReady() {
        const UAP_Loading = Store.getState().UAP_MODULE_LIST.Loading;
        const UAP_Loaded = Store.getState().UAP_MODULE_LIST.Loaded;
        return UAP_Loading === false && UAP_Loaded;
    }

    /**
     * Initialize the modules and prepare the object provider
     * @constructor
     */
    Initialize() {
        /**
         * By default set the Modules Key null or empty string
         * So that we can refresh the module list cache and reset the data
         */

        Store.dispatch(SetUAPModulesLoading(true));
        Store.dispatch(SetUAPModulesLoaded(false));


        /**
         * Store the loaded module list object as a string
         * And the recursive functions would know that the data are loaded
         */

        /**
         * Send a request to the API to get all the module list based on the session user
         * Store them in the storage for further usage
         */
        axios({
            method: "get",
            url: ENV.URL.API.ROOT + "/my_module_list",
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then(({data}) => {

            Store.dispatch(SetUAPModulesLoading(false));
            Store.dispatch(SetUAPModulesLoaded(true));

            if (data.success === true) {

                /**
                 * Store the module list in the storage
                 */
                const modules = data.module_list;
                Store.dispatch(SET_UAP_MODULES(modules));

            }

        }).catch((error) => {

            Store.dispatch(SetUAPModulesLoading(false));
            Store.dispatch(SetUAPModulesLoaded(true));

            if (error.response) {
                if (error.response.status === 401) {
                    Auth.remove(this.props);
                }
            } else {
                new APP.SERVICES.NETWORK_FAILURE().SetError();
            }

        });

    }


    /**
     * Returns the permission set of all modules and operations
     * @returns {string}
     * @constructor
     */
    GetModules() {
        return Store.getState().UAP_MODULE_LIST.UAP_MODULES;
    }


    /**
     * Get the permission set of a module by a module Code
     * Used as a recursive function for identifying the child modules and permissions
     * @param $ModuleCode
     * @param $Modules
     * @returns {boolean} or {object} (Boolean: false)
     * @constructor
     */
    GetModulePermissions($ModuleCode, $Modules = this.GetModules()) {
        /**
         * Proceed when the local storage object is an array and has valid properties
         */
        let permissions = false;

        if (Array.isArray($Modules) && $Modules.length > 0) {
            for (let i = 0; i < $Modules.length; i++) {
                if ($Modules[i].Code.toString() === $ModuleCode.toString()) {
                    if ($Modules[i].Permissions.length !== 0 && $Modules[i].Permissions !== null) {
                        permissions = $Modules[i].Permissions;
                        break;
                    }
                } else if (Array.isArray($Modules[i].ChildModules) && $Modules[i].ChildModules.length > 0) {
                    permissions = this.GetModulePermissions($ModuleCode, $Modules[i].ChildModules);
                    if(permissions) break;
                }
            }
            return permissions;
        }
    }

}

export {UAP_Service as UAP};