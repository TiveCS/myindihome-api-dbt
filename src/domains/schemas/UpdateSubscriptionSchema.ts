import { z } from "zod";

const UpdateSubscriptionSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  duration: z.number().optional(),
  speed: z.number().optional(),
});

type UpdateSubscriptionType = z.infer<typeof UpdateSubscriptionSchema>;

export { UpdateSubscriptionSchema, UpdateSubscriptionType };
