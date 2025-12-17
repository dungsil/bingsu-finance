import { fetch, setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

await setup({})

describe('GET /api/accounts', () => {
  it('returns 200', async () => {
    const res = await fetch('/api/accounts')
    expect(res.status).toBe(200)
  })
})
