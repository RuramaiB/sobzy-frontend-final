<template>
  <NuxtLayout name="dashboard">
  <div class="space-y-10 pb-20">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-4xl font-black text-gray-900 tracking-tight">Network Dashboard</h2>
        <p class="text-gray-500 mt-1 font-medium italic">Unified control for Windows Hotspot, Connected Devices, and AI Intelligence</p>
      </div>
      <div class="flex items-center space-x-3">
        <button @click="scanNetwork" :disabled="isScanning" class="premium-button flex items-center space-x-2">
          <svg v-if="isScanning" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="font-black italic uppercase tracking-widest text-[10px]">{{ isScanning ? 'Discovery in Progress...' : 'Scan Network' }}</span>
        </button>
      </div>
    </header>

    <!-- Top Section: Hotspot Control + AI Stats -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Hotspot Control -->
      <div class="lg:col-span-2 glass-card p-10 flex flex-col justify-between overflow-hidden relative min-h-[400px]">
        <div class="absolute top-0 right-0 p-8">
           <div :class="isBroadcasting ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'" class="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center space-x-2">
              <span :class="isBroadcasting ? 'bg-green-500 animate-pulse' : 'bg-gray-400'" class="w-2 h-2 rounded-full"></span>
              <span>{{ isBroadcasting ? 'Hotspot Active' : 'Hotspot Off' }}</span>
           </div>
        </div>

        <div class="max-w-md">
            <h3 class="text-3xl font-black text-gray-900 mb-4 tracking-tighter italic">Windows Hotspot</h3>
            <p class="text-gray-500 mb-10 font-medium leading-relaxed">Broadcast your wireless network. All traffic is intercepted and classified by the AI engine locally.</p>
            
            <div class="space-y-6 mb-12">
               <div class="flex items-center space-x-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 group transition-all hover:bg-white hover:shadow-lg">
                  <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all">
                     <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                     </svg>
                  </div>
                  <div>
                     <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Network SSID</span>
                     <span class="text-xl font-black text-gray-900">{{ hotspotInfo.ssid || 'Fetching...' }}</span>
                  </div>
               </div>

               <div class="flex items-center space-x-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 group transition-all hover:bg-white hover:shadow-lg">
                  <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all">
                     <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                     </svg>
                  </div>
                  <div class="flex-1">
                     <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Security Key</span>
                     <div class="flex items-center justify-between">
                         <span class="text-xl font-black text-gray-900 tracking-wider">{{ showPassword ? hotspotInfo.password : '••••••••' }}</span>
                         <button @click="showPassword = !showPassword" class="text-gray-400 hover:text-gray-900 transition-colors">
                             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                 <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                 <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.888 9.888L2 2l1.414 1.414 1.414 1.414L22 22l-1.414-1.414-1.414-1.414" />
                             </svg>
                         </button>
                     </div>
                  </div>
               </div>
            </div>

            <button @click="toggleHotspot" :disabled="loading" class="premium-button w-full flex items-center justify-center space-x-3 py-6 text-base italic">
               <svg v-if="loading" class="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               <span v-else class="uppercase font-black tracking-widest">{{ isBroadcasting ? 'Stop Network Broadcast' : 'Start Network Broadcast' }}</span>
            </button>
        </div>
      </div>

      <!-- AI & Network Stats -->
      <div class="space-y-8">
         <div class="glass-card p-8 group transition-all hover:bg-gray-900 text-gray-900 hover:text-white min-h-[170px] flex flex-col justify-center">
            <h5 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 group-hover:text-gray-300">Live AI Classification</h5>
            <div class="flex items-center justify-between">
               <div>
                  <span class="text-4xl font-black italic">Active</span>
                  <p class="text-[10px] font-bold text-gray-400 mt-1 uppercase group-hover:text-gray-300">Smile Engine v1.0 • RF</p>
               </div>
               <div class="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-current group-hover:bg-white/10 transition-all">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
               </div>
            </div>
         </div>

         <div class="glass-card p-8 bg-black text-white min-h-[170px] flex flex-col justify-center border-none">
            <h5 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Network Load</h5>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-3xl font-black italic">{{ hotspotInfo.connectedDevices?.length || 0 }}</span>
                  <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mt-0.5">Connected Clients</span>
                </div>
                <div class="text-right">
                  <span class="text-xl font-black italic">{{ hotspotInfo.hostIp || '0.0.0.0' }}</span>
                  <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mt-0.5">Gateway IP</span>
                </div>
              </div>
            </div>
         </div>
      </div>
    </div>

    <!-- Connected Devices Section -->
    <div class="glass-card p-10">
       <div class="flex items-center justify-between mb-10 border-b border-gray-100 pb-10">
          <div>
            <h3 class="text-3xl font-black text-gray-900 tracking-tighter italic">Connected Devices</h3>
            <p class="text-sm text-gray-500 mt-1 font-medium italic">Real-time view of hardware currently using your connection</p>
          </div>
          <div class="flex items-center space-x-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
            <div class="animate-pulse w-3 h-3 rounded-full bg-green-500"></div>
            <span class="text-[11px] font-black text-gray-900 uppercase tracking-widest">
              {{ hotspotInfo.connectedDevices?.length || 0 }} Devices Online
            </span>
          </div>
       </div>

       <div v-if="hotspotInfo.connectedDevices?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="device in hotspotInfo.connectedDevices" :key="device.mac" 
               class="p-8 bg-gray-50 rounded-3xl border border-gray-100 transition-all hover:bg-white hover:shadow-2xl hover:-translate-y-1 group">
            <div class="flex items-start space-x-6">
              <!-- Device Icon -->
              <div class="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all transform group-hover:rotate-6">
                <svg v-if="device.deviceType === 'Mobile' || device.hostname?.toLowerCase().includes('android') || device.hostname?.toLowerCase().includes('iphone')" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <!-- Device Info -->
              <div class="flex-1 min-w-0">
                <h4 class="text-lg font-black text-gray-900 truncate mb-1 group-hover:text-black transition-colors italic tracking-tight">{{ device.hostname || 'Unknown Device' }}</h4>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span :class="device.authenticated ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'" class="px-2 py-0.5 text-[8px] uppercase font-black rounded tracking-widest">
                      {{ device.authenticated ? 'Logged In' : 'Portal Redirect' }}
                    </span>
                    <span :class="device.blocked ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'" class="px-2 py-0.5 text-[8px] uppercase font-black rounded tracking-widest">
                      {{ device.blocked ? 'Internet: Blocked' : (device.authenticated ? 'Internet: Full Access' : 'Internet: Restricted') }}
                    </span>
                </div>
                
                <div class="space-y-2 font-mono">
                  <div class="flex flex-col">
                    <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Address IP</span>
                    <span class="text-xs font-bold text-gray-900">{{ device.ip || 'DHCP Assigning...' }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">MAC Identity</span>
                    <span class="text-xs font-bold text-gray-900 uppercase">{{ device.mac }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <button class="text-[9px] font-black uppercase text-gray-400 hover:text-red-600 transition-colors tracking-widest italic">Terminate Session</button>
                <div class="flex items-center space-x-1">
                    <div class="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span class="text-[8px] font-black text-gray-900 uppercase">Signal Strong</span>
                </div>
            </div>
          </div>
       </div>

       <div v-else class="py-24 flex flex-col items-center justify-center text-center">
          <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-8 border-4 border-white shadow-xl">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3a10.003 10.003 0 00-6.912 2.744m3.44 2.04L9.75 11" />
            </svg>
          </div>
          <h4 class="text-2xl font-black text-gray-900 mb-2 italic">Scanning for connections...</h4>
          <p class="text-gray-400 max-w-xs mx-auto font-medium italic">Broadcast the hotspot to see devices appearing here in real-time.</p>
       </div>
    </div>
  </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

const apiBase = ref('http://localhost:1998/api/v1')
const hotspotInfo = ref({
  ssid: '',
  password: '',
  status: 'Off',
  hostIp: '',
  gatewayIp: '192.168.137.1',
  upstreamInterface: '',
  connectedDevices: []
})
const loading = ref(false)
const isScanning = ref(false)
const showPassword = ref(false)

const isBroadcasting = computed(() => {
    if (!hotspotInfo.value.status) return false
    const status = hotspotInfo.value.status.toLowerCase()
    return status === 'on' || status === 'running' || status === 'success' || status === 'broadcasting'
})

const fetchHotspotDetails = async () => {
    try {
        const data = await $fetch(`${apiBase.value}/hotspot/details`)
        // If the backend returns device list separately or within details, handle it
        hotspotInfo.value = data
        
        // Ensure connectedDevices is always an array
        if (!hotspotInfo.value.connectedDevices) {
            hotspotInfo.value.connectedDevices = []
        }
    } catch (e) {
        console.error("Failed to fetch hotspot details", e)
    }
}

const toggleHotspot = async () => {
    loading.value = true
    try {
        const action = isBroadcasting.value ? 'stop' : 'start'
        await $fetch(`${apiBase.value}/hotspot/${action}`, { method: 'POST' })
        // Immediate refresh
        await fetchHotspotDetails()
    } catch (e) {
        console.error("Hotspot toggle failed", e)
    } finally {
        setTimeout(() => { loading.value = false }, 1000)
    }
}

const scanNetwork = async () => {
    isScanning.value = true
    try {
        // Trigger a backend scan if available, otherwise just refresh details
        await $fetch(`${apiBase.value}/devices/scan`, { method: 'POST' }).catch(() => {})
        await fetchHotspotDetails()
    } finally {
        setTimeout(() => { isScanning.value = false }, 3000)
    }
}

onMounted(() => {
    apiBase.value = `http://${window.location.hostname}:1998/api/v1`
    fetchHotspotDetails()
    // Refresh periodically
    const interval = setInterval(fetchHotspotDetails, 5000)
    onUnmounted(() => clearInterval(interval))
})
</script>
