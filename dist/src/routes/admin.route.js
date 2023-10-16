"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const admin_validation_1 = require("../middleware/joi_validation/admin-validation");
const admin_controller_1 = require("../controllers/admin.controller");
const newService_1 = require("../controllers/UC_services/newService");
const adminRoute = express_1.default.Router();
class AdminRouter {
    constructor() {
        this.router = (0, express_2.Router)();
    }
    adminRouter() {
        this.router.post("/login", admin_validation_1.loginAdminMiddleware, admin_controller_1.adminController.login);
        this.router.post("/addservice", admin_validation_1.newServiceMiddleware, newService_1.serviceController.new_sevice);
        return this.router;
    }
}
exports.adminRouter = new AdminRouter();
