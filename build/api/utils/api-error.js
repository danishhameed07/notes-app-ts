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
const httpStatus = __importStar(require("http-status"));
/**
 * @extends Error
 */
class ExtendableError extends Error {
    constructor({ message, errors, status, isPublic, stack }) {
        super(message);
        this.isOperational = true; // this is required since bluebird 4 doesn't append it anymore.
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.status = status;
        this.isPublic = isPublic;
        if (stack) {
            this.stack = stack;
        }
    }
}
/**
 * class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
    /**
     * creates an API error.
     * @param {string} message - error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - whether the message should be visible to user or not.
     */
    constructor({ message, errors, stack, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false, }) {
        super({
            message,
            errors,
            status,
            isPublic,
            stack,
        });
    }
}
exports.default = APIError;
