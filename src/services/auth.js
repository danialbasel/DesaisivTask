import api from "./api"

const Auth = {
    SignIn: ({ email, password, rememberMe }) => {
        api.post('https://api.escuelajs.co/api/v1/auth/login', { email, password }).then(res => {
            //navigator
            const { access_token, refresh_access_token } = res.data;
            if (rememberMe) {
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_access_token', refresh_access_token);
            } else {
                sessionStorage.setItem('access_token', access_token);
                sessionStorage.setItem('refresh_access_token', refresh_access_token);
            }
        }).catch(err => {
            //display err
        })
    },
    RefreshAccessToken: async () => {
        try {
            const oldRefreshToken = localStorage.getItem('refresh_access_token') != null ? localStorage.getItem('refresh_access_token') : sessionStorage.getItem('refresh_access_token');
            const { access_token, refresh_access_token } = (await api.put("https://api.escuelajs.co/api/v1/auth/refresh-token", { refreshToken: oldRefreshToken })).data
            if (localStorage.getItem('refresh_access_token') != null) {
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_access_token', refresh_access_token);
            } else {
                sessionStorage.setItem('access_token', access_token);
                sessionStorage.setItem('refresh_access_token', refresh_access_token);
            }
        } catch (e) {
            //no new access_token
        }
    },
    SignOut: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_access_token');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_access_token');
        //Navigate to login
    }
}

export default Auth;