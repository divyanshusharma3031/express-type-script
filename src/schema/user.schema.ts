import { TypeOf, z } from "zod"


export const createUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required"
        }),
        password: z.string({
            required_error: "Name is required"
        }).min(8,"Password must be 8 characters atleast"),
        email:z.string({
            required_error:"Email is required"
        }).email("Not a valid email")
    })
})

export type CreateUserInput=TypeOf<typeof createUserSchema>;// This will automatically give you the type based on the schema 

/*
    In this case The interface will be :

    {
        body:
            {  
                name:string,
                password:string,
                email:string
            }
    }
    

*/