export const useAuth = () => {
    const token = useCookie('auth_token')
    const user = useState('auth_user', () => null)

    const login = (tokenValue, userData) => {
        token.value = tokenValue
        user.value = userData
        localStorage.setItem('auth_token', tokenValue)
        localStorage.setItem('auth_user', JSON.stringify(userData))
    }

    // Hydrate on client side
    if (process.client) {
        const storedUser = localStorage.getItem('auth_user')
        if (storedUser && !user.value) {
            user.value = JSON.parse(storedUser)
        }
    }

    const logout = () => {
        token.value = null
        user.value = null
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        navigateTo('/login')
    }

    return {
        token,
        user,
        login,
        logout
    }
}
