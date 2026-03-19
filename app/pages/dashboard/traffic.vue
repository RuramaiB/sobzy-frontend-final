<template>
  <NuxtLayout name="dashboard">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Traffic Monitor</h2>
        <p class="text-gray-500 mt-1">Real-time network inspection and AI classification</p>
      </div>
      <div class="flex items-center space-x-6">
      <div class="flex-1 flex items-center space-x-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm min-w-[300px]">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search by URL, IP or User..." 
          class="bg-transparent border-none focus:ring-0 text-sm font-medium w-full"
        />
      </div>
      <div class="flex items-center space-x-3 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
        <span class="text-[10px] font-black text-gray-400 uppercase">Device:</span>
        <select v-model="selectedDevice" class="bg-transparent border-none focus:ring-0 text-xs font-bold text-gray-900 pr-8">
            <option value="">All Devices</option>
            <option v-for="d in devices" :key="d.id" :value="d.macAddress">{{ d.deviceName }} ({{ d.ipAddress }})</option>
        </select>
      </div>
    </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Main Traffic Table -->
      <div class="lg:col-span-3 glass-card overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex items-center justify-between bg-white bg-opacity-50">
          <div class="flex items-center space-x-4">
             <!-- Removed old filter inputs -->
          </div>
          <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {{ filteredLogs.length }} Live Connections</div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                <th class="px-6 py-4">State</th>
                <th class="px-6 py-4">AI Category</th>
                <th class="px-6 py-4">Device / User</th>
                <th class="px-6 py-4">Confidence</th>
                <th class="px-6 py-4 text-right">Activity</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
              <tbody class="divide-y divide-gray-100 italic font-mono text-xs">
                <tr v-for="log in filteredLogs" :key="log.id" class="hover:bg-gray-50 transition-colors" :class="log.isBlocked ? 'bg-red-50/30' : ''">
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <div :class="log.isBlocked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'" class="w-8 h-8 rounded-lg flex items-center justify-center">
                      <svg v-if="log.isBlocked" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                      </svg>
                    </div>
                    <div class="min-w-0">
                      <p class="text-xs font-black text-gray-900 truncate uppercase mt-0.5 tracking-tighter">{{ log.domain }}</p>
                      <p class="text-[10px] text-gray-500 truncate italic font-mono">{{ log.url }}</p>
                      <span v-if="log.isBlocked" class="text-[8px] font-black text-red-600 uppercase tracking-widest mt-1 block">Blocked Attempt</span>
                    </div>
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
                <td class="px-6 py-4 text-right flex items-center justify-end space-x-2">
                  <button 
                    v-if="!log.isBlocked"
                    @click="blockDomain(log.domain)" 
                    class="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded hover:bg-red-600 hover:text-white transition-all border border-red-100"
                  >
                    Block
                  </button>
                  <button 
                    v-else
                    @click="reportIncorrect(log)" 
                    class="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded hover:bg-blue-600 hover:text-white transition-all border border-blue-100"
                  >
                    Report Incorrect
                  </button>
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
  layout: 'dashboard'
})

const apiBase = 'http://localhost:1998/api/v1'
const searchQuery = ref('')
const selectedDevice = ref('')

const { data: logsData, refresh: refreshTraffic } = await useFetch(`${apiBase}/traffic/logs`, {
    params: { limit: 100 }
})
const { data: devicesData } = await useFetch(`${apiBase}/devices/active`)

const logs = computed(() => logsData.value?.content || [])
const devices = computed(() => devicesData.value || [])

// Filter by searchQuery and selectedDevice
const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    const matchesSearch = !searchQuery.value || 
      log.url.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.domain.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (log.username && log.username.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (log.ipAddress && log.ipAddress.includes(searchQuery.value))
      
    const matchesDevice = !selectedDevice.value || log.macAddress === selectedDevice.value
    
    return matchesSearch && matchesDevice
  })
})

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
        case 'SECURITY_EVASION': return 'bg-black text-white'
        default: return 'bg-gray-50 text-gray-700'
    }
}

const reportIncorrect = async (logEntry) => {
  if (!confirm(`Report incorrect classification for ${logEntry.url}? This will be used to retrain the AI.`)) return
  
  try {
    const { data, error } = await useFetch(`${apiBase}/traffic/report-incorrect`, {
      method: 'POST',
      body: { 
        logId: logEntry.id, 
        correctCategory: 'BENIGN',
        userId: 'admin'
      }
    })
    
    if (error.value) throw error.value
    
    alert(`Feedback submitted for ${logEntry.domain}. The model will be adjusted.`)
    refreshTraffic()
  } catch (err) {
    console.error('Failed to submit feedback:', err)
    alert('Failed to submit feedback.')
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
