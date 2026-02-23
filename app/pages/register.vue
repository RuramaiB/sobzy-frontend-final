<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6 selection:bg-gray-900 selection:text-white relative overflow-hidden">
    <!-- Branding Background -->
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

    <div class="max-w-xl w-full relative z-10">
      <!-- Branding -->
      <div class="flex items-center justify-center space-x-3 mb-8">
        <div class="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-xl rotate-3">
          <span class="text-white font-black text-xl">H</span>
        </div>
        <div class="text-left">
          <h1 class="text-xl font-black tracking-tighter leading-none">HIT-IWACS</h1>
          <p class="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Network Access Control</p>
        </div>
      </div>

      <div class="glass-card p-10 border-2 border-gray-900/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
        <div class="mb-8">
          <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-2">Create Account</h2>
          <p class="text-gray-500 font-medium text-sm">Join the university network monitoring system.</p>
        </div>

        <form @submit.prevent="handleRegister" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="error" class="col-span-1 md:col-span-2 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
             <p class="text-xs font-bold text-red-700 uppercase tracking-wider">{{ error }}</p>
          </div>

          <div class="space-y-2 col-span-1 md:col-span-2">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
            <input 
              v-model="form.fullName"
              type="text" 
              placeholder="John Doe"
              class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gray-900 focus:bg-white outline-none transition-all font-bold text-gray-900"
              required
            >
          </div>

          <div class="space-y-2">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Username</label>
            <input 
              v-model="form.username"
              type="text" 
              placeholder="e.g. H210452X"
              class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gray-900 focus:bg-white outline-none transition-all font-bold text-gray-900"
              required
            >
          </div>

          <div class="space-y-2">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
            <input 
              v-model="form.email"
              type="email" 
              placeholder="id@hit.ac.zw"
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

          <div class="space-y-2">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Confirm PIN</label>
            <input 
              v-model="form.confirmPassword"
              type="password" 
              placeholder="••••••••"
              class="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gray-900 focus:bg-white outline-none transition-all font-bold tracking-widest text-gray-900"
              required
            >
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="col-span-1 md:col-span-2 w-full premium-button !py-5 flex items-center justify-center space-x-3 group mt-4 transition-all active:scale-95"
          >
            <span v-if="loading" class="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"></span>
            <span v-else class="text-lg">Register Account</span>
            <svg v-if="!loading" class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        <div class="mt-8 text-center">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Already have an account? 
                <NuxtLink to="/login" class="text-gray-900 hover:underline ml-1">Log in here</NuxtLink>
            </p>
        </div>
      </div>
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

const form = reactive({
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
        error.value = "Passwords do not match."
        return
    }

    loading.value = true
    error.value = null
    try {
        const apiBase = 'http://localhost:8080/api/v1/auth'
        
        // 1. Register user
        const authData = await $fetch(`${apiBase}/register`, {
            method: 'POST',
            body: {
                fullName: form.fullName,
                username: form.username,
                email: form.email,
                password: form.password
            }
        })

        if (authData.accessToken) {
            // 2. Automatically log in after registration
            login(authData.accessToken, authData.user)
            
            // 3. Redirect to dashboard
            router.push('/dashboard')
        }
    } catch (e) {
        console.error("Registration failed", e)
        error.value = e.data?.message || "Registration failed. Please try again."
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

.premium-button {
  @apply bg-gray-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
