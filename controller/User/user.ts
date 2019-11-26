import * as Express from "express";

const router = Express.Router()

router.post('/', (req, res) => {

})

router.get('/', (req, res) => {
  res.send('node user Data')
})

export default router
