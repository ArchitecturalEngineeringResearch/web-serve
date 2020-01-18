import * as Express from 'express'
import { Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import { validationResult, checkSchema, Result,ValidationError }  from 'express-validator'
import { createMessage } from './validator'
import { PRECONDITION_FAILED_412 } from '../../util/httpStatus'
import { messageListModel } from '../../models/MessageList/messageList'
import * as Qiniu from 'qiniu'

const router = Express.Router()
const jsonParser = bodyParser.json()

router.get(
  '/',
  (req: Request, res: Response) => {
    const { page = 1, size = 5, deviceType } = req.query

    messageListModel.findList({page, size, deviceType},(err, value) => {
      if(err) {
        console.log(err)
        return
      }
      res.send(value)
  })
})

router.get(
  '/history',
  (req: Request, res: Response) => {
    const { unionId = '' } = req.query


    if(!unionId) {
      return res.status(PRECONDITION_FAILED_412).json({ errors: 'unionId 不能为空' });
    }

    messageListModel.history(unionId,(err, value)=>{

      if(err) {
        res.send(err)
        return
      }
      console.log(value)
      res.send(value)
    })
})

router.post(
  '/createMessage',
  jsonParser,
  checkSchema(createMessage),
  (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    // 验证

    if (!errors.isEmpty()) {
      return res.status(PRECONDITION_FAILED_412).json({ errors: errors.array() });
    }

    messageListModel.createOne(req.body, (err, value)=> {
      console.log(err)
      if(err) {
        res.send(err)
        return
      }
      res.send(value)
    })
  }
)

router.delete(
  '/:messageId',
  (req: Request, res: Response) => {
    messageListModel.remove(req.params.messageId, (err)=> {
      if(err) {
        res.send(err)
      }
      res.send('')
    })
  }
)

router.get(
  '/uploadToken',
  (req: Request, res: Response) => {
    const { accessKey = '' , secretKey = '', scope = ''} = req.query


    if(!(accessKey != '' && secretKey != '' && scope != '')) {
      return res.status(PRECONDITION_FAILED_412).json({ errors: 'secretKey && accessKey && scope 不能为空' });
    }

    // 定义鉴权对象
    const mac = new Qiniu.auth.digest.Mac(accessKey, secretKey)
    const putPolicy = new Qiniu.rs.PutPolicy({scope})
    res.send(putPolicy.uploadToken(mac))
})

export default router
