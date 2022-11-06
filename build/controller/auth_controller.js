"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class AuthController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: "Bad Request" });
            }
            const user = yield user_model_1.default.findOne({ email: email });
            if (user) {
                const validPassword = yield bcrypt_1.default.compare(password, user.password);
                if (validPassword) {
                    const userJwt = jsonwebtoken_1.default.sign(Object.assign({}, user.toJSON), process.env.TOKEN_SECRET);
                    res.cookie('jwt', userJwt, {
                        maxAge: 9000000000,
                        httpOnly: false,
                        secure: false,
                    });
                    return res.json({ jwt: userJwt, user });
                }
                else {
                    return res.status(401).json({ error: "Password incorrect" });
                }
            }
            else {
                return res.status(404).json({ error: "User not found" });
            }
        });
    }
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: "Bad Request" });
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const user = new user_model_1.default({
                email,
                password: hashedPassword
            });
            user.save();
            const userJwt = jsonwebtoken_1.default.sign(Object.assign({}, user.toJSON), process.env.TOKEN_SECRET);
            res.cookie('jwt', userJwt, {
                maxAge: 9000000000,
                httpOnly: false,
                secure: false,
            });
            return res.json({ jwt: userJwt, user });
        });
    }
}
exports.default = AuthController;
