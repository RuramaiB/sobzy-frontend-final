<template>
  <NuxtLayout name="dashboard">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Network Intelligence</h2>
        <p class="text-gray-500 mt-1">Harare Institute of Technology Overview</p>
      </div>
      <div class="flex items-center space-x-3">
        <div class="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span>Hotspot Active</span>
        </div>
        <button class="premium-button">New Policy</button>
      </div>
    </header>

    <!-- Stats Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div class="glass-card p-6">
        <p class="text-sm font-medium text-gray-500">Total Bandwidth</p>
        <div class="flex items-end justify-between mt-2">
          <h3 class="text-2xl font-bold">{{ (stats.totalBandwidth / (1024 * 1024)).toFixed(2) }} MB</h3>
          <span class="text-green-600 text-xs font-bold">+12% vs last wk</span>
        </div>
        <div class="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <div class="bg-gray-900 h-full w-[65%]"></div>
        </div>
      </div>
      <div class="glass-card p-6">
        <p class="text-sm font-medium text-gray-500">Blocked Requests</p>
        <div class="flex items-end justify-between mt-2">
          <h3 class="text-2xl font-bold">{{ stats.blockedRequests }}</h3>
          <span class="text-red-600 text-xs font-bold">{{ stats.blockRate.toFixed(1) }}% Rate</span>
        </div>
        <div class="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <div class="bg-gray-400 h-full w-[40%]"></div>
        </div>
      </div>
      <div class="glass-card p-6">
        <p class="text-sm font-medium text-gray-500">Active Devices</p>
        <div class="flex items-end justify-between mt-2">
          <h3 class="text-2xl font-bold">{{ stats.activeDevices || 0 }}</h3>
          <span class="text-blue-600 text-xs font-bold">{{ stats.activeUsers || 0 }} Users</span>
        </div>
        <div class="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <div class="bg-blue-500 h-full w-[80%]"></div>
        </div>
      </div>
      <div class="glass-card p-6 text-white bg-gray-900 overflow-hidden relative">
        <div class="relative z-10">
          <p class="text-sm font-medium text-gray-400">AI Confidence</p>
          <div class="flex items-end justify-between mt-2">
            <h3 class="text-2xl font-bold">98.4%</h3>
            <span class="text-gray-400 text-xs">Random Forest</span>
          </div>
        </div>
        <div class="absolute -bottom-2 -right-2 opacity-20">
          <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 14.5l-3.5-3.5 1.41-1.41L11 11.67l4.59-4.59L17 8.5 11 14.5z"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Quick Analysis -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <!-- Top Domains -->
        <div class="glass-card p-6">
          <h4 class="font-bold text-gray-900 uppercase tracking-wider text-sm mb-6">Top Traffic Domains</h4>
          <div class="space-y-4">
            <div v-for="(count, domain) in stats.topDomains" :key="domain" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold uppercase">{{ domain.charAt(0) }}</div>
                <span class="text-sm font-semibold truncate max-w-[150px]">{{ domain }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <div class="w-32 bg-gray-100 h-1 rounded-full overflow-hidden">
                  <div class="bg-gray-900 h-full" :style="{ width: (count / stats.totalRequests * 100) + '%' }"></div>
                </div>
                <span class="text-xs font-bold text-gray-400">{{ count }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- System Health -->
        <div class="glass-card p-6 flex flex-col">
           <h4 class="font-bold text-gray-900 uppercase tracking-wider text-sm mb-6">Service Health Status</h4>
           <div class="flex-1 flex flex-col justify-center space-y-6">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-600">Spring Boot Backend</span>
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">Running</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-600">Python AI Bridge</span>
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">Active</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-600">mitmproxy Interceptor</span>
                <span class="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest">Warming up</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-600">Database Engine</span>
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">Syncing</span>
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

const apiBase = ref('http://localhost:1998/api/v1')

// Fetch statistics from backend
const { data: statsData, refresh: refreshStats } = await useFetch(() => `${apiBase.value}/traffic/statistics`, {
  default: () => ({
    totalRequests: 0,
    blockedRequests: 0,
    allowedRequests: 0,
    blockRate: 0,
    totalBandwidth: 0,
    activeDevices: 0,
    activeUsers: 0,
    topDomains: {}
  })
})

const stats = computed(() => statsData.value)

// Refresh stats every 30 seconds
onMounted(() => {
  apiBase.value = `http://${window.location.hostname}:1998/api/v1`
  const interval = setInterval(refreshStats, 30000)
  onUnmounted(() => clearInterval(interval))
})
</script>
