import { z } from "zod";

const NewInboxSchema = z.object({
  message: z.string().min(1),
  receiverId: z.string().min(1),
});

type NewInboxType = z.infer<typeof NewInboxSchema>;

export { NewInboxSchema, NewInboxType };
