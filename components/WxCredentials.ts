import * as Request from 'request'
import { wechatCredentialsUrl } from '../config'
import { IwechatCredentials } from '../types/IUser'

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
export function wechatCredentialsSheck(options: IwechatCredentials, call: (res:IReswechatCredentials) => void) {
  const {appid, secret, jsCode, authorization_code} = options
  const params = `?appid=${appid}&secret=${secret}&js_code=${jsCode}&grant_type=${authorization_code}`
  
  Request.get(wechatCredentialsUrl + params, call)  
}