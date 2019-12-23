import { ParamSchema }  from 'express-validator'
import { IwechatCredentials } from '../../types/IUser'

export const loginValidator : Record<keyof IwechatCredentials, ParamSchema> = {
  appid: {
    exists:{
      errorMessage: '必须是存在',
    },
    isString: {
      errorMessage: '必须是 String',
    },
  },
  secret: {
    exists:{
      errorMessage: '必须是存在',
    },
    isString: {
      errorMessage: '必须是 String',
    },
  },
  jsCode: {
    exists:{
      errorMessage: '必须是存在',
    },
    isString: {
      errorMessage: '必须是 String',
    },
  },
}

const validator = {
  loginValidator
}

export default validator
