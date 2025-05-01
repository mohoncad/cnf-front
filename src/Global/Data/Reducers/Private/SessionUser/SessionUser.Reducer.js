import {actionTypes} from "../../../Actions/Private/SessionUser/SessionUser.Action";

const InitialState = {};

export const SessionUser = (state = InitialState, action) => {
    if(action.type === actionTypes.SET_SESSION_USER) {
        return action.payload;
    }

    return state;
};

export const SessionCompany = (state = InitialState, action) => {
    if(action.type === actionTypes.SET_SESSION_COMPANY) {
        return action.payload;
    }

    return state;
};
