export const TokenService = {

    setToken(token: string) {
        return localStorage.setItem('token', token)
    },

    getToken() {
        return localStorage.getItem('token')
    }

}