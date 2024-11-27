import { DocumentDefinition, FilterQuery } from 'mongoose'
import UserModel, { UserDocument } from '../models/user.model';
import { omit } from 'lodash';

export async function createUser(input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>) { 
    /*
        ~Omit<T, K extends keyof any>
        ~Construct a type with the properties of T except for those in type K.

        ^Apka DocumentDefintion<UserDocument> return karta hai type of UserDocument jisme 3 extra field hai jo user input mai nahi dega , createdAt , updatedAt , comparePassword .usko ham log Omit se hata rahe hai.

        !Iski(DocumentDefintion) type defintion file mai dekhoge toh dikhega ki , Bahut saari fields omit ho rakhi hai thats why this boils down to only the fields in UserDocuments thats why requet.body was able to be passed from the controller
    */


    

    try {
        return await UserModel.create(input)
    }
    catch (err: any) {
        throw new Error(err);
    }
}


/*
    TODO : For this definition : DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>. 
    ^Alternatively , you can Create a interface that will be a hell lot easier than this .
*/

interface UserInfo{
    email:string;
    password:string
}

export async function validatePassword(userInfo:UserInfo){
    const user=await UserModel.findOne({email:userInfo.email})

    if(!user){
        return false;
    }
    const isValid=await user.comparePassword(userInfo.password);

    if(!isValid){
        return false;
    }
    return omit(user.toJSON(),'password');
}


// ^ Fetching the user

export async function findUser(query:FilterQuery<UserDocument>){
    return UserModel.findOne(query).lean();
}