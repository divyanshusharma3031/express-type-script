import { Router,Request,Response } from "express";
import { createUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource"
import { createUserSchema } from "../schema/user.schema";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "../controller/session.controller";
import { createSessionSchema } from "../schema/session.schema";
import { CreateProductSchema, deleteProductSchema, getProductSchema, updateProductSchema} from "../schema/product.schema";
import { createProductHandler, getProductHandler, updateProductHandler } from "../controller/product.controller";
const router=Router();

router.get("/healthCheck",(req:Request,res:Response)=>{
    res.sendStatus(200);
})

router.post("/addUser",validateResource(createUserSchema),createUserHandler)
// getting all the sessions that the user have

router.get("/sessions",getUserSessionHandler);

router.post("/sessions",validateResource(createSessionSchema),createUserSessionHandler)

router.delete("/sessions",deleteSessionHandler);

// Onwards are products routes

router.post("/addProduct",validateResource(CreateProductSchema),createProductHandler)

router.put("/products/:productId",validateResource(updateProductSchema),updateProductHandler)

router.get("/product/:productId",validateResource(getProductSchema),getProductHandler);

router.delete("/product/:productId",validateResource(deleteProductSchema),deleteSessionHandler);

export default router