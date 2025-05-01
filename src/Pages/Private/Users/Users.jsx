import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";
import * as UsersGrid from "../../../Screens/Private/Users/Screen.UsersGrid";
import * as UserForm from "../../../Screens/Private/Users/ProfileForm/Screen.UserForm";
import {ResetForm} from "../../../Global/Data/Actions/Private/UserProfileForm/UserProfileForm.Action";

class Users extends Component {
    componentDidMount() {
        document.title = "User List";

        this.props.func.ClearForm();
    }

    render() {
        return (
            <ModuleAccessible ModuleIndex={2}>

                <UsersGrid.Screen/>
                <UserForm.Screen/>

            </ModuleAccessible>
        )
    }
}


const mapStateToProps = state => {
    return {
        GlobalData: state.UserProfileForm,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        func: {
            ClearForm: () => {
                dispatch(ResetForm());
            },
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
