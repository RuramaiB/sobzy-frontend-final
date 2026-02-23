<template>
  <NuxtLayout name="dashboard">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">System Settings</h2>
        <p class="text-gray-500 mt-1">Configure network policies, AI models, and infrastructure</p>
      </div>
      <div class="flex items-center space-x-3">
        <button class="premium-button">Save All Changes</button>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
       <div class="lg:col-span-2 space-y-10">
          <!-- AI & Classifier -->
          <section class="glass-card p-8">
             <div class="flex items-center space-x-4 mb-8">
                <div class="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white">
                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                   </svg>
                </div>
                <div>
                   <h3 class="text-xl font-black">AI Orchestration</h3>
                   <p class="text-gray-500 text-sm italic font-medium">Random Forest Inference Engine</p>
                </div>
             </div>

             <div class="space-y-8">
                <div class="flex items-center justify-between bg-gray-50 p-6 rounded-2xl border border-gray-100">
                   <div>
                      <p class="font-bold">Real-time Interference Mode</p>
                      <p class="text-xs text-gray-500">Allow AI to block connections automatically in mitmproxy</p>
                   </div>
                   <input type="checkbox" checked class="w-5 h-5 accent-gray-900">
                </div>
                
                <div class="space-y-4">
                   <div class="flex justify-between items-center italic">
                      <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">Classification Sensitivity</p>
                      <span class="text-sm font-black text-gray-900">85% Confidence</span>
                   </div>
                   <input type="range" class="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900">
                   <p class="text-[10px] text-gray-400 font-medium">Higher sensitivity may increase false positives for academic research sites.</p>
                </div>
             </div>
          </section>

          <!-- Network Policy -->
          <section class="glass-card p-8">
             <h3 class="text-xl font-black mb-8">Blocking Policies</h3>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="policy in policies" :key="policy.name" class="p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-between hover:border-gray-900 transition-all cursor-pointer">
                   <div class="flex items-center space-x-3">
                      <div :class="policy.active ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'" class="w-10 h-10 rounded-xl flex items-center justify-center">
                         <span class="text-[10px] font-black uppercase tracking-tight">{{ policy.icon }}</span>
                      </div>
                      <span class="text-sm font-bold">{{ policy.name }}</span>
                   </div>
                   <div class="w-2 h-2 rounded-full" :class="policy.active ? 'bg-green-500' : 'bg-gray-300'"></div>
                </div>
             </div>
          </section>
       </div>

       <!-- Sidebar Settings -->
       <div class="space-y-8">
          <div class="glass-card p-8 bg-gray-900 text-white relative overflow-hidden">
             <div class="relative z-10">
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Backend Status</h4>
                <div class="space-y-6">
                   <div class="flex items-center space-x-4">
                      <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span class="text-sm font-medium">Spring Boot: v1.0.4-LTS</span>
                   </div>
                   <div class="flex items-center space-x-4">
                      <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span class="text-sm font-medium">Python Bridge: Running</span>
                   </div>
                   <button class="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Restart Services</button>
                </div>
             </div>
          </div>

          <div class="glass-card p-8">
             <h4 class="text-xs font-extrabold text-gray-400 uppercase tracking-[0.2em] mb-6">Backup & Restore</h4>
             <p class="text-sm text-gray-500 mb-6 font-medium italic">Last backup: Today at 04:12 AM</p>
             <button class="w-full py-3 bg-gray-50 border border-gray-200 text-gray-900 text-xs font-bold rounded-xl uppercase tracking-widest hover:bg-gray-100 transition-all">Download Logs</button>
          </div>
       </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false
})

const policies = [
    { name: "Adult Content", active: true, icon: "XXX" },
    { name: "Social Media", active: true, icon: "SCM" },
    { name: "Gaming Sites", active: false, icon: "GAM" },
    { name: "Streaming Ads", active: true, icon: "ADS" },
    { name: "Unsecure HTTP", active: false, icon: "WEB" },
    { name: "Large Media", active: false, icon: "MOV" },
]
</script>
