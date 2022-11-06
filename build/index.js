"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const index_1 = __importDefault(require("./routes/index"));
const port = process.env.PORT;
const dbUri = `${process.env.DB_URI}`;
const app = (0, express_1.default)();
/** Parse the request */
app.use(express_1.default.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express_1.default.json());
/** RULES OF OUR API */
app.use((req, res, next) => {
    // set the CORS policy
    res.header("Access-Control-Allow-Origin", "*");
    // set the CORS headers
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");
    // set the CORS method headers
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return res.status(200).json({});
    }
    console.log('=>', req.method, req.url, req.hostname);
    next();
});
app.use("/", index_1.default);
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
mongoose_1.default.connect(dbUri)
    .then(() => {
    console.log("Connected to MongoDB", dbUri);
})
    .catch((err) => {
    console.log(err);
});
// Mobile platform no support gun.js
// 1. GUN.onMessage => Socket callback => Mobile device + Server Load. + App should be up and running on mobile
// 2. GUN.onMessage => FCM( Firebase Cloud Messaging ) => Mobile platform. Get Message when app is shut. Reduce push load on server.
