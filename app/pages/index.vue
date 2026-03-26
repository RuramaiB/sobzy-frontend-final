<template>
  <div class="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg rotate-3">
            <span class="text-white font-bold text-xl">H</span>
          </div>
          <span class="text-2xl font-black tracking-tighter">HIT-IWACS</span>
        </div>
        
        <div class="hidden md:flex items-center space-x-10 text-sm font-bold uppercase tracking-widest text-gray-400">
          <a href="#features" class="hover:text-gray-900 transition-colors">Intelligence</a>
          <a href="#security" class="hover:text-gray-900 transition-colors">Security</a>
          <a href="#network" class="hover:text-gray-900 transition-colors">Enterprise</a>
        </div>

        <div class="flex items-center space-x-4">
          <NuxtLink to="/login" class="text-sm font-bold uppercase tracking-widest hover:text-gray-500 transition-colors pr-4 border-r border-gray-100">Connect</NuxtLink>
          <NuxtLink to="/dashboard" class="premium-button !py-2.5">Launch Dashboard</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative pt-40 pb-20 overflow-hidden">
      <!-- Background Accents -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div class="absolute top-20 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div class="inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 animate-smooth-pulse">
          <span>AI-Powered Network Orchestration</span>
        </div>
        
        <h1 class="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10">
          Intelligent Web <br>
          <span class="text-gray-300">Access Control.</span>
        </h1>
        
        <p class="max-w-2xl mx-auto text-xl text-gray-500 font-medium mb-12">
          Harnessing Random Forest classification to secure the Harare Institute of Technology network. Real-time enforcement, zero-trust architecture, and absolute visibility.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <NuxtLink to="/dashboard" class="premium-button !px-10 !py-5 text-lg"> Get Started for Free </NuxtLink>
          <button class="px-10 py-5 bg-white border border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-all">
            View Technical Specs
          </button>
        </div>

        <!-- Dashboard Mockup -->
        <div class="mt-24 relative max-w-5xl mx-auto">
          <div class="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden aspect-[16/9]">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" class="w-full h-full object-cover opacity-10 grayscale" alt="Dashboard Preview">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center w-full px-12">
                <div class="w-full h-4 bg-gray-100 rounded-full mb-4 overflow-hidden">
                  <div class="bg-gray-900 h-full w-[60%] animate-[slide_3s_infinite]"></div>
                </div>
                <div class="grid grid-cols-3 gap-8">
                  <div class="h-24 bg-gray-50 rounded-xl border border-gray-100 border-dashed"></div>
                  <div class="h-24 bg-gray-50 rounded-xl border border-gray-100 border-dashed"></div>
                  <div class="h-24 bg-gray-50 rounded-xl border border-gray-100 border-dashed"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Features Grid -->
    <section id="features" class="py-24 bg-gray-50/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="space-y-4">
            <div class="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-black tracking-tight">Real-time Enforcement</h3>
            <p class="text-gray-500 font-medium">Intercept and classify traffic mid-stream using mitmproxy integration. Decisions in milliseconds.</p>
          </div>
          <div class="space-y-4">
            <div class="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-2xl font-black tracking-tight">Adaptive Learning</h3>
            <p class="text-gray-500 font-medium">Random Forest models that learn from network metadata, identifying complex threats and unauthorized content.</p>
          </div>
          <div class="space-y-4">
            <div class="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 class="text-2xl font-black tracking-tight">Crystal Visibility</h3>
            <p class="text-gray-500 font-medium">Beautiful data visualization for bandwidth usage, session monitoring, and policy effectiveness.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">H</span>
          </div>
          <span class="text-xl font-bold tracking-tight">HIT-IWACS</span>
        </div>
        <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">© 2026 HARARE INSTITUTE OF TECHNOLOGY</p>
        <div class="flex space-x-6 text-sm font-bold uppercase tracking-widest text-gray-500">
          <a href="#" class="hover:text-gray-900">Privacy</a>
          <a href="#" class="hover:text-gray-900">Legal</a>
          <NuxtLink to="/admin-login" class="hover:text-gray-900 font-black">Admin Portal</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes slide {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(50%); }
  100% { transform: translateX(200%); }
}
</style>
