import express from "express";
import type { Application } from "express";

export const createApp = (): Application => {
  const app = express();

  return app;
}