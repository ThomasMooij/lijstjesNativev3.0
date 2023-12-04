import User from "../models/User
import { JWT_SECRET } from "../utils/variables";
import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export const isAuth: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization?.split("Bearer ")[1];
    if (!token) return res.status(403).json({ error: "Unauthorized request!" });
    const payload = verify(token, JWT_SECRET) as JwtPayload;
  
    const id = payload.id;
  
    const user = await User.findOne({ _id: id, tokens: token });
    if (!user) return res.status(403).json({ error: "Unauthorized request!" });
  
    req.user = {
      id: user._id,
      firstName: user.firstName,
      email: user.email,
      verified: user.verified,
    };
  
    next();
};
