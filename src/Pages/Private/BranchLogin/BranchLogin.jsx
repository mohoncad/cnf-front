import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {APP} from "../../../App/AppProvider";
import Grid from "@material-ui/core/Grid";
import {ENV} from "../../../App/Environment/Env";
import {Auth} from "../../../Vendor/Service/Providers/Auth/Service.Auth";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "block",
        textAlign: "center",
    },

    container: {
        margin: "50px 150px 0 150px",
        textAlign: "left",
        [theme.breakpoints.down('sm')]: {
            margin: "15px",
        },
    }
}));

const BranchCard = (props) => (
    <Card>
        <CardContent>
            <h3 style={{margin: 0}}>{props.Name}</h3>
            <Typography color="textSecondary">
                {props.Address}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" fullWidth={true} variant={"contained"}
                    style={{background: APP.CONFIG.COLORS.ACTION_BTN.SUCCESS, color: "#ffffff"}} onClick={() => props.onSelect(props.id)}>Select</Button>
        </CardActions>
    </Card>
);

BranchCard.propTypes = {
    id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
    Address: PropTypes.string,
    onSelect: PropTypes.func,
};




function BranchLogin(props) {
    const classes = useStyles();

    const BranchList = props.GlobalData.BranchList;

    const loginBranch = (BranchID) => {
        axios({
            method: "put",
            url: ENV.URL.API.ROOT + "/branch_login",
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            data: {
                BranchID: BranchID,
            }
        }).then(({data}) => {

            if (data.success === true) {

                if(props.ChangerMode === true) {
                    props.onChange();
                }

                new APP.SERVICES.SessionUser().Initialize();
            } else {
                alert(data.message);
            }

        }).catch((error) => {

            if (error.response) {
                if (error.response.status === 401) {
                    Auth.remove();
                }
            } else {
                new APP.SERVICES.NETWORK_FAILURE().SetError();
            }

        });
    };

    return (
        <React.Fragment>
            <div className={classes.root}>

                <h3>Select Branch</h3>

                <div className={classes.container}>
                    <Grid container spacing={3}>
                        {BranchList.map((Branch, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <BranchCard id={Branch.id} Name={Branch.Name} Address={Branch.Address} onSelect={loginBranch}/>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        GlobalData: state.SessionUser,
    }
};


BranchLogin.propTypes = {
    ChangerMode: PropTypes.bool,
    onChange: PropTypes.func,
};

export default connect(mapStateToProps)(BranchLogin);
