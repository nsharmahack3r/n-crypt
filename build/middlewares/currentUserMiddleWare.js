"use strict";
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
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user_model"));
const currentUser = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req === null || req === void 0 ? void 0 : req.headers.authorization;
    if (!token) {
        return next();
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        const user = yield user_model_1.default.findById(payload.id);
        if (user) {
            req.currentUser = user;
        }
    }
    catch (err) {
        console.error(err);
    }
    next();
});
exports.currentUser = currentUser;
