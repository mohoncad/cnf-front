import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";
import * as BillPaymentGrid from "../../../Screens/Private/BillPayment/Screen.BillPaymentGrid";
import * as BillPaymentForm from "../../../Screens/Private/BillPayment/Screen.BillPaymentForm";
import {ResetForm} from "../../../Global/Data/Actions/Private/BillPayment/BillPayment.Action";

class BillPayment extends Component {

    componentDidMount() {
        document.title = "Bill Payment List";

        this.props.func.ClearForm();
    }

    render() {
        return (
            <ModuleAccessible ModuleIndex={19}>

                <BillPaymentGrid.Screen/>
                <BillPaymentForm.Screen/>

            </ModuleAccessible>
        )
    }
}


const mapStateToProps = state => {
    return {
        GlobalData: state.BillPayment,
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

export default connect(mapStateToProps, mapDispatchToProps)(BillPayment);
