export default defineNuxtRouteMiddleware((to) => {
    const { token } = useAuth()

    // Protected routes (any route starting with /dashboard)
    if (to.path.startsWith('/dashboard')) {
        if (!token.value) {
            console.log("Middleware: No token found. Redirecting to /login")
            return navigateTo('/login')
        }
    }

    // Redirect authenticated users away from login/register pages
    if (token.value && (to.path === '/login' || to.path === '/admin-login' || to.path === '/register')) {
        return navigateTo('/dashboard')
    }
})
