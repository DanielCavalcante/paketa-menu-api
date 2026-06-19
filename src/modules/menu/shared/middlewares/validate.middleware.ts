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
        next(
          new AppError(
            error.issues.map((issue) => issue.message).join(", "),
            400,
          ),
        );

        return;
      }

      next(error);
    }
  };
}
