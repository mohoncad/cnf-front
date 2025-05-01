class LocalSettings_Service {

    static DesktopSideDrawer(open) {
        let _identifier = "desktop_side_drawer_open";

        if(typeof open === "boolean") {
            window.localStorage.setItem(_identifier, open);
        }


        //check existing settings
        let settings = window.localStorage.getItem(_identifier);
        return (settings !== '' && typeof settings !== 'undefined') ? settings === 'true' : false;
    }

}

export {LocalSettings_Service as LocalSettings};