<template>
  <NuxtLayout name="dashboard">
  <div class="ai-intelligence-container">
    <header class="mb-10">
      <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">AI Model Intelligence</h2>
      <p class="text-gray-500 mt-1">Status of the Java-based Random Forest classification engine</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="glass-card p-6">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Model Type</h3>
        <p class="text-2xl font-black text-gray-900 italic">Random Forest</p>
        <p class="text-[10px] text-gray-500 mt-2 font-mono uppercase tracking-tight">Engine: Smile (Java)</p>
      </div>
      <div class="glass-card p-6 border-l-4 border-black">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Classification Stats</h3>
        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <span class="text-xs text-gray-600 font-bold uppercase">Accuracy</span>
                <span class="text-sm font-black italic">94.2%</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-xs text-gray-600 font-bold uppercase">Feedback Loops</span>
                <span class="text-sm font-black italic">12 Pending</span>
            </div>
        </div>
      </div>
      <div class="glass-card p-6">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Training State</h3>
        <div class="flex items-center space-x-2">
            <span class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span class="text-sm font-bold text-gray-900 uppercase">Model Active</span>
        </div>
        <p class="text-[10px] text-gray-500 mt-2 italic">Last retrained: Today, 09:12 AM</p>
      </div>
    </div>

    <div class="glass-card overflow-hidden">
        <div class="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h3 class="text-xs font-bold text-gray-900 uppercase tracking-widest italic font-mono">Feedback Training Queue</h3>
            <button class="px-4 py-2 bg-black text-white text-[10px] font-bold rounded hover:bg-gray-800 transition-all uppercase italic">Retrain Model Now</button>
        </div>
        <div class="p-10 text-center">
            <div class="inline-block p-4 bg-gray-50 rounded-full mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <p class="text-gray-900 font-bold uppercase italic text-sm">Advanced Intelligence Active</p>
            <p class="text-xs text-gray-500 mt-2 max-w-sm mx-auto">The Java Random Forest engine is processing 100% of encrypted traffic via MITM interception. All decisions are local and low-latency.</p>
        </div>
    </div>
  </div>
</NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})
</script>
