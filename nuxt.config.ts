import { APP_ID } from './shared/constants'

// https://nuxt.com/docs/4.x/api/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  compatibilityDate: '2025-10-01',
  modules: ['@nuxt/test-utils/module', 'reka-ui/nuxt'],

  app: {
    rootAttrs: {
      id: APP_ID,
    },
  },

  imports: {
    dirs: ['#shared/**'],
  },

  reka: {
    prefix: 'Reka',
  },
})
