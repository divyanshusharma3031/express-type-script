import mongoose from "mongoose";

import bcrypt from "bcrypt";

import config from "config";

type HookNextFunction=(err?:Error)=>void

export interface UserDocument extends mongoose.Document {
    email:string,
    name:string,
    password:string,
    createdAt:Date,
    updatedAt:Date,
    comparePassword(candidatePassword:string):Promise<boolean>
}// This is a TypeScript interface that defines the shape of a Mongoose document representing a "User" in a MongoDB database.
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique:true
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This will introduce a field created at notice that this is outside the email,passeprd ,name thing
  }
);
userSchema.methods.comparePassword=async function(candidatePassword:string){
  const user=this as UserDocument

  return bcrypt.compare(candidatePassword,user.password).catch((e)=>false)
}
userSchema.pre("save",async function(next:HookNextFunction){//^ This code snippet defines a pre-save middleware for a Mongoose schema. It is executed before a user document is saved to the database. Specifically, it is used to hash the user's password before it gets saved, ensuring that passwords are securely stored in the database.
    let user=this as UserDocument
    if(!user.isModified("password")){
      /*

        a) This condition checks if the password field has been modified using the .isModified() method.
        b) If the password field has not been modified (i.e., the user is not changing their password), the middleware simply calls next(), skipping the password hashing process.
        c) This ensures that the password is only hashed when it is modified, and not every time the document is saved (to optimize performance).

      */
      next();
    }
    const salt=await bcrypt.genSalt(config.get<number>('saltRounds'))

    const hash=await bcrypt.hashSync(user.password,salt);

    user.password=hash

    return next();// will pass the control to next middle ware which in this case is the save() operation.
})




const UserModel = mongoose.model("user", userSchema);

export default UserModel;
