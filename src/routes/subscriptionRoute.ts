import { Router } from "express";
import { subscriptionController } from "../http/subscription/SubscriptionController.js";

const router = Router();

// Endpoints for SubscriptionController
router.get("/subscriptions", subscriptionController.index.bind(subscriptionController));
router.get("/subscriptions/:id", subscriptionController.show.bind(subscriptionController));
router.post("/subscriptions", subscriptionController.store.bind(subscriptionController));
router.put("/subscriptions/:id", subscriptionController.update.bind(subscriptionController));
router.delete("/subscriptions/:id", subscriptionController.destroy.bind(subscriptionController));

export default router;
