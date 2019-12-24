import * as Express from 'express'
import * as bodyParser from 'body-parser'
import { Request, Response } from 'express'
import { validationResult, checkSchema, Result,ValidationError }  from 'express-validator'

import { wechatCredentialsSheck } from "../../components/WxCredentials";
import { loginValidator } from "./validator";
import { PRECONDITION_FAILED_412, SERVER_ERROR_500 } from '../../util/httpStatus';
import { userModel } from '../../models/User/user';
import { WXBizDataCrypt } from '../../components/WxCredentials'

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
    (error: any, response: any, body: any) => {
      const {session_key = '', openid = ''} = JSON.parse(body)
      // 获取并保存 openid 和 unionid

      if(session_key) {
        const pc = new WXBizDataCrypt(req.body, session_key)
        const infoData = pc.decryptData(req.body.encryptedData, req.body.iv)

        res.send({
          body: infoData
        })

        // 持久化
        // userModel.createOne({unionid, openid}, (err: any) => res.send(response))
        return
      }

      res.status(SERVER_ERROR_500).send({
          errmsg: '没有获取到',
      });
    }
  )
})

export default router
