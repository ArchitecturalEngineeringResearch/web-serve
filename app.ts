import * as Express from "express";
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import * as https from 'https'
import * as http from 'http'
import * as fs from 'fs'


import {user, messageList} from './controller'
import { NOT_FOUND_404 } from "./util/httpStatus";
import { MongoClientURL, MongoClientDBName, portNumber } from "./config";

const { connect } = mongoose
const app = Express()

function connectMongodb(): Promise<typeof import("mongoose")> {
  return connect(
    MongoClientURL,
    {
      dbName: MongoClientDBName,
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as any,
    ()=>{}
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

  const httpServer= http.createServer(app)
  const httpsServer  = https.createServer({
    key: fs.readFileSync('./sslcert/2_gck.guangzhaiziben.com.key', 'utf8'),
    cert: fs.readFileSync('./sslcert/1_gck.guangzhaiziben.com_bundle.crt', 'utf8'),
  },app)

  httpsServer.listen(443, () => {
    console.log('Server listening to port 443');
  });

  httpServer.listen(portNumber, () => {
    console.log(` Server listening to port ${portNumber}`);
  });

}

startAPP()
