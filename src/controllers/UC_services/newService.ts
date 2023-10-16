import { Request, Response } from "express";
import {service_Add} from "../../services/UC_Services/Add-Service"
import { RESPONSE_CODES,SERVICE_MSG } from "../../responses/response";

class ServiceController{

    new_sevice=async(req:Request,res:Response)=>{
        try{
            const  {serviceName,description,categoryId,parentId}=req.body; 
            const newService=await service_Add.NewService(serviceName,description,categoryId,parentId) 
            if(newService['status']==RESPONSE_CODES.CONFLICT){
                console.log(SERVICE_MSG.ISEXIST)
            return res.status(RESPONSE_CODES.CONFLICT).json({ message: SERVICE_MSG.ISEXIST });
            }
            res.status(RESPONSE_CODES.CREATED).json({ message: SERVICE_MSG.CREATED });
        }
        catch(error){
            res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
}}
export const serviceController=new ServiceController()
