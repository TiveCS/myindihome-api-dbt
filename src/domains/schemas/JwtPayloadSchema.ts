import { z } from "zod";

const JwtPayloadSchema = z.object({
  sub: z.string(),
});

type JwtPayloadType = z.infer<typeof JwtPayloadSchema>;

export { JwtPayloadSchema, JwtPayloadType };
