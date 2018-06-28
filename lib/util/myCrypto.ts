import Base64 from 'crypto-js/enc-base64'
import md5 from 'crypto-js/md5'
import hmacSHA256 from 'crypto-js/hmac-sha256'


export function myMd5 (content: string): string {
  return Base64.stringify(md5(content))
}

export function myHmacsha256 (content: string, appSecret: string): string {
  return Base64.stringify(hmacSHA256(content, appSecret))
}
