import type { DateTimeDuration } from '@internationalized/date'
import { now as _now } from '@internationalized/date'

// 코드 내 하위 호환성을 유지하기 위해 타입 값을 따로 빼서 관리
export type Duration = DateTimeDuration

/**
 * 현재 시간을 UTC 기준 ISO 8601 문자열 형식('2019-01-25T02:00:00.000Z')으로 반환한다.
 *
 * 이 값은 내부 데이터 저장이나 핸들링 시 사용되는 값이므로 UI에 표시될 때는 format 해야한다.
 */
export function now(): string {
  return _now('UTC').toAbsoluteString()
}

/**
 * 현재 시간에 입력된 {@linkcode duration} 이후를 ISO 8601 문자열 형식('2019-01-25T02:00:00.000Z')으로 반환한다.
 *
 * 이 값은 내부 데이터 저장이나 핸들링 시 사용되는 값이므로 UI에 표시될 때는 format 해야한다.
 */
export function nowAfter(duration: Duration): string {
  return _now('UTC')
    .add(duration)
    .toAbsoluteString()
}

/**
 * 현재 시간의 {@linkcode minutes}분 이후를 ISO 8601 문자열 형식('2019-01-25T02:00:00.000Z')으로 반환한다.
 *
 * 이 값은 내부 데이터 저장이나 핸들링 시 사용되는 값이므로 UI에 표시될 때는 format 해야한다.
 */
export function nowAfterMinutes(minutes: number): string {
  return nowAfter({ minutes })
}
