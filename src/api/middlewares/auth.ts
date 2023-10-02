import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { config } from "../../config/var";
import { userAuthTokenError } from "../../config/user-messges";
const { bypassedRoutes } = config;

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { headers, path = "" } = req;
  const segments = path.split("/");
  const route = segments.length ? segments[segments.length - 1] : "";

  if (bypassedRoutes?.includes(route)) return next();
  else if (headers["authorization"]) {
    // check if the user access token is valid or not
    const accessToken = headers["authorization"].split(" ").pop();
    const user = await User.findOne({ accessToken }, "_id");
    if (user) {
      req.query.userId = user._id;
      return next();
    }
  }

  return res.status(403).send({ success: false, message: userAuthTokenError });
};
