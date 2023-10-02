"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./config/mongoose");
const express_1 = __importDefault(require("./config/express"));
express_1.default.set("view engine", "ejs");
(0, mongoose_1.connect)();
exports.default = express_1.default;
