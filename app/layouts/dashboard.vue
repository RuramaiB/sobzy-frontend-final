<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col fixed md:relative h-full z-40">
      <div class="flex items-center space-x-3 mb-10">
        <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-lg">H</span>
        </div>
        <h1 class="text-xl font-bold tracking-tight">HIT-IWACS</h1>
      </div>
      
      <nav class="flex-1 space-y-2">
        <NuxtLink to="/dashboard" class="nav-link" active-class="active">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="font-medium">Overview</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/traffic" class="nav-link" active-class="active">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span class="font-medium">Traffic Monitor</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/ai-intelligence" class="nav-link" active-class="active">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span class="font-medium">AI Intelligence</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/hotspot" class="nav-link" active-class="active">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 21.213 0" />
          </svg>
          <span class="font-medium">Hotspot</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/devices" class="nav-link" active-class="active">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span class="font-medium">Devices</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/blocked-sites" class="nav-link" active-class="active">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <span class="font-medium">Blocked Sites</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/settings" class="nav-link" active-class="active">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="font-medium">Settings</span>
        </NuxtLink>
      </nav>

      <div class="mt-auto pt-6 border-t border-gray-100 flex flex-col space-y-4">
         <button @click="logout" class="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="font-medium">Logout</span>
        </button>
        <div class="flex items-center space-x-3 px-2 pt-4 border-t border-gray-100">
          <div class="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold uppercase shadow-lg ring-2 ring-gray-100">{{ userInitials }}</div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-gray-900 truncate">{{ user?.fullName || 'User' }}</p>
            <p class="text-[10px] text-gray-400 truncate mb-0.5">{{ user?.email }}</p>
            <p class="text-[8px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 inline-block font-black uppercase tracking-widest">{{ user?.role?.toLowerCase() || 'Member' }}</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-8 lg:p-12 md:pl-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { user, logout: handleLogout } = useAuth()

const userInitials = computed(() => {
  if (!user.value?.fullName) return 'U'
  return user.value.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const logout = () => {
  handleLogout()
}
</script>

<style scoped>
.nav-link {
  @apply w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all;
}
.nav-link.active {
  @apply bg-gray-900 text-white shadow-md;
}
</style>

