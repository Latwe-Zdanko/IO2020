import axios from 'axios';

const API_URL = 'http://localhost:8080';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

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
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
        document.getElementById("logout").hidden = false;
        document.getElementById("sign-in").hidden = true;
        document.getElementById("login").hidden = true;
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user !== null;
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        document.getElementById("logout").hidden = true;
        document.getElementById("sign-in").hidden = false;
        document.getElementById("login").hidden = false;
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

}


export default new AuthenticationService()