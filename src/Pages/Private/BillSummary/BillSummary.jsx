import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";
import * as BillSummaryGrid from "../../../Screens/Private/BillSummary/Screen.BillSummaryGrid";
import * as BillSummaryForm from "../../../Screens/Private/BillSummary/Screen.BillSummaryForm";
import {ResetForm} from "../../../Global/Data/Actions/Private/UserProfileForm/UserProfileForm.Action";

class BillSummary extends Component {

    componentDidMount() {
        document.title = "Bill Summary List";

        this.props.func.ClearForm();
    }

    render() {
        return (
            <ModuleAccessible ModuleIndex={17}>

                <BillSummaryGrid.Screen/>
                <BillSummaryForm.Screen/>

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

export default connect(mapStateToProps, mapDispatchToProps)(BillSummary);
