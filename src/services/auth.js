import api from "./api"

const Auth = {
    SignIn: ({ email, password, rememberMe }) => {
        api.post('signIn', { email, password }).then(res => {
            //navigator
            const { token, refreshToken } = res;
            if (rememberMe) {
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
            } else {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('refreshToken', refreshToken);
            }
        }).catch(err => {
            //display err
        })
    },
    refreshToken: async () => {
        try {
            const oldRefreshToken = localStorage.getItem('refreshToken') != null ? localStorage.getItem('refreshToken') : sessionStorage.getItem('refreshToken');
            const { token, refreshToken } = await api.put("refreshToken", { refreshToken: oldRefreshToken })
            if (localStorage.getItem('refreshToken') != null) {
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
            } else {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('refreshToken', refreshToken);
            }
        } catch (e) {
            //no new token
        }
    },
    SignOut: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        //Navigate to login
    }
}

export default Auth;