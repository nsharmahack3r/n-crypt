import mongoose from "mongoose";
import express, { Express, json, NextFunction, Request, Response } from "express";
import router from './routes/index';
import { privateEncrypt } from "crypto";
import Error from './middlewares/error';

const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });

const port = process.env.PORT;
const dbUri = `${process.env.DB_URI}`;
const app:Express = express();

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

/** using errorhandler */
app.use(Error.Errors);
/** RULES OF OUR API */
app.use((req, res, next) => {
  // set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  console.log('=>', req.method, req.url, req.hostname);
  next();
});
//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

app.use("/",router);
const server = app.listen(port,()=>{
    console.log(`Running on http://localhost:${port}`);
});
mongoose.connect(dbUri)
.then(() => {
    console.log("Connected to MongoDB", dbUri);
  })
  .catch((err) => {
    console.log(err);
  });

  //unhandled promise rejections
process.on("unhandledRejection", (err:string,) => {
  console.log(`Shutting down server for: ${err}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});


// Mobile platform no support gun.js
// 1. GUN.onMessage => Socket callback => Mobile device + Server Load. + App should be up and running on mobile
// 2. GUN.onMessage => FCM( Firebase Cloud Messaging ) => Mobile platform. Get Message when app is shut. Reduce push load on server.