// src/middleware.js
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  // Simply pass through all requests
  return next();
});