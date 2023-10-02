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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNoteParams = exports.validateNote = exports.validateUser = void 0;
const Joi = __importStar(require("joi"));
const JoiExtended = Joi;
JoiExtended.objectId = require("joi-objectid")(Joi);
// validate input for register and login user
const validateUser = ({ body }, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(128),
    });
    const { error } = schema.validate(body);
    if (error) {
        const { details: [{ message: errMsg }], } = error;
        const errPattern = /\"/gi;
        let message = errMsg.replace(errPattern, "");
        message = `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
        return res.status(400).send({ success: false, message });
    }
    return next();
};
exports.validateUser = validateUser;
// validate input for create and edit note
const validateNote = ({ body, originalUrl }, res, next) => {
    const validations = {
        title: Joi.string().required(),
    };
    // for edit note, check for note Id as well
    if (originalUrl.includes("edit")) {
        validations.noteId = JoiExtended.objectId().required();
    }
    const schema = Joi.object(validations);
    const { error } = schema.validate(body, {
        abortEarly: false,
        allowUnknown: true,
    });
    if (error) {
        const { details: [{ message: errMsg }], } = error;
        const errPattern = /\"/gi;
        let message = errMsg.replace(errPattern, "");
        message = `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
        return res.status(400).send({ success: false, message });
    }
    return next();
};
exports.validateNote = validateNote;
// validate params for get and delete note
const validateNoteParams = ({ params }, res, next) => {
    const schema = Joi.object({
        noteId: JoiExtended.objectId().required(), // note Id
    });
    const { error } = schema.validate(params);
    if (error) {
        const { details: [{ message: errMsg }], } = error;
        const errPattern = /\"/gi;
        let message = errMsg.replace(errPattern, "");
        message = `${message.charAt(0).toUpperCase()}${message.slice(1)}`;
        return res.status(400).send({ success: false, message });
    }
    return next();
};
exports.validateNoteParams = validateNoteParams;
