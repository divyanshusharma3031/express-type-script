import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

export const deSerializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh") as string;
  console.log(refreshToken);
  if (!accessToken) {
    next();
    return;
  }
  const { decoded, expired } = verifyJwt(accessToken); //^ This will give the payload which has user and session details if toen is valid ; else : null
  if (decoded) {
    res.locals.user = decoded; //! Q) Ye hamne response mai kyu add kiya hai ?
    next();
    return;
  }
  if (expired && refreshToken) {
    
    const newAccessToken = await reIssueAccessToken(refreshToken);
    if (newAccessToken) {
        console.log("Token regenerated")
        // ~ Now Flow aise rahega jaise ki token expire hi nahi hua 
      res.setHeader("x-access-token", newAccessToken);
      const result = verifyJwt(newAccessToken);
      res.locals.user=result.decoded;
      return next();
    }
  }
  res.status(400).json({ error: expired ? "JWT Expired" : "Malformed Token" });
};
