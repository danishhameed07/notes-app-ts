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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.checkDuplicate = exports.notFound = exports.converter = void 0;
const httpStatus = __importStar(require("http-status"));
const expressValidation = __importStar(require("express-validation"));
const api_error_1 = __importDefault(require("./api-error"));
const var_1 = require("../../config/var");
const user_messges_1 = require("../../config/user-messges");
const { env } = var_1.config;
/**
 * error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res) => {
    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
        stack: err.stack,
    };
    if (env !== "development") {
        delete response.stack;
    }
    res.status(err.status);
    res.json(response);
};
exports.handler = handler;
/**
 * if error is not an instance of API error, convert it.
 * @public
 */
const converter = (err, req, res, next) => {
    let convertedError = err;
    if ((err instanceof expressValidation.ValidationError) || !(err instanceof api_error_1.default)) {
        convertedError = new api_error_1.default({
            message: err.message,
            status: err.status,
            stack: err.stack,
        });
    }
    return handler(convertedError, req, res);
};
exports.converter = converter;
/**
 * catch 404 and forward to error handler
 * @public
 */
const notFound = (req, res, next) => {
    const err = new api_error_1.default({
        message: user_messges_1.notFoundError,
        status: httpStatus.NOT_FOUND,
    });
    return handler(err, req, res);
};
exports.notFound = notFound;
/**
 * catch entry duplicate in db for unique fields
 * @public
 */
const checkDuplicate = (err, res, name = "") => {
    const { errmsg: errMsg } = err;
    let message = `${name} with same `;
    if (errMsg.includes("email_1"))
        message += "email already exists";
    return res.status(400).send({ success: false, message });
};
exports.checkDuplicate = checkDuplicate;
