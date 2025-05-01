import React from 'react';
import {connect} from 'react-redux';
import BranchLogin from "../../../Pages/Private/BranchLogin/BranchLogin";

const BranchCheckpoint = (props) => {
    const BranchID = Number(props.GlobalData.BranchID);

    return (
        <div>
            {BranchID === 0 && (
                <BranchLogin />
            )}

            {BranchID !== 0 && (
                <React.Fragment>
                    {props.children}
                </React.Fragment>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        GlobalData: state.SessionUser,
    }
};

export default connect(mapStateToProps)(BranchCheckpoint);
