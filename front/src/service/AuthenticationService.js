import axios from 'axios';

const API_URL = 'http://localhost:8080';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    executeAuthenticationService(username, password) {
        return axios.get(`${API_URL}/auth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } });
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    registerSuccessfulLogin(username, password) {
        console.log('registerSuccessfulLogin');
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user !== null;
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