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

import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
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
          include: ['test/e2e/**/*.{test,spec}.ts'],
        },
      }),
    ],
  },
})
