import express from "express"
import { Router } from "express";
import {loginAdminMiddleware} from "../middleware/joi_validation/admin-validation"
import { adminController } from "../controllers/admin.controller";
const adminRoute = express.Router();

class AdminRouter{ 
    private router!:Router;
    constructor(){
        this.router=Router();
    }

    adminRouter(){
        this.router.post("/login",loginAdminMiddleware,adminController.login)
        return this.router;
    }
}

export const adminRouter= new AdminRouter();