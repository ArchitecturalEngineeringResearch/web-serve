import { IMessageList } from '../../types'
import { ParamSchema }  from 'express-validator'
import { number } from '../../util/regExps'

export const createMessage: Record<keyof IMessageList.ICreateMessage, ParamSchema> = {
  title: {
    exists:{
      errorMessage: '必须是存在',
    },
    isString: {
      errorMessage: '必须是 String',
    },
    isLength: {
      options: {
        max: 20,
        min: 5
      }
    }
  },
  description: {
    exists:{
      errorMessage: '必须是存在',
    },
    isString: {
      errorMessage: '必须是 String',
    },
    isLength: {
      options: {
        max: 150,
        min: 5
      },
      errorMessage: '必须是 5 - 150',
    }
  },
  phoneNumber: {
    exists:{
      errorMessage: '必须是存在',
    },
    isInt: {
      errorMessage: '必须是 Int',
    },
    custom: {
      options: (value) => number.china_phone.test(value),
      errorMessage: '手机号码无法通过验证',
    }
  },
  endDate: {
    exists:{
      errorMessage: '必须是存在',
    },
    isString: {
      errorMessage: '必须是 String',
    },
    isLength: {
      options: {
        max: 20,
      }
    }
  },
  type: {
    exists:{
      errorMessage: '必须是存在',
    },
  },
  openId: {
    exists:{
      errorMessage: '必须是存在',
    },
    isString: {
      errorMessage: '必须是 String',
    },
  },
  unionId: {
    exists:{
      errorMessage: '必须是存在',
    },
  },
  createDate: {
    exists:{
      errorMessage: '必须是存在',
    },
    isString: {
      errorMessage: '必须是 String',
    },
  },
  city: {},
  province: {},
  longitude: {},
  latitude: {},
  status: {},
  photos: {},
}

export default {
  createMessage
}
