import { LOGIN_ERROR } from '../responses/response';
import { Request, Response } from "express";
import { RESPONSE_CODES, RESPONSE_MESSAGES } from "../responses/response";
import { loginAdmins } from '../services/admin.login';

class AdminController{

    login=async(req:Request,res:Response)=>{
      try{
        const {email,password}=req.body;
        const admin_login=await loginAdmins.login(email,password);
        if(admin_login=="Wrong Password"){
         return res.status(RESPONSE_CODES.NOTFOUND).json({Message:LOGIN_ERROR.NOT_MATCH})
        }
        res.status(RESPONSE_CODES.SUCCESS).json({Message:RESPONSE_MESSAGES.SUCCESS,result:admin_login})
      }
      catch(error){
        res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({message:error})
      }
    }
} 

export const adminController=new AdminController()