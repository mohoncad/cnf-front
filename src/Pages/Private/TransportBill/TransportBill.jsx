import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";
import * as TransportBillGrid from "../../../Screens/Private/TransportBill/Screen.TransportBillGrid";
import * as TransportBillForm from "../../../Screens/Private/TransportBill/Screen.TransportBillForm";
import {ResetForm} from "../../../Global/Data/Actions/Private/UserProfileForm/UserProfileForm.Action";

class TransportBill extends Component {
    componentDidMount() {
        document.title = "Transport Bill List";

        this.props.func.ClearForm();
    }

    render() {
        return (
            <ModuleAccessible ModuleIndex={16}>

                <TransportBillGrid.Screen/>
                <TransportBillForm.Screen/>

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

export default connect(mapStateToProps, mapDispatchToProps)(TransportBill);
