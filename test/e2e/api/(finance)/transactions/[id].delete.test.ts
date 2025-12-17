import { fetch, setup } from '@nuxt/test-utils'
import { describe, expect, it } from 'vitest'

await setup({})

describe('DELETE /api/transactions/:id', () => {
  it('returns 200', async () => {
    const res = await fetch('/api/transactions/1', {
      method: 'DELETE',
    })
    expect(res.status).toBe(200)
  })
})
