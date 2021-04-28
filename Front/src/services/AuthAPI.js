import axios from 'axios';
import jwtDecode from 'jwt-decode';

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
} 

function authenticate(credentials) {
   return axios.post("http://127.0.0.1:8000/api/login_check", credentials)
         .then(response => response.data.token)
         .then(token => {
            window.localStorage.setItem("authToken", token);
            axios.defaults.headers["Authorization"] = "Bearer " + token;   
            return true;
        });
}

function setup() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()) {
            axios.defaults.headers["Authorization"] = "Bearer " + token;
            console.log("Connexion établie");
        } else {
            logout();  
        }
    } else {
        logout();
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

// eslint-disable-next-line
export default {
    authenticate,
    logout, 
    setup,
    isAuthenticated
}