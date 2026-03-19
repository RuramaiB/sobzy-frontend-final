<template>
  <NuxtLayout name="dashboard">
  <div>
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Blocked Sites</h2>
        <p class="text-gray-500 mt-1">Manage the network blacklist and restricted domains</p>
      </div>
      <div class="flex items-center space-x-3">
        <button @click="showAddModal = true" class="premium-button">Add Site</button>
      </div>
    </header>

    <div class="glass-card overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex items-center justify-between bg-white bg-opacity-50">
        <h4 class="font-bold text-gray-900 uppercase tracking-wider text-sm">Blacklisted Domains</h4>
        <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ blockedSites.length }} Active Restrictions</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Domain URL</th>
              <th class="px-6 py-4">Reason for Blocking</th>
              <th class="px-6 py-4">Added On</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 italic font-mono text-xs">
            <tr v-for="site in blockedSites" :key="site.id" class="hover:bg-gray-50 transition-colors bg-white">
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <span :class="site.active ? 'bg-red-500' : 'bg-gray-300'" class="w-2 h-2 rounded-full inline-block"></span>
                  <span class="text-[10px] font-bold uppercase tracking-tight">{{ site.active ? 'Active' : 'Disabled' }}</span>
                </div>
              </td>
              <td class="px-6 py-4 font-bold text-gray-900">{{ site.url }}</td>
              <td class="px-6 py-4 text-gray-500">{{ site.reason }}</td>
              <td class="px-6 py-4 text-gray-400">{{ formatDate(site.createdAt) }}</td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button @click="toggleStatus(site.id)" class="px-3 py-1 bg-white border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 font-bold transition-all">
                    {{ site.active ? 'Disable' : 'Enable' }}
                  </button>
                  <button @click="deleteSite(site.id)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="blockedSites.length === 0">
               <td colspan="5" class="px-6 py-12 text-center text-gray-400 italic">No blocked sites configured.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Site Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-6">
       <div class="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300">
          <h3 class="text-2xl font-black mb-2">Block New Site</h3>
          <p class="text-gray-500 mb-8 font-medium">Add a domain to the network's restricted list.</p>
          
          <div class="space-y-6">
             <div>
                <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Domain URL</label>
                <input v-model="newSite.url" type="text" placeholder="example.com" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all font-bold">
             </div>
             <div>
                <label class="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Reason</label>
                <textarea v-model="newSite.reason" placeholder="Security risk, unauthorized content..." class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all font-bold h-32"></textarea>
             </div>
          </div>

          <div class="mt-10 flex space-x-4">
             <button @click="showAddModal = false" class="flex-1 py-4 bg-gray-50 text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all">Cancel</button>
             <button @click="addSite" class="flex-1 premium-button">Confirm Block</button>
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
const showAddModal = ref(false)
const newSite = ref({ url: '', reason: '' })

const { data: sitesData, refresh: refreshSites } = await useFetch(`${apiBase}/blocked-sites`)
const blockedSites = computed(() => sitesData.value || [])

const addSite = async () => {
   if (!newSite.value.url) return
   await $fetch(`${apiBase}/blocked-sites`, {
      method: 'POST',
      body: newSite.value
   })
   newSite.value = { url: '', reason: '' }
   showAddModal.value = false
   refreshSites()
}

const deleteSite = async (id) => {
   await $fetch(`${apiBase}/blocked-sites/${id}`, { method: 'DELETE' })
   refreshSites()
}

const toggleStatus = async (id) => {
   await $fetch(`${apiBase}/blocked-sites/${id}/toggle`, { method: 'PATCH' })
   refreshSites()
}

const formatDate = (date) => {
   return new Date(date).toLocaleDateString()
}
</script>
