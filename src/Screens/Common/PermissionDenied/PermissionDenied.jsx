import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {APP} from "../../../App/AppProvider";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "70vh"
    },
    card: {
        width: "400px",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Screen = () => {
    const classes = useStyles();

    return (
       <div className={classes.root}>
           <Card className={classes.card} variant="outlined">
               <CardContent>
                   <div style={{textAlign: "center"}}>
                       <WarningIcon style={{fontSize: "50px", color: APP.CONFIG.COLORS.RED}}/>
                   </div>

                   <h3 style={{color: APP.CONFIG.COLORS.RED}}>Pemission Denied</h3>

                   <Typography className={classes.title} color="textSecondary" gutterBottom>
                       You do not have permission to view this page or this page is protected!
                   </Typography>
               </CardContent>
           </Card>
       </div>
    );
};

export {Screen};
