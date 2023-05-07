import { z } from "zod";

const NewInboxSchema = z.object({
  message: z.string().min(1),
  receiverEmail: z.string().email(),
});

type NewInboxType = z.infer<typeof NewInboxSchema>;

export { NewInboxSchema, NewInboxType };
