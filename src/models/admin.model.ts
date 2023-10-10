import { DataTypes, Model } from "sequelize";
import  {sequelize} from "../databases/connection";

class admins extends Model {
  public id!: number;
  public username!: string;
  public phone_number!: string;
  public email!: string;
  public password!: string;
  public address!: string;
  public session!: boolean;
  public is_verified!: boolean;
  public role!:string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

admins.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Assuming default status is false (inactive)
    },
    role:{
      type:DataTypes.STRING,
      defaultValue:"admin"
    }
  },
  {
    sequelize,
    modelName: "admins",
    tableName: 'admins',
    timestamps:true
  }
);
admins.sync({alter:true})
export default admins;