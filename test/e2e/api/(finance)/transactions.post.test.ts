import { fetch, setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

await setup({})

describe('POST /api/transactions', () => {
  it('returns 200', async () => {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(200)
  })
})
