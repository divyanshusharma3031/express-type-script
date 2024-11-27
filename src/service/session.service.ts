import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionSchemaDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config"
export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent: userAgent,
  });
  return session;
}

/*
    When you call .toJSON() on a Mongoose document, it converts the document into a plain JavaScript object. This process:

    Removes Mongoose-specific properties (e.g., _id becomes id if you've configured it, and properties like __v are excluded by default).
    Applies any custom transformations defined in the schema's toJSON options.
    Preserves fields as plain JavaScript types (e.g., dates are converted to Date objects, not MongoDB objects).

    
*/


// ^ Function to find all the sessions of a particular to a user.

export async function findSessions(query:FilterQuery<SessionSchemaDocument>){
  return SessionModel.find(query).lean(); //^ .lean() is the same as toJson, jo isko pure javascript object mai convert kardega
}

// ^ Updating the session

export async function updateSession(query:FilterQuery<SessionSchemaDocument>,update:UpdateQuery<SessionSchemaDocument>){
  console.log("Query : ",query);
  console.log("update : ",update);
  return SessionModel.updateOne(query,update);
}

//^ Re-issuing access Token using the refreshToken

export async function reIssueAccessToken(refreshToken:string){
  const {decoded}=verifyJwt(refreshToken);
  if(!decoded || !get(decoded,'session')){
    return false;
  }
  const session=await SessionModel.findById(get(decoded,"session"));

  if(!session || !session.valid){
    return false;
  }
  const user=await findUser({_id:session.user});
  if(!user){
    return false;
  }
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    }, // payload
    {
      expiresIn: config.get("accessTokenTtl"), // options
    }
  );
  return accessToken;
}