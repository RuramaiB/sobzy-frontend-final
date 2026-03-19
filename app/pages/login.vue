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
          <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-2">
            {{ isAdminMode ? 'Admin Login' : 'Network Login' }}
          </h2>
          <p class="text-gray-500 font-medium text-sm">
            {{ isAdminMode ? 'Sign in to your account with your credentials' : 'Enter your email to access the network services.' }}
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl">
             <p class="text-xs font-bold text-red-700 uppercase tracking-wider">{{ error }}</p>
          </div>

          <div v-if="success" class="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-xl">
             <p class="text-xs font-bold text-green-700 uppercase tracking-wider">Authentication Successful!</p>
          </div>

          <div class="space-y-2">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
            <input 
              v-model="form.username"
              type="email" 
              placeholder="e.g. user@hit.ac.zw"
              class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gray-900 focus:bg-white outline-none transition-all font-bold text-gray-900"
              required
            >
          </div>

          <div v-if="isAdminMode" class="space-y-2 animate-in transition-all duration-300">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Password</label>
            <input 
              v-model="form.password"
              type="password" 
              placeholder="••••••••"
              class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gray-900 focus:bg-white outline-none transition-all font-bold text-gray-900"
              required
            >
          </div>

          <div class="flex gap-4">
              <button 
                type="submit" 
                :disabled="loading || success"
                class="flex-1 premium-button !py-5 flex items-center justify-center space-x-3 group mt-4 transition-all active:scale-95 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl"
              >
                <span v-if="loading" class="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></span>
                <span v-else class="text-lg font-bold">{{ isAdminMode ? 'Sign In' : 'Connect to Network' }}</span>
                <svg v-if="!loading" class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <!-- Dev Mode Helper -->
              <button 
                v-if="!isAdminMode"
                type="button"
                @click="prefillAdmin"
                class="mt-4 px-4 bg-gray-100 text-gray-400 hover:text-gray-900 rounded-2xl transition-all flex items-center justify-center"
                title="Development Bypass (dev@hit.ac.zw)"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
          </div>
        </form>

        <div class="mt-8 text-center">
            <button @click="isAdminMode = !isAdminMode" class="text-xs font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-gray-900 transition-colors">
                {{ isAdminMode ? '← Back to Network Access' : 'Login as Administrator →' }}
            </button>
        </div>

        <!-- Security Certificate Section -->
        <div v-if="!isAdminMode" class="mt-8 p-6 bg-gray-50 rounded-[24px] border-2 border-dashed border-gray-200 text-center">
            <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">SSL Security Setup</h3>
            <p class="text-[11px] font-bold text-gray-500 mb-4 leading-relaxed">To access Gmail, Google Maps, and secure sites, please install our security certificate.</p>
            <a :href="`http://${appHostname}:1998/api/v1/portal/ca-cert`" download
               class="inline-flex items-center space-x-2 px-5 py-2.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-wider rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
               <span>Download Certificate</span>
            </a>
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
const auth = useAuth()
const loading = ref(false)
const error = ref(null)
const success = ref(false)
const isAdminMode = ref(false)
const appHostname = ref('localhost')

onMounted(() => {
    appHostname.value = window.location.hostname
})

const form = reactive({
  username: '',
  password: ''
})

const prefillAdmin = () => {
    form.username = 'dev@hit.ac.zw'
}

const handleLogin = async () => {
    loading.value = true
    error.value = null
    try {
        const hostname = window.location.hostname
        const apiBase = `http://${hostname}:1998/api/v1`
        
        if (isAdminMode.value) {
            // Administrator Authentication
            const response = await $fetch(`${apiBase}/auth/login`, {
                method: 'POST',
                body: form
            })
            
            auth.login(response.token, response.user)
            success.value = true
            
            setTimeout(() => {
                router.push('/dashboard')
            }, 1000)
            
        } else {
            // Captive Portal Authentication (Network Access)
            await $fetch(`${apiBase}/portal/login-success`, { 
                method: 'POST',
                body: { email: form.username }
            })
            
            success.value = true
            
            setTimeout(() => {
                window.location.href = "http://www.google.com";
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
