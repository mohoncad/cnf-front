import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {APP} from "../../../App/AppProvider";

import ModuleIcon from "../../../Components/Private/ModuleIcon/ModuleIcon";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    Icon: {},
    ListItem: {
        [theme.breakpoints.up('sm')]: {},
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    },
    ListItemText: {
        fontSize: "15px",
    }
}));


function MenuItem(props) {
    const classes = useStyles();
    return (
        <Link className={classes.link} to={APP.ROUTES.PRIVATE[props.ModuleCode]} style={{border: 0}} title={props.label}
              onClick={props.onMenuClick}>
            <ListItem button style={{borderRadius: props.DesktopDrawerOpen ? "5px" : 0}}>
                <ListItemIcon className={classes.Icon}>
                    <ModuleIcon Code={props.ModuleCode}/>
                </ListItemIcon>
                <ListItemText primary={props.label} classes={{primary: classes.ListItemText}}/>
            </ListItem>
        </Link>
    );
}

MenuItem.propTypes = {
    label: PropTypes.string.isRequired,
    ModuleCode: PropTypes.string.isRequired,
};


function NestedMenuItem(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <ListItem selected={open} onClick={handleClick} button
                      style={{borderRadius: props.DesktopDrawerOpen ? "5px" : 0}}>
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
}

NestedMenuItem.propTypes = {
    label: PropTypes.string.isRequired,
    ModuleCode: PropTypes.string.isRequired,
};


const Modules = ({data, DesktopDrawerOpen, onMenuClick}) => {
    const auth_user = new APP.SERVICES.SessionUser().GetProfile();
    return (
        <React.Fragment>
            {data.map((Module, index) => {
                let Name = Module.Name,
                Code = Module.Code,
                AccessPermission = Number(Module.HasModuleAccess) === 1 && ((Module.Permissions !== false && Number(Module.Permissions.ModuleAccess) === 1) || (Module.Permissions === true && Number(auth_user.IsSupportUser) === 1)),
                ChildModules = Module.ChildModules;
                return (
                    <React.Fragment key={index}>
                        {Number(Module.Level) === 1 && AccessPermission && (
                            <React.Fragment>
                                {(ChildModules === null || ChildModules.length === 0) && (
                                    <MenuItem
                                        label={Name}
                                        ModuleCode={Code}
                                        DesktopDrawerOpen={DesktopDrawerOpen}
                                        onMenuClick={onMenuClick}
                                    />
                                )}

                                {ChildModules !== null && ChildModules.length > 0 && AccessPermission && (
                                    <NestedMenuItem
                                        label={Name}
                                        ModuleCode={Code}
                                        DesktopDrawerOpen={DesktopDrawerOpen}
                                        onMenuClick={onMenuClick}>

                                        <Modules
                                            data={ChildModules}
                                            DesktopDrawerOpen={DesktopDrawerOpen}
                                            onMenuClick={onMenuClick}/>

                                    </NestedMenuItem>
                                )}
                            </React.Fragment>
                        )}
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
}


class Screen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ModulesLoaded: false,
            Modules: [],
        };

        this.handleCloseDrawer = this.handleCloseDrawer.bind(this);
    }

    handleCloseDrawer() {
        this.props.onMenuClick();
    }


    LoadModules() {

        setTimeout(() => {

            const $Modules = new APP.SERVICES.UAP().GetModules();

            if (Array.isArray($Modules) && $Modules.length > 0) {
                this.setState({
                    ModulesLoaded: true,
                    Modules: $Modules,
                });
            } else {
                this.LoadModules();
            }

        }, 10);
    }


    componentDidMount() {
        this.LoadModules();
    }

    render() {

        return (
            <div>
                <List dense={false} style={{height: "70vh", overflowY: "scroll"}}>


                    {/*<MenuItem href={APP.ROUTES.PRIVATE.DASHBOARD} label={'Dashboard'} icon={<DashboardIcon/>}
                              onClick={this.handleCloseDrawer} drawerOpen={this.props.drawerOpen}/>
                    <MenuItem href={'/app/profile'} label={'My Profile'} icon={<AccountCircleIcon/>}
                              onClick={this.handleCloseDrawer} drawerOpen={this.props.drawerOpen}/>
                    <MenuItem href={APP.ROUTES.PRIVATE.ROLE_PERMISSIONS} label={'Role Permissions'}
                              icon={<ViewListIcon/>} onClick={this.handleCloseDrawer}
                              drawerOpen={this.props.drawerOpen}/>
                    <MenuItem href={'/app/settings'} label={'Settings'} icon={<SettingsIcon/>}
                              onClick={this.handleCloseDrawer} drawerOpen={this.props.drawerOpen}/>
                    <NestedMenuItem
                        icon={<ViewListIcon/>}
                        label={"Reports"}
                        drawerOpen={this.props.drawerOpen}>
                        <MenuItem href={'/app/settings'} label={'Settings'} icon={<SettingsIcon/>}
                                  onClick={this.handleCloseDrawer} drawerOpen={this.props.drawerOpen}/>
                    </NestedMenuItem>
                    <MenuItem href={APP.ROUTES.PRIVATE.LOGOUT} label={'Logout'} icon={<ExitToAppIcon/>}
                              onClick={this.handleCloseDrawer} drawerOpen={this.props.drawerOpen}/>*/}

                    {this.state.ModulesLoaded && this.state.Modules.length > 0 && (
                        <Modules
                            data={this.state.Modules}
                            DesktopDrawerOpen={this.props.DesktopDrawerOpen}
                            onMenuClick={this.handleCloseDrawer}/>
                    )}
                </List>
            </div>
        );
    }
}

export {Screen};
