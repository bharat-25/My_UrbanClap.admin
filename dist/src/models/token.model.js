"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../databases/connection");
const admin_model_1 = __importDefault(require("./admin.model"));
class Token extends sequelize_1.Model {
}
Token.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    adminId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: admin_model_1.default,
            key: 'id'
        },
        allowNull: true,
    },
    accessToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    device: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        //   references:{
        //     model:Session,
        //     key:'device'
        // }
    },
}, {
    sequelize: connection_1.sequelize,
    modelName: "tokens",
    timestamps: true
});
Token.sync({ alter: true });
exports.default = Token;
