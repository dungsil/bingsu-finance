/** 인증 방식 */
export const AUTHENTICATION_METHODS = ['password'] as const

export type AuthenticationMethod = typeof AUTHENTICATION_METHODS[number]
