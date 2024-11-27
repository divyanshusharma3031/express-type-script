import jwt from "jsonwebtoken";

import config from "config";

const privateKey = config.get<string>("privateKey");

const publicKey=config.get<string>("publicKey")

export function signJwt(payload: Object, options?: jwt.SignOptions) {
  return jwt.sign(payload, privateKey, {
    ...(options && options),// we only want to spread options if it is defined this is a simple way to check it.
    algorithm: "RS256",
  });
}

export function verifyJwt(token:string){
    try{
        const decoded=jwt.verify(token,publicKey);// agar verify nahi kar paaya toh this will throw an error.
        return {
            valid:true,
            expired:false,
            decoded
        }
    }
    catch(e:any)
    {
        console.log(e);
        return{
            valid:false,
            expired:e.message==="jwt expired",// kya fail hone ka karan tha ki token expire ho gaya,
            decoded:null
        }
    }
}