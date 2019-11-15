import * as Express from "express";
import {user, messageList} from './controller'
import Mongoose from 'mongoose'
import * as bodyParser from 'body-parser'

const app = Express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user',user)
app.use('/messageList',messageList)

app.use('*', (req, res) => {
  res.status(404);
  res.send('404');
});

app.listen(3000);
console.log('listening to port 3000');