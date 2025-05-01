import React from "react";
import axios from "axios";
import {ENV} from "../../../../App/Environment/Env";
import {Auth} from "../Auth/Service.Auth";
import {APP} from "../../../../App/AppProvider";
import {Store} from "../../../../Global/Data/Store";
import {SetSessionUser} from "../../../../Global/Data/Actions/Private/SessionUser/SessionUser.Action";
import {SetSessionCompany} from "../../../../Global/Data/Actions/Private/SessionUser/SessionUser.Action";

class SessionUser_Service extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * @constructor
     */
    IsReady() {
        const SessUserData = Store.getState().SessionUser;
        return (typeof SessUserData.id !== 'undefined' && SessUserData.id > 0);
    }

    /**
     * Initialize the user profile and prepare the object provider
     * @constructor
     */
    Initialize() {
        /**
         * By default set the profile Key null or empty string
         * So that we can refresh the profile cache and reset the data
         */


        /**
         * Store the loaded profile object as a string
         * And the recursive functions would know that the data are loaded
         */
        /**
         * Send a request to the API to get the user profile based on the session user
         * Store them in the storage for further usage
         */
        axios({
            method: "get",
            url: ENV.URL.API.ROOT + "/auth_user",
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then(({data}) => {

            if (data.success === true) {

                /**
                 * Store the profile object in the storage
                 */
                Store.dispatch(SetSessionUser(data.user));
                Store.dispatch(SetSessionCompany(data.company));
            }

        }).catch((error) => {

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
     * Returns the user profile
     * @returns {string}
     * @constructor
     */
    GetProfile() {
        return Store.getState().SessionUser;
    }

}

export {SessionUser_Service as SessionUser};
