<template>
  <NuxtLayout name="dashboard">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Devices</h2>
        <p class="text-gray-500 mt-1">Manage connected clients and network sessions</p>
      </div>
      <div class="flex items-center space-x-3">
        <button @click="scanNetwork" :disabled="isScanning" class="premium-button flex items-center space-x-2">
          <svg v-if="isScanning" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ isScanning ? 'Discovery in Progress...' : 'Scan Network' }}</span>
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       <div v-for="device in activeDevices" :key="device.id" class="glass-card p-6 flex flex-col group relative overflow-hidden transition-all hover:border-gray-900">
          <div class="flex items-start justify-between mb-6">
             <div class="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all">
                <svg v-if="device.deviceType === 'Mobile'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
             </div>
             <div class="flex items-center space-x-2">
                <span :class="device.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                   {{ device.status }}
                </span>
             </div>
          </div>

          <h4 class="text-lg font-black text-gray-900 mb-1 truncate">{{ device.deviceName }}</h4>
          <p class="text-xs text-gray-400 font-mono mb-6">{{ device.ipAddress }} • {{ device.macAddress }}</p>

          <div class="space-y-4 pt-4 border-t border-gray-100">
             <div class="flex justify-between items-center text-xs">
                <span class="text-gray-500 font-bold uppercase tracking-widest">Last Seen</span>
                <span class="text-gray-900 font-bold">{{ formatDate(device.lastSeen) }}</span>
             </div>
             <div class="flex justify-between items-center text-xs">
                <span class="text-gray-500 font-bold uppercase tracking-widest">Data Used</span>
                <span class="font-black text-gray-900">{{ (device.totalBandwidthUsed || 0).toFixed(2) }} MB</span>
             </div>
          </div>

          <div class="mt-8 flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all">
             <button v-if="device.status === 'ACTIVE'" @click="blockDevice(device.id)" class="px-4 py-2 border border-red-200 text-red-600 text-xs font-bold rounded-lg uppercase tracking-widest hover:bg-red-50 w-full text-center">Kick & Block</button>
             <button v-else @click="unblockDevice(device.id)" class="px-4 py-2 border border-green-200 text-green-600 text-xs font-bold rounded-lg uppercase tracking-widest hover:bg-green-50 w-full text-center">Unblock</button>
          </div>
       </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false
})

const apiBase = 'http://localhost:8080/api/v1'
const isScanning = ref(false)

const { data: devicesData, refresh: refreshDevices } = await useFetch(`${apiBase}/devices/active`)
const activeDevices = computed(() => devicesData.value || [])

const scanNetwork = async () => {
    isScanning.value = true
    try {
        await $fetch(`${apiBase}/devices/scan`, { method: 'POST' })
        refreshDevices()
    } finally {
        setTimeout(() => {
            isScanning.value = false
        }, 2000)
    }
}

const blockDevice = async (id) => {
    await $fetch(`${apiBase}/devices/${id}/block`, { method: 'POST' })
    refreshDevices()
}

const unblockDevice = async (id) => {
    await $fetch(`${apiBase}/devices/${id}/unblock`, { method: 'POST' })
    refreshDevices()
}

const formatDate = (date) => {
    if (!date) return 'Never'
    return new Date(date).toLocaleTimeString()
}
</script>
