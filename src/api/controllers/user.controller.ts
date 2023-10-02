import User from "../models/user.model";
import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request, Response, NextFunction } from "express";
import { checkDuplicate } from "../utils/error";
import {
  userRegisterSuccess,
  userLoginSuccess,
  userLoginError,
  userLoginAuthError,
} from "../../config/user-messges";

interface RegisterPayload {
  email?: string;
  password?: string;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload: RegisterPayload = req.body;

    // register user
    await User.create(payload);

    return res.json({ success: true, message: userRegisterSuccess });
  } catch (error: any) {
    if (error.code === 11000) return checkDuplicate(error, res, "User");

    return next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { email } = req.body;
    email = email?.toLowerCase();

    passport.use(
      new LocalStrategy(
        { usernameField: "email" },
        async (username, password, done) => {
          const user = await User.findOne({ email: username });

          switch (true) {
            case !user || !user?.verifyPassword(password):
              return done({ success: false, message: userLoginError }, false);

            default:
              return done(null, user as any);
          }
        }
      )
    );

    // call for passport authentication
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: userLoginAuthError,
        });
      }
      // registered user
      else if (user) {
        const accessToken = await user.token();

        await User.updateOne(
          { _id: user._id },
          { $set: { accessToken } },
          { upsert: true }
        );

        return res.json({
          success: true,
          message: userLoginSuccess,
          accessToken,
        });
      }
      // unknown user or wrong password
      else {
        return res.status(400).send({ success: false, message: info.message });
      }
    })(req, res);
  } catch (error) {
    return next(error);
  }
};
