import GUN, { _GunRoot } from "gun";
import express, { Express, NextFunction, Request, Response } from "express";
import 'dotenv/config'

const port = process.env.PORT;
const app:Express = express();
const server = app.listen(port);

const db = GUN({file: 'data.json', web: server});
GUN.on("create", (gunHookCallback: _GunRoot)=>{
    console.log(gunHookCallback);
});
db.get('chat').on((data, id)=>{
    console.log(data);
});
const index = new Date().toISOString();
db.get('chat').get(index).put('Random message sent by the user.');