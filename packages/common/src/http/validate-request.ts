import type { Request, Response, NextFunction } from "express";

import { ZodError } from "zod";
import type { ZodObject, ZodType } from "zod";

type Schema = ZodObject | ZodType;
type ParamsRecord = Record<string, string>;
type QueryRecord = Record<string, string>;

export interface RequestValidationSchemas {
  body?: Schema;
  params?: Schema;
  query?: Schema;
}

const formatedError = (error: ZodError) =>
  error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message
  }));

export const validateRequest = (schemas: RequestValidationSchemas) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body) as unknown;
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as ParamsRecord;
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as QueryRecord;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));

        console.log(validationErrors);
      }

      next(error);
    }
  };
};