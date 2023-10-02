import mongoose, { Document, Schema, Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import moment = require("moment-timezone");
import * as jwt from "jwt-simple";
import { config } from "../../config/var";

const { jwtExpirationInterval, passwordEncryptionKey } = config;

interface IUser extends Document {
  email: string;
  password: string;
  accessToken?: string;
  verifyPassword(password: string): boolean;
  token(): string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String },
  },
  { timestamps: true }
);

UserSchema.methods.verifyPassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.token = function (): string {
  const payload = {
    exp: moment().add(jwtExpirationInterval, "minutes").unix(),
    iat: moment().unix(),
    sub: this._id,
  };
  return jwt.encode(
    payload,
    passwordEncryptionKey ? passwordEncryptionKey : ""
  );
};

UserSchema.pre<IUser>("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const rounds = passwordEncryptionKey ? Number(passwordEncryptionKey) : 10;
    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;
    return next();
  } catch (error: any) {
    return next(error);
  }
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
