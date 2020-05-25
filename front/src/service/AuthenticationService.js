import axios from 'axios';

const API_URL = 'http://localhost:8080';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
export const USER_NAME = undefined;

class AuthenticationService {

    executeAuthenticationService(username, password) {
        return axios.get(`${API_URL}/auth`, {headers: {authorization: this.createBasicAuthToken(username, password)}});
    }

    handleLoginError(error) {
        if (error.response.status === 401) {
            alert("Invalid email or password");
        } else {
            alert("Something went wrong, try again later");
        }
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    registerSuccessfulLogin(username, password) {
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, window.btoa(username + ":" + password));
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
        document.getElementById("logged-in").hidden = false;
        document.getElementById("logged-out").hidden = true;
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user !== null;
    }

    getUserName() {
        return localStorage.getItem(USER_NAME);
    }

    logout() {
        localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        document.getElementById("logged-in").hidden = true;
        document.getElementById("logged-out").hidden = false;
    }

    getAuthToken() {
        return 'Basic ' + localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config
            }
        )
    }

}

export default new AuthenticationService()