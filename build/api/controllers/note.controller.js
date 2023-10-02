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
exports.list = exports.get = exports.deleteNote = exports.edit = exports.create = void 0;
const note_model_1 = __importDefault(require("../models/note.model"));
const user_messges_1 = require("../../config/user-messges");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, query } = req;
        const payload = {
            userId: query.userId,
            title: body.title,
            description: body.description,
        };
        const note = yield note_model_1.default.create(payload);
        if (note) {
            const { _id, title, description } = note;
            const data = { _id, title, description };
            return res
                .status(201)
                .send({ success: true, message: user_messges_1.createNoteSuccess, note: data });
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.create = create;
const edit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: { title, description, noteId: _id }, query: { userId }, } = req;
        const note = yield note_model_1.default.findOneAndUpdate({ _id, userId }, { $set: { title, description } }, { new: true });
        if (note) {
            const { _id, title, description } = note;
            const data = { _id, title, description };
            return res.json({ success: true, message: user_messges_1.editNoteSuccess, note: data });
        }
        else {
            return res.status(400).send({ success: false, message: user_messges_1.editNoteError });
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.edit = edit;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { noteId: _id }, query: { userId }, } = req;
        const note = yield note_model_1.default.findOneAndDelete({ _id, userId });
        if (note) {
            return res.json({ success: true, message: user_messges_1.deleteNoteSuccess });
        }
        else {
            return res.status(400).send({ success: false, message: user_messges_1.deleteNoteError });
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.deleteNote = deleteNote;
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { noteId: _id }, query: { userId }, } = req;
        const note = yield note_model_1.default.findOne({ _id, userId }, "title description");
        if (note) {
            return res.json({ success: true, message: user_messges_1.getNoteSuccess, note });
        }
        else {
            return res.status(400).send({ success: false, message: user_messges_1.getNoteError });
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.get = get;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query: { userId }, } = req;
        const notes = yield note_model_1.default.find({ userId }, "title description");
        return res.json({ success: true, message: user_messges_1.listNoteSuccess, notes });
    }
    catch (error) {
        return next(error);
    }
});
exports.list = list;
