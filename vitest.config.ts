import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    silent: true,

    coverage: {
      provider: 'v8',
      reportOnFailure: true,
      reporter: ['text', 'json-summary', 'json'],
      include: ['./app/**/*.{ts,vue}', './server/**/*.ts', './shared/**/*.ts'],
    },

    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['test/unit/**/*.{test,spec}.ts'],
        },
      },

      await defineVitestProject({
        test: {
          name: 'nuxt',
          environment: 'nuxt',
          include: ['test/nuxt/**/*.{test,spec}.ts'],
        },
      }),
    ],

    environmentOptions: {
      nuxt: {
        mock: {},
      },
    },
  },
})
