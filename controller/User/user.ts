import * as Express from 'express'
import * as bodyParser from 'body-parser'
import { Request, Response } from 'express'
import { validationResult, checkSchema, Result,ValidationError }  from 'express-validator'

import { wechatCredentialsSheck, IReswechatCredentials, REQUEST_SUCCEED } from "../../components/WxCredentials";
import { loginValidator } from "./validator";
import { PRECONDITION_FAILED_412, SERVER_ERROR_500 } from '../../util/httpStatus';
import { userModel } from '../../models/User/user';

const router = Express.Router()
const jsonParser = bodyParser.json()

router.post(
  '/onLogin',
  jsonParser,
  checkSchema(loginValidator),
  (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);

  // 验证
  if (!errors.isEmpty()) {
    return res.status(PRECONDITION_FAILED_412).json({ errors: errors.array() });
  }

  // 去微信接口验证证书
  wechatCredentialsSheck(
    req.body,
    (data: IReswechatCredentials) => {
      if(!data) {
        res.status(SERVER_ERROR_500).send({
          errcode: '错误',
        });
        return
      }

      // 获取并保存 openid 和 unionid
      if(data.errcode === REQUEST_SUCCEED) {
        const { unionid, openid } = data
        // 持久化
        userModel.createOne({unionid, openid}, (err: any) => res.send(data))
        return
      }

      res.status(SERVER_ERROR_500).send({
          errcode: data.errcode,
          errmsg: data.errmsg,
      });
    }
  )
})

export default router
