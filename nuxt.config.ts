import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import { APP_ID, DEFAULT_LOCALE_CODE } from './shared/constants'

const isDev = process.env.NODE_ENV !== 'production'

// https://nuxt.com/docs/4.x/api/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  compatibilityDate: '2025-10-01',
  modules: ['@nuxt/test-utils/module', 'nuxt-i18n-micro', 'reka-ui/nuxt'],

  app: {
    rootAttrs: {
      id: APP_ID,
    },
  },

  css: ['assets/styles/tailwind.css'],

  imports: {
    dirs: ['#shared/**'],
    imports: [
      { from: 'tailwind-variants', name: 'tv' },
      { from: 'tailwind-variants', name: 'VariantProps', type: true },
    ],
  },

  i18n: {
    meta: true,
    strategy: 'no_prefix',
    translationDir: 'locales/',

    autoDetectLanguage: true,
    disablePageLocales: true,
    defaultLocale: DEFAULT_LOCALE_CODE,
    fallbackLocale: DEFAULT_LOCALE_CODE,
    locales: [
      { code: 'ko-KR', iso: 'ko-KR', dir: 'ltr', displayName: '한국어' },
    ],
  },

  reka: {
    prefix: 'Reka',
  },

  vite: {
    plugins: [tailwindcss()],

    build: {
      sourcemap: isDev,
    },
  },
})
