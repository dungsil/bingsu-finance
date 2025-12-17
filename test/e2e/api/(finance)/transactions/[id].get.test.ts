import { fetch, setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

await setup({})

describe('GET /api/transactions/:id', () => {
  it('returns 200', async () => {
    const res = await fetch('/api/transactions/1')
    expect(res.status).toBe(200)
  })
})
