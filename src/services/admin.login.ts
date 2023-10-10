import bcrypt from "bcrypt";
import {Generate_token} from "../utils/createToken"
import Token from "../models/token.model"
import Session from "../models/session.model";
import { LOGIN_ERROR } from "../responses/response";
import { UUIDV4 } from "sequelize";
import { AcceptAny } from "../interface/global.interface";
import admins from "../models/admin.model";

class login_admins{
    login=async(email:string,password:string)=>{
        try{
            const adminExists =await admins.findOne({where: {email: email} });

            const checkrole=adminExists.role;

            if(!adminExists){
                return LOGIN_ERROR.NOT_EXIST
            }
            
            if(checkrole=='user'){
                return LOGIN_ERROR.UNAUTHORIZED
            }

            const pass = await bcrypt.compare(password, adminExists.password);
            if (!pass) {
              return LOGIN_ERROR.NOT_MATCH
            }

            if(!adminExists.is_verified==true){
                // await OTP.verifyOTP(email);
                return LOGIN_ERROR.NOT_VERIFY
            }
            const isSession= await Session.findOne({ where:{adminId: adminExists.id} });

            if(isSession){
                let checkstatus= isSession.is_active
                // const device=UUIDV4()
                const device="UUIDV4bb"

                if(checkstatus){
                    const access_token= await Generate_token.AccessToken(adminExists.id,adminExists.role)
                    const refresh_token= await Generate_token.RefreashToken(adminExists.id,adminExists.role)
                    const result=await Token.create({adminId:adminExists.id,accessToken:access_token.jwtID,refreshToken:refresh_token.jwtID,device})
                    const Access_Token=access_token.AccessToken
                    const Refresh_Token=refresh_token.RefreshToken
                    return {Access_Token,Refresh_Token};
                }

                const access_token= await Generate_token.AccessToken(adminExists.id,adminExists.role)
                const refresh_token= await Generate_token.RefreashToken(adminExists.id,adminExists.role)
                const result=await Token.create({adminId:adminExists.id,accessToken:access_token.jwtID,refreshToken:refresh_token.jwtID,device})
                const Access_Token=access_token.AccessToken
                const Refresh_Token=refresh_token.RefreshToken
                return {Access_Token,Refresh_Token};
            }
            const device="UUIDV4"
            // const device:AcceptAny=UUIDV4()

            const access_token= await Generate_token.AccessToken(adminExists.id,adminExists.role)
            const refresh_token= await Generate_token.RefreashToken(adminExists.id,adminExists.role)
            console.log(access_token,refresh_token)
            console.log(adminExists)

            const result = await Token.create({
                adminId: adminExists.id,
                accessToken: access_token.jwtID,
                refreshToken: refresh_token.jwtID,
                device:device,
              });
            await Session.create({
                adminId: adminExists.id,
                device:device,
                is_active:true
            });
            const Access_Token=access_token.AccessToken
            const Refresh_Token=refresh_token.RefreshToken
            return {Access_Token,Refresh_Token};
            
        }
        catch(error){
            console.log(error);
            throw Error(error.message)
        }
    }
}

export const loginAdmins=new login_admins()