import { TypeOf, z } from "zod";

export const createSessionSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: "Name is required",
      })
      .min(8, "Password must be 8 characters atleast"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
