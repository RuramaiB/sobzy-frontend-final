<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6 selection:bg-gray-900 selection:text-white relative overflow-hidden">
    <!-- Branding Background -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

    <div class="max-w-md w-full relative z-10">
      <!-- Branding -->
      <div class="flex items-center justify-center space-x-3 mb-10">
        <div class="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-2xl rotate-3">
          <span class="text-white font-black text-2xl">H</span>
        </div>
        <div class="text-left">
          <h1 class="text-2xl font-black tracking-tighter leading-none">HIT-IWACS</h1>
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Network Access Control</p>
        </div>
      </div>

      <div class="glass-card p-10 border-2 border-gray-900/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
        <div class="mb-10 text-center">
          <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-2">Network Login</h2>
          <p class="text-gray-500 font-medium">Please authenticate to access the university network services.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl">
             <p class="text-xs font-bold text-red-700 uppercase tracking-wider">{{ error }}</p>
          </div>

          <div v-if="success" class="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-xl">
             <p class="text-xs font-bold text-green-700 uppercase tracking-wider">Authentication Successful! Redirecting...</p>
          </div>

          <div class="space-y-2">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Student / Staff ID</label>
            <input 
              v-model="form.username"
              type="text" 
              placeholder="e.g. H210452X"
              class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gray-900 focus:bg-white outline-none transition-all font-bold text-gray-900"
              required
            >
          </div>
          
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Access PIN</label>
            <input 
              v-model="form.password"
              type="password" 
              placeholder="••••••••"
              class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gray-900 focus:bg-white outline-none transition-all font-bold tracking-widest text-gray-900"
              required
            >
          </div>

          <div class="flex gap-4">
              <button 
                type="submit" 
                :disabled="loading || success"
                class="flex-1 premium-button !py-5 flex items-center justify-center space-x-3 group mt-4 transition-all active:scale-95"
              >
                <span v-if="loading" class="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></span>
                <span v-else class="text-lg">Authorize Device</span>
                <svg v-if="!loading" class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <!-- Dev Mode Helper -->
              <button 
                type="button"
                @click="prefillAdmin"
                class="mt-4 px-4 bg-gray-100 text-gray-400 hover:text-gray-900 rounded-2xl transition-all flex items-center justify-center"
                title="Development Bypass (admin/admin)"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
          </div>
        </form>

        <div class="mt-8 text-center">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">
                New user? 
                <NuxtLink to="/register" class="text-gray-900 hover:underline ml-1">Create an account</NuxtLink>
            </p>
        </div>

        <div class="mt-10 pt-8 border-t border-gray-100">
           <div class="flex items-center space-x-3 text-gray-400">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-[10px] font-black uppercase tracking-[0.2em]">Monitoring System Active</span>
           </div>
        </div>
      </div>

      <p class="mt-12 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-loose">
        By connecting, you agree to the HIT <br>
        Acceptable Use Policy & Privacy standards.
      </p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const router = useRouter()
const { login } = useAuth()
const loading = ref(false)
const error = ref(null)
const success = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const prefillAdmin = () => {
    form.username = 'admin'
    form.password = 'admin'
}

const handleLogin = async () => {
    loading.value = true
    error.value = null
    try {
        // 1. Authenticate with backend
        const apiBase = 'http://localhost:8080/api/v1/auth'
        const authData = await $fetch(`${apiBase}/login`, {
            method: 'POST',
            body: form
        })

        if (authData.accessToken) {
            // 2. Store tokens and user info
            login(authData.accessToken, authData.user)

            // 3. Register IP in Captive Portal
            const portalApi = 'http://localhost:8080/api/v1/portal'
            try {
                await $fetch(`${portalApi}/login-success`, { 
                    method: 'POST',
                    body: { username: form.username }
                })
            } catch (portalError) {
                console.warn("Portal registration failed, but auth was successful", portalError)
            }
            
            // 4. Success feedback (important for Captive Portal detection systems)
            success.value = true
            
            // 5. Short delay before redirection to ensure the OS detects internet
            setTimeout(() => {
                router.push('/dashboard')
            }, 1500)
        }
    } catch (e) {
        console.error("Login failed", e)
        error.value = e.data?.message || "Authentication failed. Please check your credentials."
    } finally {
        loading.value = false
    }
}
</script>


<style scoped>
.glass-card {
  background: white;
  @apply rounded-[32px];
}
</style>


<style scoped>
.glass-card {
  background: white;
  @apply rounded-[32px];
}
</style>
