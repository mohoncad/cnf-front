import {Store} from "../../../../Global/Data/Store";
import {SET_NETWORK_ERROR} from "../../../../Global/Data/Actions/Private/NetworkError/NetworkError.Action";

class ServiceNetworkFailure {
    Initialize() {
        Store.dispatch(SET_NETWORK_ERROR(false));
        return true;
    }

    SetError(Status = true) {
        Store.dispatch(SET_NETWORK_ERROR(Status));
        return true;
    }

    GetStatus() {
        return Store.getState().NETWORK_ERROR.NetworkError;
    }
}

export {ServiceNetworkFailure};
