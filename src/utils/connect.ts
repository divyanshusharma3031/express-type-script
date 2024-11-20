import mongoose from 'mongoose'

import config from 'config'

export function connect(){
    const dbUri=config.get<string>("dbUri")
    return mongoose.connect(dbUri).then(()=>{
        console.log("Connected To db")
    }).catch((error)=>{
        throw new Error(error);
    });
}

export default connect