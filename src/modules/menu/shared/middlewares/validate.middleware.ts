import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError, ZodType } from "zod";

import { AppError } from "../errors/app-error";

export function validate(schema: ZodType): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError("Validation failed", 400, error.issues));

        return;
      }

      next(error);
    }
  };
}
