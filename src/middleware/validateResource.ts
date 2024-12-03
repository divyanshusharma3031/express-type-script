import { Request,Response,NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate=(schema:AnyZodObject)=>(req:Request,res:Response,next:NextFunction)=>{ // currying in js
    try{
        schema.parse({
            body:req.body,
            query:req.query,
            params:req.params
        })
        next();
    }
    catch(err){
        return res.status(400).json({"errors":err})
    }
}

export default validate