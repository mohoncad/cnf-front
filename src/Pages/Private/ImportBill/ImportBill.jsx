import React, {Component} from 'react';
import {connect} from 'react-redux';
import ModuleAccessible from "../../../Vendor/Middleware/ModuleAccessible/ModuleAccessible";
import * as ImportBillGrid from "../../../Screens/Private/ImportBill/Screen.ImportBillGrid";
import * as ImportBillForm from "../../../Screens/Private/ImportBill/Screen.ImportBillForm";
import {ResetForm} from "../../../Global/Data/Actions/Private/UserProfileForm/UserProfileForm.Action";

class ImportBill extends Component {

    componentDidMount() {
        document.title = "Import Bill List";

        this.props.func.ClearForm();
    }
    render() {
        return (
            <ModuleAccessible ModuleIndex={14}>

                <ImportBillGrid.Screen/>
                {
                    this.props.ImportData.FormOpen ? <ImportBillForm.Screen/> : <></>
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

export default connect(mapStateToProps, mapDispatchToProps)(ImportBill);
