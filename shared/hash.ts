import * as crypto from 'node:crypto'

/** SHA-256 해시 */
export async function sha256(value: string): Promise<string> {
  return crypto.createHash('sha256')
    .update(value, 'utf8')
    .digest('hex')
    .toUpperCase()
}
