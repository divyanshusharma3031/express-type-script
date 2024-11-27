import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  //create a session
  const session = await createSession(user._id, req.get("user-agent") || ""); //~ Create Session takes two argunments (hamne hi define kiya hai). first id , second is userAgenti.e kis browser se request lagai.

  // create an access token

  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    }, // payload
    {
      expiresIn: config.get("accessTokenTtl"), // options
    }
  );

  //create a referesh token

  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    }, // payload
    {
      expiresIn: config.get("refreshTokenTtl"), // options
    }
  );

  // return access and refresh tokens
  res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
}

// Getting all the sessions of a user.

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.status(200).json({
    sessions: sessions,
  });
}

// Deleting the session and logging out - Deleting the current session

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  console.log(sessionId,res.locals.user)
  await updateSession({ _id: sessionId }, { valid: false });// soft delete , we ares setting the valid=false , so now we will not be able to query it. 
  return res.status(200).json({ message: "Deleted Session succesful" });
}
