import Keycloak from "keycloak-js";
import DeviceService from "./DeviceService";

const _kc = new Keycloak('/config/keycloak.json')

const initKeycloak = (onAuthenticatedCallback) => {
    _kc.init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
    })
    .then((authenticated) => {
        if (authenticated) {
            onAuthenticatedCallback();
            DeviceService.getDeviceData()
        } else {
            console.warn('not authenticated!')
            doLogin();
        }
    })
};

const doLogin = _kc.login

const doLogout = _kc.logout

const getToken = () => _kc.token

const updateToken = (successCallback) =>
    _kc.updateToken(5).then(successCallback).catch(doLogin);

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    getToken,
    updateToken,
}

export default UserService;