import SessionManager from "./sessionManager.js";

const BaseURL = "https://localhost:7142/";

export function PostLogin(user) {
    return fetch(BaseURL + "api/Auth/Login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(result => {
            SessionManager.setUserSession(result);
            return result;
        })
        .catch(error => {
            return error;
        });
}

export function CreateUser(user) {
    return fetch(BaseURL + "api/User/Create", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...user,
            roles: ["User"]
        })
    })
        .then(response => {
            if (response.ok) {
                return true
            } else {
                return false;
            }
        });
}