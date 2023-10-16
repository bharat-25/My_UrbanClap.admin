"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newServiceMiddleware = exports.loginAdminMiddleware = void 0;
const joi_1 = __importDefault(require("joi"));
const loginValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(4).required(),
});
const new_serviceValidation = joi_1.default.object({
    serviceName: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    categoryId: joi_1.default.number().required(),
    parentId: joi_1.default.array(),
});
const validatedata = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        req.body = value;
        next();
    };
};
exports.loginAdminMiddleware = validatedata(loginValidation);
exports.newServiceMiddleware = validatedata(new_serviceValidation);
