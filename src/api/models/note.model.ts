import mongoose, { Document, Schema, Model } from "mongoose";

interface INote extends Document {
  title: string;
  userId: mongoose.Types.ObjectId;
  description?: string;
}

const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const NoteModel: Model<INote> = mongoose.model<INote>("Note", NoteSchema);

export default NoteModel;
