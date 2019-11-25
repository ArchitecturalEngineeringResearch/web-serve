import * as Express from "express";
import * as bodyParser from 'body-parser'
import { connect } from 'mongoose'

import {user, messageList} from './controller'
import { NOT_FOUND_404 } from "./util/httpStatus";
import { MongoClientURL, MongoClientDBName, portNumber } from "./config";

const app = Express()

function connectMongodb(): Promise<typeof import("mongoose")> {
  return connect(
    MongoClientURL,
    { 
      dbName: MongoClientDBName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  
}

async function startAPP() {
  await connectMongodb().then(() => {
    console.log(`
      Mongodb Access Successful:
        DBname: ${MongoClientDBName}
        Address: ${MongoClientURL}`)
      runServer()
  }).catch((error)=> {
    console.error(error)
  })
}

function runServer () {
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use('/user',user)
  app.use('/messageList',messageList)

  app.use('*', (req, res) => {
    res.status(NOT_FOUND_404);
    res.send(NOT_FOUND_404);
  });

  app.listen(portNumber);
  console.log(`
    Server listening to port ${portNumber}
  `);
}

startAPP()