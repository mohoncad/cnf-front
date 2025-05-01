import React from 'react';
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import ModuleIcon from "../../../../Components/Private/ModuleIcon/ModuleIcon";
import {APP} from "../../../../App/AppProvider";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        userSelect: "none",
    },
    Icon: {},
    ListItem: {
        borderRadius: "5px"
    },
    ListItemText: {
        fontSize: "15px",
    },


    PermissionCheckBoxLabel: {
        display: "block",
        marginRight: "15px",
    },
    PermissionCheckBox: {
        margin: 0,
        marginRight: "3px",
    },
    PermissionsContainerLegend: {
        background: APP.CONFIG.COLORS.PRIMARY,
        color: "#ffffff",
        padding: "5px",
        fontWeight: "bold",
    }

}));


const MenuItem = (props) => {
    const classes = useStyles();
    const [Checked, setChecked] = React.useState(props.ModuleAccessPermission);

    const handleCheckBox = (e, value) => {
        e.stopPropagation();

        props.onModuleAccessChange(props.ModuleCode, 'ModuleAccess', !Checked);
    };

    const handleClick = () => {
        props.onClick("hello");
    };

    return (
        <ListItem button disableRipple={true} className={classes.ListItem} onClick={handleClick}>

            <input type={"checkbox"} checked={Checked} disabled={props.HasModuleAccess !== 1}
                   style={{marginRight: "10px"}} onChange={handleCheckBox}/>

            <ListItemIcon className={classes.Icon}>
                <ModuleIcon Code={props.ModuleCode}/>
            </ListItemIcon>
            <ListItemText primary={props.label} classes={{primary: classes.ListItemText}}/>
        </ListItem>
    );
};

MenuItem.propTypes = {
    HasModuleAccess: PropTypes.number.isRequired,
    ModuleAccessPermission: PropTypes.bool.isRequired,
    onModuleAccessChange: PropTypes.func.isRequired,
};


const NestedMenuItem = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const [Checked, setChecked] = React.useState(props.ModuleAccessPermission);

    const handleCheckBox = (e, value) => {
        e.stopPropagation();

        props.onModuleAccessChange(props.ModuleCode, 'ModuleAccess', !Checked);
    };

    const handleClick = () => {
        //setOpen(!open);
        props.onClick();
    };

    return (
        <React.Fragment>
            <ListItem onClick={handleClick} button disableRipple={true} className={classes.ListItem}>

                <input type={"checkbox"} checked={Checked} disabled={props.HasModuleAccess !== 1}
                       style={{marginRight: "10px"}} onChange={handleCheckBox}/>

                <ListItemIcon className={classes.Icon}>
                    <ModuleIcon Code={props.ModuleCode}/>
                </ListItemIcon>
                <ListItemText primary={props.label} classes={{primary: classes.ListItemText}}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense={false} style={{paddingLeft: "0px"}}>
                    {props.children}
                </List>
            </Collapse>
        </React.Fragment>
    );
};

NestedMenuItem.propTypes = {
    HasModuleAccess: PropTypes.number.isRequired,
    ModuleAccessPermission: PropTypes.bool.isRequired,
    onModuleAccessChange: PropTypes.func.isRequired,
};


