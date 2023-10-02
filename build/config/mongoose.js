"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const var_1 = require("./var");
const { mongo: { uri: mongoUri }, } = var_1.config;
const connectionOptions = {
    useUnifiedTopology: true,
};
// Exit application on error
mongoose_1.default.connection.on("error", () => {
    process.exit(-1);
});
// Print mongoose logs in dev env
if (var_1.config.env === "development") {
    mongoose_1.default.set("debug", true);
}
/**
 * Connect to mongo db
 *
 * @returns {mongoose.Connection} Mongoose connection
 * @public
 */
const connect = () => {
    mongoose_1.default.connect(mongoUri, connectionOptions);
    return mongoose_1.default.connection;
};
exports.connect = connect;
