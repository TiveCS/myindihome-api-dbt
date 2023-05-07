import { z } from "zod";

const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginUserType = z.infer<typeof LoginUserSchema>;

export { LoginUserSchema, LoginUserType };
