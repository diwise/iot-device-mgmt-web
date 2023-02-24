import Keycloak from "keycloak-js";

const _kc = new Keycloak('/config/keycloak.json');
_kc["initialized"] = false;

const initKeycloak = (onAuthenticatedCallback) => {
    _kc.init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
    }).then((authenticated) => {
        if (authenticated) {
            _kc.initialized = true;
            onAuthenticatedCallback();
        } else {
            console.warn('not authenticated!')
            doLogin();
        }
    })
};

const doLogin = _kc.login

const doLogout = _kc.logout

const getToken = () => _kc.token

const updateToken = (successCallback) => {
    if (_kc.initialized) {
        _kc.updateToken(5)
            .then((refreshed) => {
                if (refreshed) {
                    console.log("token refresh");
                } else {
                    console.log("token still valid");
                }

                successCallback();
            })
            .catch(doLogin);
    } else {
        successCallback();
    }
};

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    getToken,
    updateToken,
}

export default UserService;