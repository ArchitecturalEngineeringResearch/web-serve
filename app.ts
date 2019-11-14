import * as Express from "express";
import {user, messageList} from './controller'

const app = Express()

app.use('/user',user)
app.use('/messageList',messageList)

app.listen(3000);
console.log('listening to port 3000');