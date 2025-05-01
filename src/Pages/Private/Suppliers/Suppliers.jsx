import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";
import * as SupplierGrid from "../../../Screens/Private/Suppliers/Screen.SupplierGrid";
import * as SupplierForm from "../../../Screens/Private/Suppliers/Screen.SupplierForm";
import {ResetForm} from "../../../Global/Data/Actions/Private/UserProfileForm/UserProfileForm.Action";

class Suppliers extends Component {
    componentDidMount() {
        document.title = "Suppliers List";

        this.props.func.ClearForm();
    }

    render() {
        return (
            <ModuleAccessible ModuleIndex={12}>

                <SupplierGrid.Screen/>
                <SupplierForm.Screen/>

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

export default connect(mapStateToProps, mapDispatchToProps)(Suppliers);
