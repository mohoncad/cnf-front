import React, { useEffect } from 'react';
import {withRouter, useHistory} from 'react-router-dom';
import { connect } from "react-redux";

import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {SwipeableDrawer} from "@material-ui/core";

import './NavigationFrame.css';
import * as MenuList from "../MenuList/Screen.MenuList";
import Divider from '@material-ui/core/Divider';

import * as SidebarProfileScreen from "../ProfileShortDetails/Screen.SidebarProfileScreen";
import * as NavigationAvatar from "../ProfileShortDetails/Screen.NavigationAvatar";
import * as BranchSwitcher from "../ProfileShortDetails/Screen.BranchSwitcher";
import * as SystemLicenseAlert from "../ProfileShortDetails/Screen.SystemLicenseAlert";


import {APP} from "../../../App/AppProvider";

const LocalSettings = APP.SERVICES.LOCAL_SETTINGS;


const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        background: APP.CONFIG.COLORS.PRIMARY,
        boxShadow: "none",
        [theme.breakpoints.up('sm')]: {
            //width: `calc(100% - ${drawerWidth}px)`,
            //marginLeft: drawerWidth,
            color: "#ffffff",
            boxShadow: "none",
            zIndex: theme.zIndex.drawer + 1,
        },
        userSelect: "none",
        msUserSelect: "none",
    },
    Toolbar: {
        [theme.breakpoints.up('sm')]: {
            minHeight: 55
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },


    DesktopMenuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },


    // necessary for content to be below app bar
    //DrawerToolbar: theme.mixins.toolbar,
    DrawerToolbar: {
        paddingTop: 0,
        [theme.breakpoints.up('sm')]: {
            paddingTop: 55,
        },
    },
    drawerPaper: {
        width: drawerWidth + 40,
        background: "#ffffff",
        color: "inherit",
        [theme.breakpoints.up('sm')]: {
            background: "#ffffff",
            color: "#000000",
        },
    },


    drawerOpen: {
        marginTop: 55,
        width: drawerWidth,
        whiteSpace: 'inherit',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: "0.07s",
        }),
    },
    drawerClose: {
        marginTop: 55,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: '0.07s',
        }),
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },

    DesktopProfileInfoVisible: {
        display: 'block',
        width: "100%",
    },
    DesktopProfileInfoHidden: {
        display: 'none',
    },


    AppName: {
        color: "#ffffff",
        flexGrow: 1,
    },
    Icon: {
        color: "inherit",
        [theme.breakpoints.up('sm')]: {
            color: "#ffffff",
        },
    },

    AppBanner: {
        background: "#282c34",
        height: 150,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "20px",
        color: "#61dafb",
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },

    DesktopDrawerList: {
        [theme.breakpoints.up('sm')]: {
            padding: "10px 15px",
        }
    },

    MainContent: {
        flexGrow: 1,
        marginTop: 56,
        padding: 0,
        background: "transparent",
        [theme.breakpoints.up('sm')]: {
            marginTop: 55,
        },
        position: "relative",
        overflow: "auto"
    },
    Content: {
        flexGrow: 1,
        marginTop: 0,
        [theme.breakpoints.up('sm')]: {
            marginTop: 0,
            padding: theme.spacing(2),
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
    },
}));


function Screen(props) {
    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [DesktopDrawerOpen, setDesktopDrawerOpen] = React.useState(LocalSettings.DesktopSideDrawer());
    const history = useHistory();

    useEffect(() => {
        if(!props.GlobalData.IsInvoiceNumberTypeSelected && props.location.pathname !== "/app/company/company") {
            history.push('/app/company/company')
        }

    }, [history, props])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
        setDesktopDrawerOpen(false);
    };
    const CloseDrawer = () => {
        setMobileOpen(false);
    };


    const handleToggleDesktopDrawerOpen = () => {
        setDesktopDrawerOpen(!DesktopDrawerOpen);
        LocalSettings.DesktopSideDrawer(!DesktopDrawerOpen);
    };

    const mobileCheck = () => {
        return window.matchMedia("only screen and (max-width: 560px)").matches;
    };

    const drawer = (
        <div>

            {(mobileOpen || DesktopDrawerOpen) && (
                <React.Fragment>
                    <SidebarProfileScreen.Screen />
                    <Divider/>
                </React.Fragment>
            )}

            <MenuList.Screen onMenuClick={CloseDrawer} DesktopDrawerOpen={DesktopDrawerOpen}/>

        </div>
    );
    

    return (
        <div className={classes.root + ' NAVIGATION-FRAME'}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.Toolbar}>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>


                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleToggleDesktopDrawerOpen}
                        className={classes.DesktopMenuButton}
                    >
                        <MenuIcon/>
                    </IconButton>


                    <Typography className={classes.AppName} variant="h6" noWrap>
                        C&F
                    </Typography>

                    <BranchSwitcher.Screen/>
                    <NavigationAvatar.Screen/>

                </Toolbar>
            </AppBar>
            <nav>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <SwipeableDrawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        onOpen={handleDrawerToggle}

                    >
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: DesktopDrawerOpen,
                            [classes.drawerClose]: !DesktopDrawerOpen,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: DesktopDrawerOpen,
                                [classes.drawerClose]: !DesktopDrawerOpen,
                            }),
                        }}
                        variant="permanent">
                        <div className={clsx(classes.drawer, {
                            [classes.DesktopDrawerList]: DesktopDrawerOpen,
                        })}>

                            {drawer}
                        </div>
                    </Drawer>
                </Hidden>
            </nav>


            <main className={classes.MainContent}>

                <SystemLicenseAlert.Screen />

                <div className={classes.Content}>
                    {props.children}
                </div>
            </main>


        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      GlobalData: state.SessionCompany,
    };
  };
  

const ScreenWithRouter = withRouter(connect(mapStateToProps)(Screen));
export {ScreenWithRouter as Screen};