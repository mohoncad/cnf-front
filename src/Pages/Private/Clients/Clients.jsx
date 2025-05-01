import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";
import * as ClientGrid from "../../../Screens/Private/Clients/Screen.ClientGrid";
import * as ClientsForm from "../../../Screens/Private/Clients/Screen.ClientsForm";
import {ResetForm} from "../../../Global/Data/Actions/Private/UserProfileForm/UserProfileForm.Action";

class Clients extends Component {
    componentDidMount() {
        document.title = "Clients List";

        this.props.func.ClearForm();
    }

    render() {
        return (
            <ModuleAccessible ModuleIndex={11}>

                <ClientGrid.Screen/>
                <ClientsForm.Screen/>

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

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
