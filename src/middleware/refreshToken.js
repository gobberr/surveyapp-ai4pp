import { parseJwt } from "./../utils/jwt.js";
import AuthService from 'src/services/AuthService.js';
import axios from 'axios'  

export default function refreshToken({ next }) {
    if (localStorage.getItem('access_token')) {
        let tokenParsed = parseJwt(localStorage.getItem('access_token'));
        let tokenExp = new Date(tokenParsed.exp * 1000);
        let now = new Date(); 
        if ( tokenExp < now ){
            let oldRefreshToken = localStorage.getItem('refresh_token');
            let oldRefreshTokenParsed = parseJwt(oldRefreshToken);
            let refreshTokenExp = new Date(oldRefreshTokenParsed.exp * 1000);
            if (refreshTokenExp < now ){
                let auth = new AuthService();
                auth.login();
            } else {
                var http = axios.create({
                    baseURL: window.env.VUE_APP_KEYCLOAK_ENDPOINT,          
                });
                let body = "client_id="+window.env.VUE_APP_CLIENT_ID+"&client_secret="+window.env.VUE_APP_CLIENT_SECRET+"&grant_type=refresh_token&refresh_token="+oldRefreshToken;
                http.post('/auth/realms/'+window.env.VUE_APP_ADMIN_REALM+'/protocol/openid-connect/token', body , {headers: { "Content-Type": "application/x-www-form-urlencoded"}})
                .then(response => {
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);
                    localStorage.setItem('id_token', response.data.id_token);
                }).catch(e => { 
                    console.log("Error: " + e.message); 
                });

            }
        }
    }
    return next();
}