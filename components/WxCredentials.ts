import * as Request from 'request'
import { wechatCredentialsUrl } from '../config'
import { IwechatCredentials } from '../types/IUser'
import * as Crypto from 'crypto'

/** 系统繁忙 */
export const SYSTEM_BUSY = -1
/** 请求成功 */
export const REQUEST_SUCCEED = 0
/** code 无效 */
export const CODE_FUTILITY = 40029
/** 频率限制 */
export const FREQUENCY_LIMITTATION = 45011

export interface IReswechatCredentials {
  openid: string;
  session_key: string;
  unionid: string;
  errcode: number;
  errmsg: string;
}

export const wechatCredentialsErrcode = [
  {code: SYSTEM_BUSY, description: '系统繁忙，此时请开发者稍候再试'},
  {code: REQUEST_SUCCEED, description: '请求成功'},
  {code: CODE_FUTILITY, description: 'code 无效'},
  {code: FREQUENCY_LIMITTATION, description: '频率限制，每个用户每分钟100次'},
]

/**
 * 微信凭证校验组件
*/
export function wechatCredentialsSheck(options: IwechatCredentials, call: (error: any, response: any, body: any) => void) {
  const {appid, secret, jsCode} = options
  const params = `?appid=${appid}&secret=${secret}&js_code=${jsCode}&grant_type=authorization_code`
  Request.get(wechatCredentialsUrl + params, call)
}

export function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId
  this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode
  let sessionKey = new Buffer(this.sessionKey, 'base64')
  encryptedData = new Buffer(encryptedData, 'base64')
  iv = new Buffer(iv, 'base64')
  let decoded: any = ''

  try {
     // 解密
    let decipher = Crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')

    decoded = JSON.parse(decoded)

  } catch (err) {
    throw new Error('Illegal Buffer')
  }


  return decoded
}