const ModuleListScreen = (props) => {
    const [SelectedModule, setSelectedModule] = React.useState({});

    const handleModuleSelect = (__module) => {
        setSelectedModule(__module);
    };

    const Modules = ({data}) => {
        return (
            <React.Fragment>
                {data.map((Module, index) => {
                    return (
                        <React.Fragment key={index}>
                            {Number(Module.Level) === 1 && (
                                <React.Fragment>

                                    {(Module.ChildModules === null || Module.ChildModules.length === 0) && (
                                        <MenuItem
                                            label={Module.Name}
                                            ModuleCode={Module.Code}
                                            HasModuleAccess={Number(Module.HasModuleAccess)}
                                            ModuleAccessPermission={(Number(Module.HasModuleAccess) === 1 && Module.Permissions !== null && typeof Module.Permissions.ModuleAccess !== "undefined") ? (Number(Module.Permissions.ModuleAccess) === 1 || Module.Permissions.ModuleAccess === true) : false}
                                            onModuleAccessChange={props.onPermissionsUpdate}
                                            onClick={() => handleModuleSelect(Module)}
                                        />
                                    )}

                                    {Module.ChildModules !== null && Module.ChildModules.length > 0 && (
                                        <NestedMenuItem
                                            label={Module.Name}
                                            ModuleCode={Module.Code}
                                            HasModuleAccess={Number(Module.HasModuleAccess)}
                                            ModuleAccessPermission={(Number(Module.HasModuleAccess) === 1 && Module.Permissions !== null && typeof Module.Permissions.ModuleAccess !== "undefined") ? (Number(Module.Permissions.ModuleAccess) === 1 || Module.Permissions.ModuleAccess === true) : false}
                                            onModuleAccessChange={props.onPermissionsUpdate}
                                            onClick={() => handleModuleSelect(Module)}>

                                            <Modules data={Module.ChildModules}/>
                                        </NestedMenuItem>
                                    )}

                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )
                })}
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <List dense={false}>

                        <Modules data={props.Modules}/>

                    </List>

                </Grid>

                <Grid item xs={12} sm={8}>

                    {!!Object.keys(SelectedModule).length && (
                        <PermissionsContainer
                            Module={SelectedModule}
                            onUpdate={props.onPermissionsUpdate}
                        />
                    )}

                </Grid>

            </Grid>

        </React.Fragment>
    );
};

ModuleListScreen.propTypes = {
    Modules: PropTypes.array.isRequired,
    onPermissionsUpdate: PropTypes.func.isRequired,
};


const PermissionsContainer = (props) => {
    const classes = useStyles();
    const Module = props.Module;

    const Permissions = Module.Permissions;
    const ModuleAccess_P = (Permissions === null || typeof Permissions.ModuleAccess === "undefined") ? false : Number(Permissions.ModuleAccess) === 1;
    const View_P = (Permissions === null || typeof Permissions.View === "undefined") ? false : Number(Permissions.View) === 1;
    const Add_P = (Permissions === null || typeof Permissions.Add === "undefined") ? false : Number(Permissions.Add);
    const Edit_P = (Permissions === null || typeof Permissions.Edit === "undefined") ? false : Number(Permissions.Edit) === 1;
    const Delete_P = (Permissions === null || typeof Permissions.Delete === "undefined") ? false : Number(Permissions.Delete) === 1;
    const ActualAmountView_P = (Permissions === null || typeof Permissions.ActualAmountView === "undefined") ? false : Number(Permissions.ActualAmountView) === 1;
    const CustomerAmountView_P = (Permissions === null || typeof Permissions.CustomerAmountView === "undefined") ? false : Number(Permissions.CustomerAmountView) === 1;
    const Trash_P = (Permissions === null || typeof Permissions.Trash === "undefined") ? false : Number(Permissions.Trash) === 1;
    const Restore_P = (Permissions === null || typeof Permissions.Restore === "undefined") ? false : Number(Permissions.Restore) === 1;
    const DeleteForever_P = (Permissions === null || typeof Permissions.DeleteForever === "undefined") ? false : Number(Permissions.DeleteForever) === 1;

    const handlePermissionSet = ($module_code, $PermissionKey, $Permission) => {
        props.onUpdate($module_code, $PermissionKey, !$Permission);
    };

    return (
        <Paper square={true} variant={"outlined"} style={{padding: "20px"}}>
            <h3 style={{margin: 0}}>Permissions</h3>

            <br/>

            <fieldset>
                <legend className={classes.PermissionsContainerLegend}>
                    {Module.Name}
                </legend>

                <div style={{marginTop: "5px", padding: "5px"}}>


                    <Grid container spacing={1}>


                        {/*{Module.HasModuleAccess ? (
                            <Grid item xs={12} sm={3}>
                                <label className={classes.PermissionCheckBoxLabel}>
                                    <input type={"checkbox"} checked={ModuleAccess_P} className={classes.PermissionCheckBox} onChange={(e) => handlePermissionSet(Module.Code, "ModuleAccess", ModuleAccess_P)}/>
                                    &nbsp; Module Access
                                </label>
                            </Grid>
                        ) : null}*/}

                        {Number(Module.HasView) === 1 ? (
                            <Grid item xs={12} sm={2}>
                                <label className={classes.PermissionCheckBoxLabel}>
                                    <input type={"checkbox"} checked={View_P} className={classes.PermissionCheckBox}
                                           onChange={(e) => handlePermissionSet(Module.Code, "View", View_P)}/>
                                    &nbsp; View
                                </label>
                            </Grid>
                        ) : null}

                        {Number(Module.HasAdd) === 1 ? (
                            <Grid item xs={12} sm={2}>
                                <label className={classes.PermissionCheckBoxLabel}>
                                    <input type={"checkbox"} checked={Add_P} className={classes.PermissionCheckBox}
                                           onChange={(e) => handlePermissionSet(Module.Code, "Add", Add_P)}/>
                                    &nbsp; Add
                                </label>
                            </Grid>
                        ) : null}

                        {Number(Module.HasEdit) === 1 ? (
                            <Grid item xs={12} sm={2}>
                                <label className={classes.PermissionCheckBoxLabel}>
                                    <input type={"checkbox"} checked={Edit_P} className={classes.PermissionCheckBox}
                                           onChange={(e) => handlePermissionSet(Module.Code, "Edit", Edit_P)}/>
                                    &nbsp; Edit
                                </label>
                            </Grid>
                        ) : null}

                        {Number(Module.HasDelete) === 1 ? (
                            <Grid item xs={12} sm={2}>
                                <label className={classes.PermissionCheckBoxLabel}>
                                    <input type={"checkbox"} checked={Delete_P} className={classes.PermissionCheckBox}
                                           onChange={(e) => handlePermissionSet(Module.Code, "Delete", Delete_P)}/>
                                    &nbsp; Delete
                                </label>
                            </Grid>
                        ) : null}

                        {Number(Module.HasActualAmountView) === 1 ? (
                            <Grid item xs={12} sm={4}>
                                <label className={classes.PermissionCheckBoxLabel}>
                                    <input type={"checkbox"} checked={ActualAmountView_P}
                                           className={classes.PermissionCheckBox}
                                           onChange={(e) => handlePermissionSet(Module.Code, "ActualAmountView", ActualAmountView_P)}/>
                                    &nbsp; Actual Amount
                                </label>
                            </Grid>
                        ) : null}

                        {Number(Module.HasCustomerAmountView) === 1 ? (
                            <Grid item xs={12} sm={4}>
                                <label className={classes.PermissionCheckBoxLabel}>
                                    <input type={"checkbox"} checked={CustomerAmountView_P}
                                           className={classes.PermissionCheckBox}
                                           onChange={(e) => handlePermissionSet(Module.Code, "CustomerAmountView", CustomerAmountView_P)}/>
                                    &nbsp; Customer Amount
                                </label>
                            </Grid>
                        ) : null}

                        {Number(Module.HasTrash) === 1 ? (
                            <Grid item xs={12} sm={2}>
                                <label className={classes.PermissionCheckBoxLabel}>
                                    <input type={"checkbox"} checked={Trash_P}
                                           className={classes.PermissionCheckBox}
                                           onChange={(e) => handlePermissionSet(Module.Code, "Trash", Trash_P)}/>
                                    &nbsp; Trash
                                </label>
                            </Grid>
                        ) : null}

                        {Number(Module.HasRestore) === 1 ? (
                            <Grid item xs={12} sm={2}>
                                <label className={classes.PermissionCheckBoxLabel}>
                                    <input type={"checkbox"} checked={Restore_P}
                                           className={classes.PermissionCheckBox}
                                           onChange={(e) => handlePermissionSet(Module.Code, "Restore", Restore_P)}/>
                                    &nbsp; Restore
                                </label>
                            </Grid>
                        ) : null}

                        {Number(Module.HasDeleteForever) === 1 ? (
                            <Grid item xs={12} sm={3}>
                                <label className={classes.PermissionCheckBoxLabel}>
                                    <input type={"checkbox"} checked={DeleteForever_P}
                                           className={classes.PermissionCheckBox}
                                           onChange={(e) => handlePermissionSet(Module.Code, "DeleteForever", DeleteForever_P)}/>
                                    &nbsp; Delete Forever
                                </label>
                            </Grid>
                        ) : null}

                    </Grid>

                </div>
            </fieldset>

        </Paper>
    )
};

PermissionsContainer.propTypes = {
    Module: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


export {ModuleListScreen, PermissionsContainer};
