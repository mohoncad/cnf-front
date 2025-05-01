import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import RefreshIcon from '@material-ui/icons/Refresh';
import {APP} from "../../../App/AppProvider";
import BarAlert from "../../../Components/Common/BarAlert/BarAlert";
import {ENV} from "../../../App/Environment/Env";
import {Auth} from "../../../Vendor/Service/Providers/Auth/Service.Auth";


function NetworkFailure(props) {
    const [NetworkConnecting, setNetworkConnecting] = React.useState(false);
    const [NetworkConnected, setNetworkConnected] = React.useState(false);
    const [NetworkFailed, setNetworkFailed] = React.useState(true);

    const RefreshNetwork = () => {
        if(props.ReloadServices) {
            props.onReloadServices();
            return false;
        }

        setNetworkConnecting(true);
        setNetworkFailed(false);

        axios({
            method: "get",
            url: ENV.URL.API.ROOT + "/___server",
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            }
        }).then(({data}) => {

            if (data.success === true) {

                setNetworkConnecting(false);
                setNetworkConnected(true);
                setNetworkFailed(false);

                setTimeout(() => {

                    new APP.SERVICES.NETWORK_FAILURE().SetError(false);

                }, 1500);

            } else {
                alert("Something went wrong in the api!");
            }

        }).catch((error) => {

            setNetworkConnecting(false);
            setNetworkConnected(false);
            setNetworkFailed(true);

        });
    };

    return (
        <React.Fragment>
            {NetworkConnecting && <BarAlert type={"warning"} message={"Connecting..."}/>}
            {NetworkConnected && <BarAlert type={"success"} message={"Connected"}/>}
            {NetworkFailed && <BarAlert type={"error"} message={"Network Error"}/>}
            <div style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                height: "85vh"
            }}>


                {NetworkFailed && (
                    <Button variant={"contained"} style={{background: APP.CONFIG.COLORS.PRIMARY, color: "#ffffff"}}
                            onClick={RefreshNetwork}>
                        <RefreshIcon/>&nbsp; Retry
                    </Button>
                )}
            </div>
        </React.Fragment>
    );
}

NetworkFailure.propTypes = {
    ReloadServices: PropTypes.bool.isRequired,
    onReloadServices: PropTypes.func.isRequired,
};

export default NetworkFailure;
