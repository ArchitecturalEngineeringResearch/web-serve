export interface IwechatCredentials {
  appid: string;
  secret: string;
  jsCode: string;
  encryptedData: string;
  iv: string;
}

export interface IUserModel {
  userName: string,
  openid: string,
  unionid: string,
  equipments: [string]
}
