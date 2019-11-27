export interface IwechatCredentials {
  appid: string;
  secret: string;
  jsCode: string;
  authorization_code: string;
}

export interface IUserModel {
  openid: string,
  unionid: string,
}
