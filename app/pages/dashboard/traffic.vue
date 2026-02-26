<template>
  <NuxtLayout name="dashboard">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Traffic Monitor</h2>
        <p class="text-gray-500 mt-1">Real-time network inspection and AI classification</p>
      </div>
      <div class="flex items-center space-x-3">
        <button @click="refreshTraffic" class="px-4 py-2 bg-white border border-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-50 transition-all flex items-center space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh Feed</span>
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Main Traffic Table -->
      <div class="lg:col-span-3 glass-card overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between bg-white bg-opacity-50">
          <div class="flex items-center space-x-4">
             <div class="relative">
                <input type="text" placeholder="Filter by Domain..." class="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none w-64 transition-all">
             </div>
             <select v-model="selectedDevice" class="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none font-bold">
                <option value="all">All Devices</option>
                <option v-for="device in devices" :key="device.id" :value="device.id">
                   {{ device.deviceName }} ({{ device.ipAddress }})
                </option>
             </select>
          </div>
          <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {{ trafficLogs.length }} Live Connections</div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                <th class="px-6 py-4">State</th>
                <th class="px-6 py-4">Target Destination</th>
                <th class="px-6 py-4">AI Category</th>
                <th class="px-6 py-4">Device / User</th>
                <th class="px-6 py-4">Confidence</th>
                <th class="px-6 py-4 text-right">Activity</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
              <tbody class="divide-y divide-gray-100 italic font-mono text-xs">
                <tr v-for="log in trafficLogs" :key="log.id" class="hover:bg-gray-50 transition-colors bg-white group">
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-2">
                     <span :class="getStatusClass(log.isBlocked)" class="w-2 h-2 rounded-full inline-block"></span>
                     <span class="text-[10px] font-bold uppercase tracking-tight">{{ log.isBlocked ? 'Blocked' : 'Allowed' }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="max-w-xs truncate">
                     <p class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{{ log.url }}</p>
                     <p class="text-[10px] text-gray-400">Method: {{ log.method }} | Size: {{ log.totalSize }}KB</p>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span :class="getCategoryClass(log.category)" class="px-2 py-0.5 rounded text-[10px] font-bold">{{ log.category }}</span>
                </td>
                <td class="px-6 py-4">
                  <p class="text-gray-700 font-bold tracking-tight">{{ log.username }}</p>
                  <p class="text-[10px] text-gray-400 italic">{{ log.deviceName }}</p>
                </td>
                <td class="px-6 py-4">
                   <div class="flex items-center space-x-2">
                      <div class="w-12 bg-gray-100 h-1 rounded-full overflow-hidden">
                         <div class="bg-gray-900 h-full" :style="{ width: (log.confidence * 100) + '%' }"></div>
                      </div>
                      <span class="text-[10px] font-bold text-gray-500">{{ (log.confidence * 100).toFixed(1) }}%</span>
                   </div>
                </td>
                <td class="px-6 py-4 text-right text-gray-400">
                  {{ formatTime(log.requestTimestamp) }}
                </td>
                <td class="px-6 py-4 text-right">
                  <button 
                    v-if="!log.isBlocked"
                    @click="blockDomain(log.domain)" 
                    class="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded hover:bg-red-600 hover:text-white transition-all border border-red-100"
                  >
                    Block
                  </button>
                  <span v-else class="text-[10px] text-gray-400 font-bold uppercase">Locked</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="px-6 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div class="flex items-center space-x-2">
             <span class="text-xs font-bold text-gray-400">Showing recent activity</span>
          </div>
          <div class="flex space-x-2">
            <button class="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-gray-900 transition-all font-bold">‹</button>
            <button class="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-gray-900 transition-all font-bold">›</button>
          </div>
        </div>
      </div>

      <!-- Live Browser Events Sidebar -->
      <div class="glass-card flex flex-col h-[600px]">
        <div class="p-6 border-b border-gray-100 bg-white">
          <h3 class="text-sm font-bold text-gray-900 flex items-center uppercase tracking-widest">
            <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
            Live Browser Events
          </h3>
          <p class="text-[10px] text-gray-500 mt-1 italic">Interactions from mobile & laptops</p>
        </div>
        <div class="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[10px]">
          <div v-for="event in liveEvents" :key="event.id" class="p-3 bg-gray-50 rounded-lg border-l-2 border-gray-900">
            <div class="flex justify-between items-start mb-1">
              <span class="font-bold text-gray-900 uppercase underline">{{ event.eventType }}</span>
              <span class="text-gray-400">{{ formatTime(event.timestamp) }}</span>
            </div>
            <p class="text-gray-700 break-all mb-1">{{ event.details }}</p>
            <div class="flex justify-between text-gray-400 italic">
              <span class="truncate max-w-[100px]">{{ event.url }}</span>
              <span>IP: {{ event.ipAddress }}</span>
            </div>
          </div>
          <div v-if="liveEvents.length === 0" class="text-center py-10 text-gray-400 italic">
            Waiting for device activity...
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false
})

const apiBase = 'http://localhost:1998/api/v1'
const selectedDevice = ref('all')

// Fetch active devices for the filter
const { data: devicesData } = await useFetch(`${apiBase}/devices/active`)
const devices = computed(() => devicesData.value || [])

// Fetch traffic logs from backend with dynamic endpoint based on filter
const { data: trafficData, refresh: refreshTraffic } = await useFetch(() => {
  const endpoint = selectedDevice.value === 'all' 
    ? `${apiBase}/traffic/logs` 
    : `${apiBase}/traffic/logs/device/${selectedDevice.value}`
  return endpoint
}, {
  query: { page: 0, size: 20 },
  watch: [selectedDevice],
  default: () => ({ content: [] })
})

const trafficLogs = computed(() => trafficData.value?.content || [])

const formatTime = (date) => {
    if (!date) return '--:--:--'
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

const getStatusClass = (isBlocked) => {
    return isBlocked ? 'bg-red-500' : 'bg-green-500'
}

const getCategoryClass = (category) => {
    switch(category) {
        case 'RESEARCH': return 'bg-green-50 text-green-700'
        case 'ADULT_CONTENT': return 'bg-red-50 text-red-700'
        case 'SOCIAL_MEDIA': return 'bg-amber-50 text-amber-700'
        case 'GAMING': return 'bg-purple-50 text-purple-700'
        default: return 'bg-gray-50 text-gray-700'
    }
}

const blockDomain = async (domain) => {
  if (!confirm(`Are you sure you want to block ${domain}?`)) return
  
  try {
    const { data, error } = await useFetch(`${apiBase}/traffic/block`, {
      method: 'POST',
      params: { domain: domain, reason: 'Blocked from monitor' }
    })
    
    if (error.value) throw error.value
    
    alert(`Successfully blocked ${domain}`)
    refreshTraffic()
  } catch (err) {
    console.error('Failed to block domain:', err)
    alert('Failed to block domain. Check console for details.')
  }
}

const { data: eventsData, refresh: refreshEvents } = await useFetch(`${apiBase}/traffic/events/recent`, {
  default: () => []
})

const liveEvents = computed(() => eventsData.value || [])

// Refresh every 5 seconds for events
onMounted(() => {
  const trafficInterval = setInterval(refreshTraffic, 10000)
  const eventsInterval = setInterval(refreshEvents, 5000)
  onUnmounted(() => {
    clearInterval(trafficInterval)
    clearInterval(eventsInterval)
  })
})
</script>
