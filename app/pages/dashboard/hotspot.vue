<template>
  <NuxtLayout name="dashboard">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Hotspot Configuration</h2>
        <p class="text-gray-500 mt-1">Manage the Windows Mobile Hotspot and network SSID</p>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Hotspot Control -->
      <div class="lg:col-span-2 glass-card p-10 flex flex-col justify-between overflow-hidden relative">
        <div class="absolute top-0 right-0 p-8">
           <div :class="isBroadcasting ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'" class="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-2">
              <span :class="isBroadcasting ? 'bg-green-500 animate-pulse' : 'bg-gray-400'" class="w-2 h-2 rounded-full"></span>
              <span>{{ isBroadcasting ? 'Broadcasting' : 'Inactive' }}</span>
           </div>
        </div>

        <div class="max-w-md">
           <h3 class="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Windows Hotspot</h3>
           <p class="text-gray-500 mb-10 font-medium leading-relaxed">Broadcast a secure wireless network. All connected devices will be routed through the AI classification layer.</p>
           
           <div class="space-y-6 mb-12">
              <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                 <div class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-900">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                 </div>
                 <div>
                    <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest block">SSID</span>
                    <span class="text-lg font-bold text-gray-900">{{ hotspotInfo.ssid || 'Loading...' }}</span>
                 </div>
              </div>

              <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                 <div class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-900">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                 </div>
                 <div class="flex-1">
                    <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Password</span>
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-bold text-gray-900">{{ showPassword ? hotspotInfo.password : '********' }}</span>
                        <button @click="showPassword = !showPassword" class="text-gray-400 hover:text-gray-900 transition-colors">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L2 2l1.414 1.414 1.414 1.414L22 22l-1.414-1.414-1.414-1.414" />
                            </svg>
                        </button>
                    </div>
                 </div>
              </div>
           </div>

           <div class="flex space-x-4">
              <button @click="toggleHotspot" :disabled="loading" class="premium-button flex-1 flex items-center justify-center space-x-2 py-5">
                 <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 <span v-else>{{ isBroadcasting ? 'Stop Hotspot' : 'Start Hotspot' }}</span>
              </button>
           </div>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="space-y-8">
         <div class="glass-card p-8 group transition-all hover:bg-gray-900">
            <h5 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 group-hover:text-gray-300">Active Clients</h5>
            <div class="flex items-center justify-between">
               <span class="text-5xl font-black text-gray-900 group-hover:text-white">--</span>
               <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 group-hover:bg-white/10 group-hover:text-white transition-all">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
               </div>
            </div>
         </div>

         <div class="glass-card p-8">
            <h5 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Signal Integrity</h5>
            <div class="flex items-center space-x-4">
               <div class="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div class="bg-gray-900 h-full" :style="{ width: isBroadcasting ? '94%' : '0%' }"></div>
               </div>
               <span class="text-lg font-black text-gray-900">{{ isBroadcasting ? '94%' : '0%' }}</span>
            </div>
            <p class="text-[10px] text-gray-400 mt-4 font-bold uppercase">{{ isBroadcasting ? 'Optimal performance detected' : 'Hotspot is offline' }}</p>
         </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false
})

const apiBase = 'http://localhost:8080/api/v1/hotspot'
const hotspotInfo = ref({
  ssid: '',
  password: '',
  status: 'Off'
})
const loading = ref(false)
const showPassword = ref(false)

const isBroadcasting = computed(() => {
    return hotspotInfo.value.status === 'On' || hotspotInfo.value.status === 'Running' || hotspotInfo.value.status === 'Success'
})

const fetchHotspotDetails = async () => {
    try {
        const data = await $fetch(`${apiBase}/details`)
        hotspotInfo.value = data
    } catch (e) {
        console.error("Failed to fetch hotspot details", e)
    }
}

const toggleHotspot = async () => {
    loading.value = true
    try {
        const action = isBroadcasting.value ? 'stop' : 'start'
        await $fetch(`${apiBase}/${action}`, { method: 'POST' })
        // Poll for status update
        await fetchHotspotDetails()
    } catch (e) {
        console.error("Hotspot toggle failed", e)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchHotspotDetails()
    // Optional: Refresh periodically
    const interval = setInterval(fetchHotspotDetails, 5000)
    onUnmounted(() => clearInterval(interval))
})
</script>

