export const actionTypes = {
    SET_SESSION_USER: 'SET_SESSION_USER',
    SET_SESSION_COMPANY: 'SET_SESSION_COMPANY',
};

export function SetSessionUser(value) {
    return {
        type: actionTypes.SET_SESSION_USER,
        payload: value,
    }
}

export function SetSessionCompany(value) {
    return {
        type: actionTypes.SET_SESSION_COMPANY,
        payload: value,
    }
}

