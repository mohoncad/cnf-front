import {ENV} from "./Environment/Env";
import {CONFIG} from "./Config/Config";
import {ROUTE_PATHS as ROUTES} from "../Routes/RoutePaths";
import {Auth} from "../Vendor/Service/Providers/Auth/Service.Auth";
import {LocalSettings} from "../Vendor/Service/Providers/LocalSettings/Service.LocalSettings";
import {UAP} from "../Vendor/Service/Providers/UAP/Service.UAP";
import {SessionUser} from "../Vendor/Service/Providers/SessionUser/Service.SessionUser";
import {SystemLicense} from "../Vendor/Service/Providers/SystemLicense/Service.SystemLicense";
import {ServiceNetworkFailure} from "../Vendor/Service/Classes/ServiceNetworkFailure/ServiceNetworkFailure";
import {Store} from "../Global/Data/Store";

/**
 * @class AppProvider
 * Registers all the global objects and vendors, and variables for client side improvement
 * Can be accessed anywhere
 * Warning: For new Service registration you need to create unique namespace and object key
 */
const AppProvider = {
    /**
     * Prepare the environment variables
     * @global ENV object
     */
    ENV: ENV,

    /**
     * Configuration variable registration
     * @global CONFIGURATION
     */
    CONFIG: CONFIG,

    /**
     * Prepare the ROUTE PATHS for accessing routes and their conditions
     * @global ROUTE_PATHS
     */
    ROUTES: ROUTES,


    /**
     * Redux store of the app, including all the global states
     */
    STORE: Store,

    /**
     * ServiceProviders Registration, (Keep uppercase unique objects)
     * Keep focus on initially called functions or activities
     * @ServiceProviders array object
     */
    SERVICES: {
        /**
         * @class ServiceNetworkFailure
         * Provides all the network failure methods and status
         */
        NETWORK_FAILURE: ServiceNetworkFailure,

        /**
         * Authentication Service
         * @Instance Auth
         * Provides all auth methods and stored variables for route protections
         */
        AUTH: Auth,

        /**
         * Local Settings Service
         * @Instance LocalSettings
         * Provides all global local settings and stored variables for app, registered in client side
         */
        LOCAL_SETTINGS: LocalSettings,

        /**
         * ModuleAccessible Service
         * @Instance ModuleAccessible
         * Provides the ModuleAccessible object of the modules and methods
         */
        UAP: UAP,

        /**
         * SessionUser Service
         * @Instance SessionUser
         * Provides the SessionUser object and methods
         */
        SessionUser: SessionUser,

        /**
         * SystemLicense Service
         * @Instance SystemLicense
         * Provides the license object and methods
         */
        SystemLicense: SystemLicense,
    }
};

export {AppProvider as APP};
