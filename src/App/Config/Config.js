import {COLORS} from "./Colors";
import {MODULE_CODES} from "./Modules";

const CONFIG = {
    /**
     * Application color codes and variables
     * Theming colors and methods
     */
    COLORS: COLORS,

    /**
     * List of the modules, including their unique code
     * Can be accessed globally
     */
    MODULE: MODULE_CODES,

    /**
     * Service Provider configuration
     * Vendor configuration
     */
    SERVICES: {
        /**
         * @Authentication, we decide to store the api auth token in the front end,
         * By default we use cookies with a session lifetime, but if we need to store that without cookie (Google chrome doesn't store local file cookies, and cordova also doesn't)
         * If we need to install the package on the local computer without a server or in a cordova platform, we will use cookies
         * Here we use a flag, having two values, [1: cookie, 2: localStorage]
         */
        AUTH: {
            TOKEN_STORAGE : 1, // [1: cookie, 2: localStorage]
        }
    }
};

export {CONFIG};