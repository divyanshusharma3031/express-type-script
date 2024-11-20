import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger"

import { Request,Response } from "express";

export async function createUserHandler(req:Request<{},{},CreateUserInput['body']>,res:Response){
    try{
        const user=await createUser(req.body);
        return res.status(200).json({
            "message":"Created Succesfully"
        })
    }
    catch(e){
        logger.error(e);
        return res.status(409).json({"error":"Email id already exist"});//^ we are assuming that the email id exist thats why returning status 409 .( Resource exists )

        // TODO - Make it to hamdle diffent error as well
    }
}