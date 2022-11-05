import express, { Express } from "express";
import AuthRouter from "./authRouter";
import { currentUser } from "../middlewares/currentUserMiddleWare";

const app:Express = express();
app.use(currentUser);
app.use('/auth',AuthRouter);

export default app;