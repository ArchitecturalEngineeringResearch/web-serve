export interface IwechatCredentials {
  appid: string;
  secret: string;
  jsCode: string;
  encryptedData: string;
  iv: string;
}

export interface IUserModel {
  openid: string,
  unionid: string,
}
