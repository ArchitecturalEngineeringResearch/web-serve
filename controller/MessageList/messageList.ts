import * as Express from 'express'
import { validationResult, checkSchema }  from 'express-validator' 
import { createMassage } from './validator'

const router = Express.Router()

router.get('/', (req, res) => {
  
})

router.post('/createMessage', checkSchema({}) ,(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  res.send(req.body)
})

router.delete('/', (req, res) => {

})

export default router