/*
 * Copyright (c) 2025. Bingsu finance contributors (https://github.com/dungsil/bingsu-finance)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-FileCopyrightText: Bingsu finance contributors Bingsu finance Contributors (https://github.com/dungsil/bingsu-finance)
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

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

  css: ['assets/styles/tailwind.css'],

  imports: {
    dirs: ['#shared/**'],
    imports: [
      { from: 'tailwind-variants', name: 'tv' },
      { from: 'tailwind-variants', name: 'VariantProps', type: true },
    ],
  },

  reka: {
    prefix: 'Reka',
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
