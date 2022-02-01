import { UserManager, WebStorageStateStore } from "oidc-client";

export default class AuthService {

    constructor(goto = '') {
        
        const AUTH0_DOMAIN = window.env.VUE_APP_KEYCLOAK_ENDPOINT+"auth/realms/"+window.env.VUE_APP_ADMIN_REALM;
        
        const settings = {
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            authority: AUTH0_DOMAIN,
            client_id: window.env.VUE_APP_CLIENT_ID,
            client_secret: window.env.VUE_APP_CLIENT_SECRET,
            redirect_uri: window.env.VUE_APP_PORTAL_ENDPOINT + "static/callback.html?goto=" + goto,
            response_type: "code",
            scope: "openid",
            post_logout_redirect_uri: window.env.VUE_APP_PORTAL_ENDPOINT,
            filterProtocolClaims: true,
            loadUserInfo: true,
            automaticSilentRenew: true,
            response_mode: "query",
            metadata: {
                issuer: AUTH0_DOMAIN + "/",
                authorization_endpoint: AUTH0_DOMAIN + "/protocol/openid-connect/auth",
                end_session_endpoint: AUTH0_DOMAIN + "/v2/logout",
                jwks_uri: AUTH0_DOMAIN + "/.well-known/openid-configuration"
            }
        };
        this.userManager = new UserManager(settings);
    }
    getUser() {
        return this.userManager.getUser();
    }
    getAccessToken() {
        let userInfo = this.userManager.getUser();
        return userInfo.access_token;
    }
    login() {
        return this.userManager.signinRedirect();
    }
    logout() {
        return this.userManager.signoutRedirect();
    }
}
