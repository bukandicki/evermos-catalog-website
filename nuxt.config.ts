// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxt/fonts'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})