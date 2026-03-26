export const useAuth = () => {
    const token = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7, path: '/' })
    const user = useCookie('auth_user', { maxAge: 60 * 60 * 24 * 7, path: '/' })

    const login = (tokenValue, userData) => {
        token.value = tokenValue
        user.value = userData
    }

    const logout = () => {
        token.value = null
        user.value = null
        navigateTo('/login')
    }

    return {
        token,
        user,
        login,
        logout
    }
}
