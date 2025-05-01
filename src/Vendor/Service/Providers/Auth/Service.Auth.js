import {CONFIG} from "../../../../App/Config/Config";
import Cookies from "universal-cookie";
import {Store} from "../../../../Global/Data/Store";
import {SET_AUTH} from "../../../../Global/Data/Actions/Private/Auth/Auth.Action";

const cookies = new Cookies();
const LS = window.localStorage;
const Identifier = "_token";

class Auth_Service {

    static set(token) {
        token = typeof token === 'undefined' ? '' : token;

        if (CONFIG.SERVICES.AUTH.TOKEN_STORAGE === 1) {
            cookies.set(Identifier, token, {path: "/", sameSite: 'strict'});
        } else if (CONFIG.SERVICES.AUTH.TOKEN_STORAGE === 2) {
            LS.setItem(Identifier, token);
        }
        
        Store.dispatch(SET_AUTH(true));

    }


    static getToken() {
        if (CONFIG.SERVICES.AUTH.TOKEN_STORAGE === 1) {
            return cookies.get(Identifier);
        } else if (CONFIG.SERVICES.AUTH.TOKEN_STORAGE === 2) {
            return LS.getItem(Identifier);
        }
    }

    static check() {
        let _identifier;

        if (CONFIG.SERVICES.AUTH.TOKEN_STORAGE === 1) {
            _identifier = cookies.get(Identifier);
        } else if (CONFIG.SERVICES.AUTH.TOKEN_STORAGE === 2) {
            _identifier = LS.getItem(Identifier);
        }

        return _identifier !== '' && _identifier !== null && typeof _identifier !== 'undefined';
    }

    static remove() {

        if (CONFIG.SERVICES.AUTH.TOKEN_STORAGE === 1) {

            //remove all cookies
            document.cookie.split(";").forEach(function (c) {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });

        } else if (CONFIG.SERVICES.AUTH.TOKEN_STORAGE === 2) {
            LS.removeItem(Identifier);
        }

        Store.dispatch(SET_AUTH(false));

        return true;
    }


    /**
     * Real time auth guard
     * @returns {boolean}
     * @constructor
     */
    TurnOnGuard() {
        let _identifier;

        if (CONFIG.SERVICES.AUTH.TOKEN_STORAGE === 1) {
            _identifier = cookies.get(Identifier);
        } else if (CONFIG.SERVICES.AUTH.TOKEN_STORAGE === 2) {
            _identifier = LS.getItem(Identifier);
        }

        if (_identifier === '' || _identifier === null || typeof _identifier === 'undefined') {
            Store.dispatch(SET_AUTH(false));
            return false;
        }

        let self = this;
        setTimeout(function () {
            self.TurnOnGuard();
        }, 100);
    }

}

export {Auth_Service as Auth};
