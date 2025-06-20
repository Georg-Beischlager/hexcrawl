// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: 3001,
  },
  experimental: {
    componentIslands: true,
  },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', 'vue3-pixi-nuxt', 'nuxt-lodash', '@nuxt/icon'],
  css: ['~/assets/main.css'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
    },
  },
  icon: {
    mode: 'css',
    cssLayer: 'base',
  },
})