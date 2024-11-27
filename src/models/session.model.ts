import mongoose from "mongoose";
import { UserDocument } from "./user.model";


export interface SessionSchemaDocument extends mongoose.Schema {
  user: UserDocument["_id"]; // This essentially is a any field in the type definition,
  valid: boolean;
  userAgent:string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent:{type:String}// The idea here is to have the browser details , from which browser they logged In , etc . I think its a pretty cool idea.
  },
  {
    timestamps: true,
  }
);


const SessionModel = mongoose.model<SessionSchemaDocument>("session", sessionSchema);

export default SessionModel;