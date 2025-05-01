import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {ROUTE_PATHS as ROUTES} from "../../../../Routes/RoutePaths";
import {Auth} from "../Auth/Service.Auth";

const CommonRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <Component {...props} />
            )}
        />
    );
};

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                !Auth.check() ? <Component {...props} /> : <Redirect to={ROUTES.PRIVATE.ROOT}/>
            )}
        />
    );
};

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                Auth.check() ? <Component {...props} /> : <Redirect to={ROUTES.PUBLIC.LOGIN + "?ref_=" + encodeURIComponent(window.location.href)}/>
            )}
        />
    );
};

export {CommonRoute, PublicRoute, PrivateRoute}