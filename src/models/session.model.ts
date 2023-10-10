import { Model, DataTypes, UUIDV4 } from "sequelize";
import { SessionAttributes } from "../interface/global.interface";
import {sequelize} from "../databases/connection";
import admins from "./admin.model";


class Session extends Model<SessionAttributes> implements SessionAttributes {
  public id!: number;
  public userId!: number;
  public adminId!:number;
  public device!: string;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Session.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    adminId: {
      type: DataTypes.INTEGER,
      references: {
        model: admins,
        key: 'id',
      },
      allowNull: true,
    },
    
    device: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
   
  },
  {
    sequelize,
    tableName: 'sessions',
    timestamps:true
  },
);
// Session.belongsTo(User,
//     {
//       foreignKey:'device',
//   })
Session.sync({ alter: true});

export default Session;
