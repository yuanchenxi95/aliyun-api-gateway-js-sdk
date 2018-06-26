import Base64 from 'crypto-js/enc-base64'
import MD5 from 'crypto-js/MD5'
import hmacSHA256 from 'crypto-js/hmac-sha256'

export function md5 (content: string): string {
  return Base64.stringify(MD5(content))
}

export function hmacsha256 (content: string, appSecret: string): string {
  return Base64.stringify(hmacSHA256(content, appSecret))
}
