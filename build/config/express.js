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
const cors = require("cors");
const express = require("express");
const bodyParser = __importStar(require("body-parser"));
const compression = require("compression");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const bearerToken = require("express-bearer-token");
const auth_1 = require("../api/middlewares/auth");
const index_1 = __importDefault(require("../api/routes/v1/index"));
const error = __importStar(require("../api/utils/error"));
const var_1 = require("./var");
const http = __importStar(require("http"));
const { port } = var_1.config;
/**
 * express instance
 */
const app = express();
const server = http.createServer(app);
const apiRequestLimiterAll = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 90000,
});
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(bodyParser.json({ limit: "5000mb" }));
app.use(bodyParser.urlencoded({
    limit: "5000mb",
    extended: true,
    parameterLimit: 50000,
}));
app.use(bearerToken());
app.use("/v1/", apiRequestLimiterAll);
app.use(cors(corsOptions));
app.use(compression()); // compress all responses
app.use(auth_1.authenticate); // authenticate middleware
app.use("/v1", index_1.default); // mount API v1 routes
app.use(error.converter); // if error is not an instance of API error, convert it
app.use(error.notFound); // catch 404 and forward to error handler
app.use(error.handler); // error handler, send stacktrace only during development
server.listen(port);
exports.default = app;
