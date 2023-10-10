import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";


const loginValidation= Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const validatedata = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      req.body = value;
      next();
    };
  };

export const loginAdminMiddleware = validatedata(loginValidation);

