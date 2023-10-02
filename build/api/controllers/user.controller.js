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
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const passport = __importStar(require("passport"));
const passport_local_1 = require("passport-local");
const error_1 = require("../utils/error");
const user_messges_1 = require("../../config/user-messges");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        // register user
        yield user_model_1.default.create(payload);
        return res.json({ success: true, message: user_messges_1.userRegisterSuccess });
    }
    catch (error) {
        if (error.code === 11000)
            return (0, error_1.checkDuplicate)(error, res, "User");
        return next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email } = req.body;
        email = email === null || email === void 0 ? void 0 : email.toLowerCase();
        passport.use(new passport_local_1.Strategy({ usernameField: "email" }, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email: username });
            switch (true) {
                case !user || !(user === null || user === void 0 ? void 0 : user.verifyPassword(password)):
                    return done({ success: false, message: user_messges_1.userLoginError }, false);
                default:
                    return done(null, user);
            }
        })));
        // call for passport authentication
        passport.authenticate("local", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: user_messges_1.userLoginAuthError,
                });
            }
            // registered user
            else if (user) {
                const accessToken = yield user.token();
                yield user_model_1.default.updateOne({ _id: user._id }, { $set: { accessToken } }, { upsert: true });
                return res.json({
                    success: true,
                    message: user_messges_1.userLoginSuccess,
                    accessToken,
                });
            }
            // unknown user or wrong password
            else {
                return res.status(400).send({ success: false, message: info.message });
            }
        }))(req, res);
    }
    catch (error) {
        return next(error);
    }
});
exports.login = login;
