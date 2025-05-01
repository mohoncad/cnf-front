import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as UserForm from "../../../Screens/Private/Users/ProfileForm/Screen.UserForm";
import {APP} from "../../../App/AppProvider";
import {
    HandleFormMode,
    HandleFormOpen,
    HandleUserID,
    ResetForm
} from "../../../Global/Data/Actions/Private/UserProfileForm/UserProfileForm.Action";

class MyProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ProfileID: Number(new APP.SERVICES.SessionUser().GetProfile().id),
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <UserForm.Screen MyProfileMode={true} />
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        func: {
            ClearForm: () => {
                dispatch(ResetForm());
            },

            HandleFormOpen: (payload) => {
                dispatch(HandleFormOpen(payload));
            },

            HandleFormMode: (payload) => {
                dispatch(HandleFormMode(payload));
            },


            HandleUserID: (payload) => {
                dispatch(HandleUserID(payload));
            },

        }
    }
};

export default connect(null, mapDispatchToProps)(MyProfile);
