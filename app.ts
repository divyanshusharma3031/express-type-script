import express from "express"

import config from "config"
import connect from "./src/utils/connect";

import logger from "./src/utils/logger"
import router from "./src/routes/routes";
import bodyParser from "body-parser";
import { deSerializeUser } from "./src/middleware/deserialiseUser";
const app=express();

app.use(bodyParser.json());// This is done to handle json Body

app.use(bodyParser.urlencoded({ extended: true }));// This is done to handle form submission

app.use(deSerializeUser); // applying to all the incoming routes
app.use("/api",router);


const port=config.get<number>('port');

console.log(port)

app.listen(port,()=>{
    logger.info(`App running on port, ${port}`)
    connect().then(()=>{
        logger.info("Connected to db");
    }).catch((err)=>{
        logger.error("Could not connect to db")
    })
})