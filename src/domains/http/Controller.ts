import { Express } from "express";

abstract class Controller {
  constructor(app: Express) {
    this.registerRoutes(app);
  }

  abstract registerRoutes(app: Express): void;
}

export default Controller;
