"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require("../config/env");
class Database {
    constructor() {
        this.sequelize = new sequelize_1.Sequelize(process.env.dbName, process.env.userName, process.env.password, {
            host: process.env.host,
            dialect: 'postgres',
            logging: false
        });
    }
    getSequelize() {
        console.log("Connection has been established successfully.");
        return this.sequelize;
    }
}
const Dbase = new Database();
exports.sequelize = Dbase.getSequelize();
