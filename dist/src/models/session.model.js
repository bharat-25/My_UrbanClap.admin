"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../databases/connection");
const admin_model_1 = __importDefault(require("./admin.model"));
class Session extends sequelize_1.Model {
}
Session.init({
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
            key: 'id',
        },
        allowNull: true,
    },
    device: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    sequelize: connection_1.sequelize,
    tableName: 'sessions',
    timestamps: true
});
// Session.belongsTo(User,
//     {
//       foreignKey:'device',
//   })
Session.sync({ alter: true });
exports.default = Session;
