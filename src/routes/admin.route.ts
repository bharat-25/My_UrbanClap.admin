import express from "express"
import { Router } from "express";
import {loginAdminMiddleware, newServiceMiddleware} from "../middleware/joi_validation/admin-validation"
import { adminController } from "../controllers/admin.controller";
import {serviceController} from "../controllers/UC_services/newService"

const adminRoute = express.Router();

class AdminRouter{ 
    private router!:Router;
    constructor(){
        this.router=Router();
    }

    adminRouter(){
        this.router.post("/login",loginAdminMiddleware,adminController.login)
        this.router.post("/addservice",newServiceMiddleware,serviceController.new_sevice);

        return this.router;
    }
}

export const adminRouter= new AdminRouter();