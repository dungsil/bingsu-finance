import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { sha256 } from '../../shared/hash'

describe('shared', () => {
  describe('hash', () => {
    describe('sha256', () => {
      it('문자열을 SHA-256으로 해시해 64자리 16진수 문자열을 반환한다', async () => {
        const result = await sha256('abc')

        expect(result).toBe('BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD')
        expect(result).toHaveLength(64)
        expect(result).toMatch(/^[A-F0-9]{64}$/)
      })

      it('동일한 입력은 동일한 해시를 반환한다', async () => {
        const first = await sha256('Bingsu123!')
        const second = await sha256('Bingsu123!')

        expect(first).toBe(second)
      })
    })
  })
})
