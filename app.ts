import * as Express from "express";
import * as bodyParser from 'body-parser'

import {user, messageList} from './controller'
import { NOT_FOUND_404 } from "./util/httpStatus";
import { MongoClientURL } from "./config";

const app = Express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user',user)
app.use('/messageList',messageList)

app.use('*', (req, res) => {
  res.status(NOT_FOUND_404);
  res.send(NOT_FOUND_404);
});

app.listen(3000);
console.log('listening to port 3000');