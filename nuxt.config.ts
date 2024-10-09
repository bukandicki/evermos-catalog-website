// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxt/fonts'],

  runtimeConfig: {
    public: {
      baseApi: process.env.NUXT_BASE_API_URL
    }
  },

  css: ["~/assets/scss/preflight.scss"],

  fonts: {
    defaults: { style: ["normal"] },
    families: [
      {
        name: "Archivo",
        src: "/fonts/Archivo-Light.woff2",
        global: true,
        weight: 300
      },
      {
        name: "Archivo",
        src: "/fonts/Archivo-Regular.woff2",
        global: true,
        weight: 400
      },
      {
        name: "Archivo",
        src: "/fonts/Archivo-Medium.woff2",
        global: true,
        weight: 500
      },
      {
        name: "Clash Display",
        src: "/fonts/ClashDisplay-Medium.woff2",
        global: true,
        weight: 500
      },
    ]
  },

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
