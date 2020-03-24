import * as Express from 'express'
import { Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import { validationResult, checkSchema, Result,ValidationError }  from 'express-validator'
import { createMessage } from './validator'
import { PRECONDITION_FAILED_412 } from '../../util/httpStatus'
import { messageListModel } from '../../models/MessageList/messageList'

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

router.post(
  '/createMessage',
  jsonParser,
  checkSchema(createMessage),
  (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    const sensitiveWord = req.app.get('sensitiveWord');
    // 验证

    if (!errors.isEmpty()) {
      return res.status(PRECONDITION_FAILED_412).json({ errors: errors.array() });
    }

    //敏感同步过滤器
    const { title, description } = req.body
    if ( !(sensitiveWord.validator(title) && sensitiveWord.validator(description))) {
      console.log('出现敏感词汇', title, description)
      return res.status(PRECONDITION_FAILED_412).json({ errors: '请勿使用不和谐词汇'});
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
    messageListModel.remove(req.params.messageId, (err, value)=> {
      if(err) {
        res.send(err)
      }
      res.send(value)
    })
  }
)
export default router
