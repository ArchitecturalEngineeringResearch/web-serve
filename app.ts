import * as Express from "express";
import * as bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'

import {user, messageList} from './controller'
import { NOT_FOUND_404 } from "./util/httpStatus";
import { MongoClientURL } from "./config";

const app = Express()

const client = new MongoClient(MongoClientURL, { useNewUrlParser: true });
client.connect(err => {
  console.log('mongodb ------ 连接成功')
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user',user)
app.use('/messageList',messageList)

app.use('*', (req, res) => {
  res.status(NOT_FOUND_404);
  res.send(NOT_FOUND_404);
});

app.listen(3000);
console.log('listening to port 3000');