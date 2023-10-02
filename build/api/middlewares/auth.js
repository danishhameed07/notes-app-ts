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
exports.authenticate = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const var_1 = require("../../config/var");
const user_messges_1 = require("../../config/user-messges");
const { bypassedRoutes } = var_1.config;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { headers, path = "" } = req;
    const segments = path.split("/");
    const route = segments.length ? segments[segments.length - 1] : "";
    if (bypassedRoutes === null || bypassedRoutes === void 0 ? void 0 : bypassedRoutes.includes(route))
        return next();
    else if (headers["authorization"]) {
        // check if the user access token is valid or not
        const accessToken = headers["authorization"].split(" ").pop();
        const user = yield user_model_1.default.findOne({ accessToken }, "_id");
        if (user) {
            req.query.userId = user._id;
            return next();
        }
    }
    return res.status(403).send({ success: false, message: user_messges_1.userAuthTokenError });
});
exports.authenticate = authenticate;
