const SessionManager = {
    getToken() {
        const token = sessionStorage.getItem('token');
        if (token) return token;
        else return null;
    },

    isAuth() {
        return sessionStorage.getItem('isAuth') ?? false;
    },

    setUserSession(result) {
        sessionStorage.setItem('userName', result.name);
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('userId', result.userId);
        sessionStorage.setItem('usersRole', result.roles);
        sessionStorage.setItem('isAuth', true);
    },

    removeUserSession() {
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('usersRole');
        sessionStorage.removeItem('isAuth');
    },

    getUserSession() {
        const user = {
            username: sessionStorage.getItem('userName'),
            token: sessionStorage.getItem('token'),
            id: sessionStorage.getItem('userId'),
            roles: sessionStorage.getItem('usersRole')
        }

        return user;
    }
}

export default SessionManager;