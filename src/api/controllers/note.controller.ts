import Note from "../models/note.model";
import { Request, Response, NextFunction } from "express";
import {
  createNoteSuccess,
  editNoteSuccess,
  editNoteError,
  deleteNoteSuccess,
  deleteNoteError,
  getNoteSuccess,
  getNoteError,
  listNoteSuccess,
} from "../../config/user-messges";

interface NotePayload {
  userId: any;
  title: string;
  description: string;
  noteId?: string;
}

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, query } = req;
    const payload: NotePayload = {
      userId: query.userId,
      title: body.title,
      description: body.description,
    };

    const note = await Note.create(payload);

    if (note) {
      const { _id, title, description } = note;
      const data = { _id, title, description };
      return res
        .status(201)
        .send({ success: true, message: createNoteSuccess, note: data });
    }
  } catch (error) {
    return next(error);
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body: { title, description, noteId: _id },
      query: { userId },
    } = req;

    const note = await Note.findOneAndUpdate(
      { _id, userId },
      { $set: { title, description } },
      { new: true }
    );

    if (note) {
      const { _id, title, description } = note;
      const data = { _id, title, description };
      return res.json({ success: true, message: editNoteSuccess, note: data });
    } else {
      return res.status(400).send({ success: false, message: editNoteError });
    }
  } catch (error) {
    return next(error);
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { noteId: _id },
      query: { userId },
    } = req;

    const note = await Note.findOneAndDelete({ _id, userId });
    if (note) {
      return res.json({ success: true, message: deleteNoteSuccess });
    } else {
      return res.status(400).send({ success: false, message: deleteNoteError });
    }
  } catch (error) {
    return next(error);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { noteId: _id },
      query: { userId },
    } = req;

    const note = await Note.findOne({ _id, userId }, "title description");
    if (note) {
      return res.json({ success: true, message: getNoteSuccess, note });
    } else {
      return res.status(400).send({ success: false, message: getNoteError });
    }
  } catch (error) {
    return next(error);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      query: { userId },
    } = req;

    const notes = await Note.find({ userId }, "title description");

    return res.json({ success: true, message: listNoteSuccess, notes });
  } catch (error) {
    return next(error);
  }
};
