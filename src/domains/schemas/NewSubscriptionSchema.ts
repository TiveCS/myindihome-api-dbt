import { z } from "zod";

const NewSubscriptionSchema = z.object({
  name: z.string(),
  price: z.number(),
  duration: z.number(),
  speed: z.number(),
});

type NewSubscriptionType = z.infer<typeof NewSubscriptionSchema>;

export { NewSubscriptionSchema, NewSubscriptionType };
