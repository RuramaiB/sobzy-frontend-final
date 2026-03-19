// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  future: {
    compatibilityVersion: 4,
  },
  css: ['assets/css/main.css'],
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
})
