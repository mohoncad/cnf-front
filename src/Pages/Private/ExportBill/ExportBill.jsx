import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";
import * as ExportBillGrid from "../../../Screens/Private/ExportBill/Screen.ExportBillGrid";
import * as ExportBillForm from "../../../Screens/Private/ExportBill/Screen.ExportBillForm";
import {ResetForm} from "../../../Global/Data/Actions/Private/UserProfileForm/UserProfileForm.Action";

class ExportBill extends Component {
    componentDidMount() {
        document.title = "Export Bill List";

        this.props.func.ClearForm();
    }

    render() {
        return (
            <ModuleAccessible ModuleIndex={15}>

                <ExportBillGrid.Screen/>
                {
                    this.props.ImportData.FormOpen ? <ExportBillForm.Screen/> : <></>
                }

            </ModuleAccessible>
        )
    }
}


const mapStateToProps = state => {
    return {
        GlobalData: state.UserProfileForm,
        ImportData: state.ImportBill,
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

export default connect(mapStateToProps, mapDispatchToProps)(ExportBill);
