import { AcceptAny } from './../../interface/global.interface';
import { Model } from 'sequelize';
import serviceModel from "../../models/newService.model"
import { SERVICE_MSG } from "../../responses/response"
import { credentials } from "@grpc/grpc-js";
import { firstValueFrom } from "rxjs";
import { GRPCClass } from '../../provider/grpc';



class add_new_service extends GRPCClass{
    private service!:any;
    constructor(){
        super('/proto/addservice.proto','AddServicePackage')
        this.loadService()
    }
    loadService() {
        this.service=new this.package.newservice("0.0.0.0:8000",credentials.createInsecure());
    }
    NewService=async(serviceName:string,description:string, categoryId:number,parentId :number[])=>{
        try{
            const data={serviceName,description,categoryId,parentId}
            console.log("---------->",data);
            const res=await firstValueFrom(
                this.invokeService(this.service,'CreateService',data)
            )
            return res;

        }catch(error){
            throw new Error(error.message)
        }
    }
}

export const service_Add=new add_new_service()