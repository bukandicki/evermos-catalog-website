// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxt/fonts'],
  css: ["~/assets/scss/preflight.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})
