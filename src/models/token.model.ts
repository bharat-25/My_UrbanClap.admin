import { DataTypes, Model } from "sequelize";
import  {sequelize} from "../databases/connection";
import Session from "./session.model";
import admins from "./admin.model";

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    adminId:{
    type:DataTypes.INTEGER,
    references:{
          model:admins,
          key:'id'
      },
    allowNull:true,
},
    accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    device:{
      type:DataTypes.STRING,
      allowNull:false,
    //   references:{
    //     model:Session,
    //     key:'device'
    // }
    },

    

  },
  {
    sequelize,
    modelName: "tokens",
    timestamps:true
  }
);

Token.sync({alter:true})

export default Token;