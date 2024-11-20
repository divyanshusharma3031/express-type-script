import { DocumentDefinition } from 'mongoose'
import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>) {
    /*
        ~Omit<T, K extends keyof any>
        ~Construct a type with the properties of T except for those in type K.

        ^Apka DocumentDefintion<UserDocument> return karta hai type of UserDocument jisme 3 extra field hai jo user input mai nahi dega , createdAt , updatedAt , comparePassword .usko ham log Omit se hata rahe hai

        
        ! Alternatively , you can Create a interface that will be a hell lot easier than this 
    */


    

    try {
        return await UserModel.create(input)
    }
    catch (err: any) {
        throw new Error(err);
    }
}