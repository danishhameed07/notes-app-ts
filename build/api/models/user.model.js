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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt = __importStar(require("bcryptjs"));
const moment = require("moment-timezone");
const jwt = __importStar(require("jwt-simple"));
const var_1 = require("../../config/var");
const { jwtExpirationInterval, passwordEncryptionKey } = var_1.config;
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String },
}, { timestamps: true });
UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.token = function () {
    const payload = {
        exp: moment().add(jwtExpirationInterval, "minutes").unix(),
        iat: moment().unix(),
        sub: this._id,
    };
    return jwt.encode(payload, passwordEncryptionKey ? passwordEncryptionKey : "");
};
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!this.isModified("password"))
                return next();
            const rounds = passwordEncryptionKey ? Number(passwordEncryptionKey) : 10;
            const hash = yield bcrypt.hash(this.password, rounds);
            this.password = hash;
            return next();
        }
        catch (error) {
            return next(error);
        }
    });
});
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
