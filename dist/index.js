"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./src/databases/connection");
const admin_route_1 = require("./src/routes/admin.route");
const constant_1 = require("./src/constant/constant");
const logger_middleware_1 = require("./src/middleware/logger/logger.middleware");
class App {
    constructor() {
        this.callback = () => {
            logger_middleware_1.loggers.info(`Server listing on port: ${this.port}`);
        };
        this.startApp();
    }
    startApp() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.loadGlobalMiddleWare();
        connection_1.sequelize;
        this.loadRouter();
        this.Server();
    }
    loadGlobalMiddleWare() {
        this.admincontext = constant_1.adminContext;
        this.app.use(express_1.default.json());
        this.port = constant_1.portNumber;
    }
    loadRouter() {
        this.app.use(this.admincontext, admin_route_1.adminRouter.adminRouter());
    }
    Server() {
        this.app.listen(this.port, this.callback);
    }
}
new App();
