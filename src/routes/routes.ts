import { Router,Request,Response } from "express";
import { createUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource"
import { createUserSchema } from "../schema/user.schema";
const router=Router();

router.get("/healthCheck",(req:Request,res:Response)=>{
    res.sendStatus(200);
})

router.post("/addUser",validateResource(createUserSchema),createUserHandler)

export default router