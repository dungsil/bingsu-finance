import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { now, nowAfter } from '../../shared/datetime'
import { nowAfterMinutes } from '../../shared/datetime'

describe('datetime helpers', () => {
  const initialDate = new Date('2024-01-01T00:00:00.000Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(initialDate)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('now', () => {
    it('현재 시간을 ISO 문자열로 반환한다', () => {
      const result = now()

      expect(result).toBe(initialDate.toISOString())
      expect(Date.parse(result)).not.toBeNaN()
    })

    it('시스템 시간이 변경되면 그 값을 반영한다', () => {
      const first = now()

      const updatedDate = new Date('2024-01-01T00:05:00.000Z')
      vi.setSystemTime(updatedDate)
      const second = now()

      expect(first).toBe(initialDate.toISOString())
      expect(second).toBe(updatedDate.toISOString())
    })
  })

  describe('nowAfter', () => {
    it('지정된 duration 이후 시간을 ISO 문자열로 반환한다', () => {
      const result = nowAfter({ minutes: 15 })
      const expected = new Date(initialDate.getTime() + 15 * 60 * 1000).toISOString()

      expect(result).toBe(expected)
      expect(Date.parse(result)).not.toBeNaN()
    })
  })

  describe('nowAfterMinutes', () => {
    it('입력된 분 만큼 이후 시간을 ISO 문자열로 반환한다', () => {
      const result = nowAfterMinutes(30)
      const expected = new Date(initialDate.getTime() + 30 * 60 * 1000).toISOString()

      expect(result).toBe(expected)
      expect(Date.parse(result)).not.toBeNaN()
    })
  })
})
