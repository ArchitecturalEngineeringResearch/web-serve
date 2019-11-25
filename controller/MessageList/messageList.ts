import * as Express from 'express'
import { Request, Response } from 'express'
import { validationResult, checkSchema, Result,ValidationError }  from 'express-validator' 
import { createMassage } from './validator'
import { PRECONDITION_FAILED_412 } from '../../util/httpStatus'
import { messageListModel } from '../../models/MessageList/messageList'

const router = Express.Router()

router.get('/', (req, res) => {
  
})

router.post(
  '/createMessage', 
  checkSchema(createMassage),
  (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    // 验证
    if (!errors.isEmpty()) {
      return res.status(PRECONDITION_FAILED_412).json({ errors: errors.array() });
    }

    messageListModel.createOne(req.body, (err, value)=> {
      console.log(value)
      res.send(value)
    })
  }
)

router.delete('/', (req, res) => {

})

export default router