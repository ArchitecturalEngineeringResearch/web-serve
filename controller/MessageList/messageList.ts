import * as Express from 'express'
import { Request, Response } from 'express'
import { validationResult, checkSchema, Result,ValidationError }  from 'express-validator' 
import { createMassage } from './validator'

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
      return res.status(422).json({ errors: errors.array() });
    }
    
    res.send(req.body)
  }
)

router.delete('/', (req, res) => {

})

export default router