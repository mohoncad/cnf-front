import React from "react";
import axios from "axios";
import {ENV} from "../../../../App/Environment/Env";
import {Auth} from "../Auth/Service.Auth";
import {APP} from "../../../../App/AppProvider";
import {Store} from "../../../../Global/Data/Store";
import {
    SET_SYSTEM_LICENSE, SetSystemLicenseLoaded,
    SetSystemLicenseLoading
} from "../../../../Global/Data/Actions/Private/SystemLicense/SystemLicense.Action";

class SystemLicense_Service extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * @constructor
     */
    IsReady() {
        const SYSTEM_LICENSE_Loading = Store.getState().SYSTEM_LICENSE.Loading;
        const SYSTEM_LICENSE_Loaded = Store.getState().SYSTEM_LICENSE.Loaded;
        return SYSTEM_LICENSE_Loading === false && SYSTEM_LICENSE_Loaded;
    }

    /**
     * Initialize the system license and prepare the object provider
     * @constructor
     */
    Initialize() {
        /**
         * By default set the license Key null or empty string
         * So that we can refresh the license cache and reset the data
         */
        /**
         * Send a request to the API to get the system license based on the session user
         * Store them in the storage for further usage
         */
        axios({
            method: "get",
            url: ENV.URL.API.ROOT + "/company_license_status",
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then(({data}) => {

            Store.dispatch(SetSystemLicenseLoading(false));
            Store.dispatch(SetSystemLicenseLoaded(true));

            if (data.success === true) {

                /**
                 * Store the license object in the storage
                 */
                const SystemLicense = {
                    Loaded: true,
                    license_status: data.license_status,
                    active_days: data.active_days,
                    license_alert_days: data.license_alert_days,
                };

                Store.dispatch(SET_SYSTEM_LICENSE(SystemLicense));

            }

        }).catch((error) => {

            Store.dispatch(SetSystemLicenseLoading(false));
            Store.dispatch(SetSystemLicenseLoaded(true));

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
     * Returns the system license
     * @returns {string}
     * @constructor
     */
    GetSystemLicense() {
        return Store.getState().SYSTEM_LICENSE.LICENSE_INFO;
    }

}

export {SystemLicense_Service as SystemLicense};
